import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const LinkedInIcon = () => (
  <svg className="contact-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="contact-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const links = [
  { href: 'mailto:humnesuyash@gmail.com', label: 'humnesuyash@gmail.com', icon: '✉' },
  { href: 'tel:9820823662', label: '9820823662', icon: '📞' },
  { href: 'https://www.linkedin.com/in/suyash-humne-4578b2305/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://github.com/Suyash2205', label: 'GitHub', icon: 'github' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="section contact" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        className="contact-intro"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Mumbai · Open to opportunities
      </motion.p>
      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {links.map(({ href, label, icon }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="contact-link"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {icon === 'linkedin' ? (
              <LinkedInIcon />
            ) : icon === 'github' ? (
              <GitHubIcon />
            ) : (
              <span className="contact-icon">{icon}</span>
            )}
            <span>{label}</span>
          </motion.a>
        ))}
      </motion.div>
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <div className="footer-line" />
        <p>© {new Date().getFullYear()} Suyash Humne. Built with React.</p>
      </motion.footer>
      <style>{`
        .contact {
          padding-bottom: 3rem;
        }
        .contact-intro {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 1rem 1.5rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: color 0.2s, border-color 0.2s;
        }
        .contact-link:hover {
          color: var(--accent);
          border-color: var(--border-bright);
        }
        .contact-icon {
          font-size: 1.1rem;
          opacity: 0.8;
        }
        .contact-logo {
          width: 1.35rem;
          height: 1.35rem;
          flex-shrink: 0;
          opacity: 0.9;
        }
        .contact-link:hover .contact-logo {
          opacity: 1;
        }
        .footer {
          text-align: center;
          padding-top: 2rem;
        }
        .footer-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin-bottom: 1.5rem;
        }
        .footer p {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          text-transform: uppercase;
        }
      `}</style>
    </section>
  );
}
