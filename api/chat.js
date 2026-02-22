/**
 * Vercel serverless function: POST /api/chat
 * Body: { messages: [{ role, content }], context: { summary, contact, projects, experience, education, skills } }
 * Env: OPENAI_API_KEY or GROQ_API_KEY (Groq is free tier; use one or the other)
 * Returns: { reply: string } or { error: string }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const useGroq = !!groqKey;
  const apiKey = useGroq ? groqKey : openaiKey;

  if (!apiKey) {
    res.status(500).json({
      error: 'Set GROQ_API_KEY (free at console.groq.com) or OPENAI_API_KEY in Vercel environment variables.',
    });
    return;
  }

  try {
    const { messages = [], context = {} } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const systemParts = [
      'You are a helpful assistant answering questions about Suyash Humne. Use ONLY the information below. Be concise and friendly.',
      '',
      'Rules:',
      '- When asked about "all projects" or "list projects", list every project by name and subtitle from the Projects section, then say they can ask for details on any one.',
      '- When asked about a specific project by name, give its full description and include the exact URL as plain text (e.g. https://github.com/...) so the link can be clicked. If a project has a link, always include it.',
      '- For contact/LinkedIn/GitHub, always include the exact URL as plain text (e.g. https://www.linkedin.com/in/..., https://github.com/...) so links are clickable.',
      '- Use **bold** for important terms (names, roles, project titles). Do not use markdown [text](url); use raw URLs so they render as links.',
      '- If something is not in the context, say so and suggest what you can answer (projects, work, education, skills, contact).',
      '',
      '## About Suyash',
      context.summary || '',
      '',
      '## Contact (include these exact URLs when asked about contact/LinkedIn/GitHub)',
      context.contact || '',
      '',
      '## Projects (each has title, subtitle, description, tags; some have Link)',
      context.projects || '',
      '',
      '## Experience',
      context.experience || '',
      '',
      '## Education',
      context.education || '',
      '',
      '## Skills',
      context.skills || '',
    ];

    const systemPrompt = systemParts.join('\n').trim();

    const chatUrl = useGroq
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    const model = useGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      res.status(response.status).json({ error: err || response.statusText });
      return;
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I couldn\'t generate a reply.';
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Server error' });
  }
}
