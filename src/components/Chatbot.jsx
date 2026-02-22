import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getLocalReply, getAiReply, buildAiContext, hasChatApi } from '../lib/chatService';

// Match **bold**, markdown [label](url), or raw URLs
const BOLD_OR_LINK = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<>"']+[^\s<>"'.,;)]*|mailto:[^\s]+|tel:[^\s]+)/g;

function linkLabel(href) {
  if (href.startsWith('mailto:')) return href.replace(/^mailto:/i, '');
  if (href.startsWith('tel:')) return href.replace(/^tel:/i, '');
  if (/github\.com/i.test(href)) return 'GitHub';
  if (/linkedin\.com/i.test(href)) return 'LinkedIn';
  if (/vercel\.app/i.test(href)) return 'View on Vercel';
  return href.replace(/^https?:\/\//i, '');
}

function renderMessageContent(content) {
  if (!content) return null;
  const parts = content.split(BOLD_OR_LINK).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const mdLink = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLink) {
      const [, label, href] = mdLink;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="chatbot-msg-link">
          {label}
        </a>
      );
    }
    if (/^https?:\/\//i.test(part) || part.startsWith('mailto:') || part.startsWith('tel:')) {
      const href = part.replace(/[.,;)]+$/, '');
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="chatbot-msg-link">
          {linkLabel(href)}
        </a>
      );
    }
    return part;
  });
}

const QUICK_REPLIES = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About me' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Chatbot() {
  const ref = useRef(null);
  const messagesContainerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = async (content, isQuickReply = false) => {
    const key = typeof content === 'string' ? content : content;
    const userContent = isQuickReply ? (QUICK_REPLIES.find((r) => r.id === key)?.label || key) : key;
    if (!userContent?.trim()) return;
    const userMsg = { role: 'user', content: userContent };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    if (isQuickReply) {
      const reply = getLocalReply(key, key);
      setTimeout(() => {
        setMessages((m) => [...m, { role: 'assistant', content: reply }]);
        setIsTyping(false);
      }, 300);
      return;
    }

    // Free-text: when API is configured, try AI first; otherwise use local-only for clear intents
    const localReply = getLocalReply(key);
    const apiConfigured = hasChatApi();
    const useLocalOnly =
      !apiConfigured &&
      /\b(all\s*)?projects?\b|\b(lane|e-waste|traffic|maze|balloon|campus|plant)\b|\b(buildup|somaiya|alumni|maidc|fresa|suhani)\b/i.test(key);
    if (useLocalOnly) {
      setMessages((m) => [...m, { role: 'assistant', content: localReply }]);
      setIsTyping(false);
      return;
    }

    const conversation = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
    const context = buildAiContext();
    const { ok, reply: aiReply } = await getAiReply(conversation, context);

    if (ok && aiReply) {
      setMessages((m) => [...m, { role: 'assistant', content: aiReply }]);
    } else {
      setMessages((m) => [...m, { role: 'assistant', content: localReply }]);
    }
    setIsTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <section id="chatbot" className="section chatbot" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Got questions? I've read his resume.
      </motion.h2>
      <motion.p
        className="chatbot-sub"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        I've ingested this site. Projects, experience, skills, contact — ask anything, I'll keep it real.
      </motion.p>
      <motion.div
        className="chatbot-card"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div ref={messagesContainerRef} className="chatbot-messages">
          {messages.length === 0 && (
            <div className="chatbot-placeholder">
              Try: "Lane Detection", "his work", or "how to connect"
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
              <div className="chatbot-msg-bubble">
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-msg chatbot-msg--assistant">
              <div className="chatbot-msg-bubble chatbot-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>
        <div className="chatbot-quick">
          {QUICK_REPLIES.map(({ id, label }) => (
            <motion.button
              key={id}
              type="button"
              className="chatbot-quick-btn"
              onClick={() => send(id, true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Ask about a project, his work, or contact..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message"
          />
          <motion.button
            type="submit"
            className="chatbot-send"
            disabled={!input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send"
          >
            Send
          </motion.button>
        </form>
      </motion.div>
      <style>{`
        .chatbot { position: relative; }
        .chatbot-sub {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 2rem;
          max-width: 560px;
        }
        .chatbot-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          max-width: 640px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04);
        }
        .chatbot-messages {
          min-height: 220px;
          max-height: 380px;
          overflow-y: auto;
          padding: 1.5rem 1.5rem 1rem;
        }
        .chatbot-placeholder {
          color: var(--text-dim);
          font-size: 0.95rem;
          text-align: center;
          padding: 2rem 1rem;
        }
        .chatbot-msg {
          display: flex;
          margin-bottom: 1rem;
        }
        .chatbot-msg--user { justify-content: flex-end; }
        .chatbot-msg--assistant { justify-content: flex-start; }
        .chatbot-msg-bubble {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .chatbot-msg--user .chatbot-msg-bubble {
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--border-bright);
          color: var(--text);
        }
        .chatbot-msg--assistant .chatbot-msg-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .chatbot-msg--assistant .chatbot-msg-bubble strong {
          color: var(--accent);
          font-weight: 600;
        }
        .chatbot-msg-link {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
          word-break: break-all;
        }
        .chatbot-msg-link:hover {
          opacity: 0.9;
        }
        .chatbot-typing {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .chatbot-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-dim);
          animation: chatbot-dot 1.2s ease-in-out infinite both;
        }
        .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes chatbot-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        .chatbot-quick {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0 1.5rem 1rem;
        }
        .chatbot-quick-btn {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .chatbot-quick-btn:hover {
          color: var(--accent);
          border-color: var(--border-bright);
          background: rgba(255,255,255,0.08);
        }
        .chatbot-form {
          display: flex;
          gap: 0.5rem;
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid var(--border);
        }
        .chatbot-input {
          flex: 1;
          font-family: var(--font-body);
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-deep);
          color: var(--text);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .chatbot-input::placeholder { color: var(--text-dim); }
        .chatbot-input:focus {
          border-color: var(--border-bright);
          box-shadow: 0 0 0 2px rgba(255,255,255,0.06);
        }
        .chatbot-send {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          border: 1px solid var(--accent);
          background: transparent;
          color: var(--accent);
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }
        .chatbot-send:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
        }
        .chatbot-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
