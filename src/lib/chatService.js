/**
 * Chat logic: uses live site data (projects, experience, education, skills).
 * Tries OpenAI API when VITE_CHAT_API_URL is set; otherwise smart local replies
 * with project-specific and experience-specific answers.
 */
import { projects } from '../data/projects';
import { experience } from '../data/experience';
import { education } from '../data/education';
import { skills } from '../data/skills';
import { CHATBOT_KNOWLEDGE, CHATBOT_QUICK_ANSWERS } from '../data/chatbotKnowledge';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;

/** True when chat API is configured (use AI first for free-text). */
export function hasChatApi() {
  return !!(CHAT_API_URL || (typeof window !== 'undefined' && window.location?.origin));
}

/** Build a reply for a specific project (by matching title/subtitle/tags). */
function getProjectReply(project) {
  let out = `**${project.title}** — ${project.subtitle}\n\n${project.description}`;
  if (project.tags?.length) out += `\n\nTech: ${project.tags.join(', ')}`;
  if (project.link) out += `\n\n${project.linkLabel || 'Link'}: ${project.link}`;
  return out;
}

/** Find which project the user is asking about (single best match). */
function matchProject(text) {
  const t = text.toLowerCase();
  const keywords = projects.map((p) => ({
    project: p,
    score:
      (p.title.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && t.includes(w)).length * 2) +
      (p.subtitle?.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && t.includes(w)).length || 0) +
      (p.tags?.filter((tag) => t.includes(tag.toLowerCase())).length || 0) +
      (t.includes('lane') && p.title.toLowerCase().includes('lane') ? 3 : 0) +
      (t.includes('e-waste') && p.title.toLowerCase().includes('e-waste') ? 3 : 0) +
      (t.includes('traffic') && p.title.toLowerCase().includes('traffic') ? 3 : 0) +
      (t.includes('maze') && p.title.toLowerCase().includes('maze') ? 3 : 0) +
      (t.includes('balloon') && p.title.toLowerCase().includes('balloon') ? 3 : 0) +
      (t.includes('campus') && p.title.toLowerCase().includes('campus') ? 3 : 0) +
      (t.includes('plant') && p.title.toLowerCase().includes('plant') ? 3 : 0),
  }));
  const best = keywords.filter((k) => k.score > 0).sort((a, b) => b.score - a.score)[0];
  return best?.project ?? null;
}

/** Find which experience entry the user is asking about. */
function matchExperience(text) {
  const t = text.toLowerCase();
  for (const ex of experience) {
    const companyMatch = ex.company.toLowerCase().split(/\s+/).some((w) => w.length > 2 && t.includes(w));
    const roleMatch = ex.role.toLowerCase().split(/\s+/).some((w) => w.length > 2 && t.includes(w));
    if (companyMatch || roleMatch) return ex;
  }
  return null;
}

/** Format one experience entry. */
function formatExperience(ex) {
  let out = `**${ex.role}** at **${ex.company}** (${ex.period})\n\n`;
  ex.points.forEach((p) => { out += `• ${p}\n`; });
  return out.trim();
}

/** Format education from site data. */
function formatEducation() {
  return education
    .map(
      (e) =>
        `**${e.degree}** — ${e.school} (${e.period})${e.extra ? ` — ${e.extra}` : ''}${e.score ? ` · ${e.score}` : ''}`
    )
    .join('\n\n');
}

/** Format skills from site data. */
function formatSkills() {
  const parts = [];
  if (skills.languages?.length) parts.push(`**Languages:** ${skills.languages.join(', ')}`);
  if (skills.webAndDatabases?.length) parts.push(`**Web & DB:** ${skills.webAndDatabases.join(', ')}`);
  if (skills.coursework?.length) parts.push(`**Coursework:** ${skills.coursework.join(', ')}`);
  if (skills.interests?.length) parts.push(`**Interests:** ${skills.interests.join(', ')}`);
  if (skills.soft?.length) parts.push(`**Soft:** ${skills.soft.join(', ')}`);
  return parts.join('\n\n');
}

