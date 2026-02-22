/**
 * Knowledge base for the "Ask about Suyash" chatbot.
 * Sourced from resume and LinkedIn. Used for quick replies and optional AI context.
 */
export const CHATBOT_KNOWLEDGE = {
  name: 'Suyash Humne',
  tagline: 'Building the bridge between data & impact',
  location: 'Mumbai',
  email: 'humnesuyash@gmail.com',
  phone: '9820823662',
  linkedin: 'https://www.linkedin.com/in/suyash-humne-4578b2305/',
  github: 'https://github.com/Suyash2205',

  summary: `I'm a third-year undergraduate at KJ Somaiya College of Engineering, studying Artificial Intelligence and Data Science. I actively explore technological applications and am committed to learning new programming languages. My strengths include building professional relationships and networking. I'm dedicated to leveraging my skills to address real-world challenges and contribute to innovative solutions.`,

  education: [
    { degree: 'Bachelor of Technology', institution: 'KJ Somaiya College of Engineering', period: 'July 2023 – present', detail: 'Honours in AI applications in Cyber Security. SGPA: 9.5' },
    { degree: 'HSC, Science', institution: 'Shri LR Tiwari Junior College of Commerce and Science', period: '2021 – 2023' },
    { degree: 'ICSE', institution: 'RBK Educational Institute', period: '2008 – 2021' },
  ],

  experience: [
    { role: 'Program Management Fellow', company: 'BuildUp Global', period: 'Dec 2025 – Feb 2026', points: ['Handled company meetings, coordinated with mentors and client stakeholders.', 'Managed student teams, monitored progress, maintained program workflow in a virtual setup.'] },
    { role: 'Web Development Head', company: 'Somaiya Voices', period: 'April 2024 – April 2025', points: ['Leading the Web Dev Team for the official website of Somaiya Voices.', 'Active member in the recruitment process.'] },
    { role: 'Jt. Alumni Relations Head', company: 'Alumni Cell', period: 'Aug 2024 – Aug 2025', points: ['Coordinated events, webinars, and communication initiatives.', 'Managed alumni database and facilitated student-alumni interactions.'] },
    { role: 'Management Team', company: 'Suhani Shah', period: 'Aug 2021 – Aug 2023', points: ['Assuring smooth functioning behind the scenes.', 'Managing and building the Discord server.'] },
    { role: 'User Acceptance Testing Intern', company: 'MAIDC', period: 'Jan 2024 – May 2024', points: ['Testing bugs and errors on the official website of Maha-Agro Mart.', 'Making the website more user-friendly.'] },
    { role: 'Managing Department', company: 'Fresa Frootz', period: 'Feb 2023 – present', points: ['Led customer engagement, marketing campaigns, and feedback analysis.', 'Product development and market positioning strategies.'] },
  ],

  projects: [
    { name: 'Lane Detection System', detail: 'ML implementation based on IEEE paper (HWLane). Tiny U-Net segmentation, BCE + Dice loss, SWA, TTA. TuSimple-style dataset.' },
    { name: 'Virtual Campus Tour with Admin Panel', detail: 'Fully dynamic website with admin panel, role-based access, dynamic updates, interactive navigation.' },
    { name: 'E-Waste Locator', detail: 'Website-based locator that detects user location and shows nearest authorized disposal facilities.' },
    { name: 'Smart Traffic Light', detail: 'Camera-based traffic analysis to dynamically adjust red light timers and optimize flow.' },
    { name: 'Number Maze Game', detail: 'Interactive educational math puzzle game for children.' },
    { name: 'Automatic Plant Watering System', detail: 'IoT-based system with sensors and microcontrollers for soil moisture and irrigation.' },
  ],

  skills: {
    languages: 'C/C++, Python, Java, HTML, CSS, JavaScript',
    webDev: 'React.js',
    databases: 'MySQL',
    coursework: 'Data Structures & Algorithms, Operating Systems, Computer Networks & Information Security, Database Management System',
    interests: 'App Development, Frontend, Backend, Game Development, Software Development',
    soft: 'Critical thinking, Problem solving, Creativity, Innovation.',
  },
};

/** Short answers for quick-reply buttons and simple intent matching */
export const CHATBOT_QUICK_ANSWERS = {
  work: `I'm a third-year B.Tech student in AI & Data Science at KJSCE (SGPA 9.5). I've been Web Dev Head at Somaiya Voices, Jt. Alumni Relations Head at Alumni Cell, and a Program Management Fellow at BuildUp Global. I've also done UAT at MAIDC and management roles at Fresa Frootz and Suhani Shah. I'm open to opportunities and love building professional relationships.`,

  about: CHATBOT_KNOWLEDGE.summary,

  skills: `I work with **C/C++, Python, Java**, and web tech (**HTML, CSS, JavaScript, React.js**), plus **MySQL**. My coursework covers DSA, OS, Computer Networks, DBMS, and Information Security. I'm interested in app dev, frontend/backend, game dev, and software development. I'd describe my soft skills as critical thinking, problem-solving, creativity, and innovation.`,

  contact: `You can reach me at **${CHATBOT_KNOWLEDGE.email}** or **${CHATBOT_KNOWLEDGE.phone}**. I'm based in Mumbai. LinkedIn: ${CHATBOT_KNOWLEDGE.linkedin} · GitHub: ${CHATBOT_KNOWLEDGE.github}. I'm open to opportunities and happy to connect.`,
};
