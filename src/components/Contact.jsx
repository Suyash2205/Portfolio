import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const links = [
  { href: 'mailto:humnesuyash@gmail.com', label: 'humnesuyash@gmail.com', icon: '✉' },
  { href: 'tel:9820823662', label: '9820823662', icon: '📞' },
  { href: 'https://www.linkedin.com/in/suyash-humne', label: 'LinkedIn', icon: 'in' },
  { href: 'https://github.com/Suyash2205', label: 'GitHub', icon: 'gh' },
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
            <span className="contact-icon">{icon}</span>
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