/** Smart local reply using site data (projects, experience, education, skills). */
export function getLocalReply(text, isQuickReplyKey = null) {
  if (isQuickReplyKey && CHATBOT_QUICK_ANSWERS[isQuickReplyKey])
    return CHATBOT_QUICK_ANSWERS[isQuickReplyKey];

  const t = (text || '').toLowerCase().trim();
  if (!t) return "Ask me anything about Suyash — a specific project (e.g. Lane Detection, E-Waste Locator), his work, education, skills, or how to get in touch.";

  // Specific project?
  const project = matchProject(text);
  if (project) return getProjectReply(project);

  // Specific experience?
  const ex = matchExperience(text);
  if (ex) return formatExperience(ex);

  // "Projects" list first (so "tell me about all projects" doesn't match "about")
  if (/\b(project|projects|built|what.*build)\b/.test(t) || /\ball\s*project/.test(t)) {
    const list = projects
      .map((p) => `• **${p.title}** — ${p.subtitle}`)
      .join('\n');
    return `Here are Suyash's projects:\n\n${list}\n\nAsk about any one for full details — e.g. "Tell me about Lane Detection" or "What's the E-Waste Locator?"`;
  }

  // General categories
  if (/\b(work|job|experience|intern|role|company)\b/.test(t)) return CHATBOT_QUICK_ANSWERS.work;
  if (/\b(about|who|summary|intro|yourself)\b/.test(t)) return CHATBOT_QUICK_ANSWERS.about;
  if (/\b(skill|tech|language|code|react|python)\b/.test(t)) return CHATBOT_QUICK_ANSWERS.skills;
  if (/\b(contact|email|phone|reach|linkedin|github)\b/.test(t)) return CHATBOT_QUICK_ANSWERS.contact;
  if (/\b(education|college|degree|sgpa|kjsce)\b/.test(t)) return formatEducation();

  return "I can tell you about a **specific project** (Lane Detection, E-Waste Locator, Smart Traffic Light, Number Maze, Campus Tour, Plant Watering, Balloon Pop), his **work**, **education**, **skills**, or **contact**. Try asking for one by name or use the quick buttons below.";
}

/**
 * Call AI API if configured. Sends messages + context. Returns { ok, reply } or { ok: false }.
 */
const AI_FETCH_TIMEOUT_MS = 8000;

export async function getAiReply(messages, context = null) {
  const url = CHAT_API_URL || (typeof window !== 'undefined' ? window.location.origin + '/api/chat' : '');
  if (!url) return { ok: false };
  try {
    const body = context ? { messages, context } : { messages };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return { ok: false };
    const data = await res.json();
    if (data.error) return { ok: false };
    return { ok: true, reply: data.reply ?? data.message ?? data.choices?.[0]?.message?.content };
  } catch {
    return { ok: false };
  }
}

/** Build context string for AI (used by serverless API). */
export function buildAiContext() {
  const projectBlobs = projects.map(
    (p) => `Project: ${p.title}. Subtitle: ${p.subtitle}. Description: ${p.description}. Tags: ${(p.tags || []).join(', ')}.${p.link ? ` Link: ${p.link}` : ''}`
  );
  const expBlobs = experience.map(
    (e) => `Role: ${e.role}. Company: ${e.company}. Period: ${e.period}. Points: ${(e.points || []).join(' ')}`
  );
  const edBlobs = education.map(
    (e) => `${e.degree} at ${e.school} (${e.period})${e.extra ? `; ${e.extra}` : ''}${e.score ? `; ${e.score}` : ''}`
  );
  return {
    summary: CHATBOT_KNOWLEDGE.summary,
    contact: `Email: ${CHATBOT_KNOWLEDGE.email}. Phone: ${CHATBOT_KNOWLEDGE.phone}. LinkedIn: ${CHATBOT_KNOWLEDGE.linkedin}. GitHub: ${CHATBOT_KNOWLEDGE.github}. Location: ${CHATBOT_KNOWLEDGE.location}.`,
    projects: projectBlobs.join('\n'),
    experience: expBlobs.join('\n'),
    education: edBlobs.join('\n'),
    skills: formatSkills(),
  };
}
