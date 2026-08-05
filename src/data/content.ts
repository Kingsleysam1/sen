export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  date: string;
  image: string;
}

export interface Milestone {
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface InsightQuote {
  id: string;
  quote: string;
  context: string;
  date: string;
  likesCount?: number;
}

export const HERO_DATA = {
  eyebrow: "LEADERSHIP. CLARITY. IMPACT.",
  name: "SHALOM ERNEST",
  subhead: "Management Consultant, Certified Leadership Trainer (FIMC · CMC) & Clarity Coach",
  ctaPrimary: "Book Discovery Session",
  ctaSecondary: "Explore Core Philosophy",
  tickerStats: [
    "10,000+ Young Leaders Impacted",
    "9+ Years Executive Strategy Advisory",
    "Certified Management Consultant (FIMC · CMC)",
    "95% Executive Transformation Rate",
    "15+ Federal & Academic Partners"
  ]
};

export const MANIFESTO_DATA = {
  quote: "We don't rise by motivation alone — we rise by clarity, character, and contribution.",
  fourPillars: ["Clarity", "Character", "Contribution", "Impact"],
  mission: "Empowering emerging leaders and high-performance organizations across Africa through evidence-based leadership frameworks and strategic governance."
};

export const BIO_DATA = {
  overview: "Shalom Ernest is a Management Consultant, Certified Leadership Trainer (FIMC · CMC), and Executive Clarity Coach based in Abuja, Nigeria. Over nine years of high-stakes advisory, he has engineered governance frameworks for government ministries, corporate boards, and non-profit institutions.",
  certifications: [
    { title: "Fellow, Institute of Management Consultants (FIMC)", detail: "Highest professional status in management consulting" },
    { title: "Certified Management Consultant (CMC)", detail: "Internationally recognized management qualification" },
    { title: "Certified Management Specialist (CMS)", detail: "Graduated with Distinction" },
    { title: "M.Sc. Candidate", detail: "Covenant University — Strategic Leadership Focus" },
    { title: "Associate Member", detail: "Institute of Leadership" }
  ],
  fellowships: [
    "Inspired to Lead Institute — Senior Fellow & Lead Trainer",
    "Lateef Jakande Leadership Academy — Public Service Governance Advisory",
    "Tony Elumelu Foundation — Entrepreneurship & Youth Leadership Mentor",
    "Friends for Leadership Network — Global Youth Policy Delegate"
  ],
  pillars: [
    {
      num: "01",
      title: "Clarity Conclave",
      description: "An elite executive mastermind where high-stakes decision-makers gain radical strategic focus, personal alignment, and legacy architecture."
    },
    {
      num: "02",
      title: "Youth Making Impact (YMI)",
      description: "A pan-African youth movement equipping over 10,000 young leaders with civic intelligence, ethical leadership, and high-demand vocational skills."
    },
    {
      num: "03",
      title: "Leadview Advisory",
      description: "A premier management practice offering organizational restructuring, executive training, governance advisory, and workforce alignment."
    },
    {
      num: "04",
      title: "Sustainability & Legacy",
      description: "Guiding family enterprises and founders to build inter-generational impact frameworks rooted in ethical governance."
    }
  ],
  awards: [
    { year: "2023", title: "MLA Foundation Transformational Leadership Award", issuer: "MLA Foundation" },
    { year: "2022", title: "National Orientation Agency Excellence Award", issuer: "Federal Republic of Nigeria (NOA)" },
    { year: "2021", title: "100 Change-Makers on the Plateau", issuer: "Plateau Youth Leadership Council" },
    { year: "2021", title: "20 Most Influential Young People in Taraba", issuer: "Taraba Enterprise & Leadership Forum" }
  ]
};

export const STATS_DATA = [
  { value: 10000, suffix: "+", label: "Young Leaders Impacted", detail: "Pan-African bootcamps & leadership academies" },
  { value: 9, suffix: "+", label: "Years Experience", detail: "Leadership strategy & organizational advisory" },
  { value: 95, suffix: "%", label: "Transformation Rate", detail: "Verified executive clarity & alignment" },
  { value: 15, suffix: "+", label: "Institutional Partners", detail: "State ministries, universities & global networks" }
];

export const MILESTONES_DATA: Milestone[] = [
  {
    number: "01",
    title: "Keynote Addresses & Thought Leadership",
    category: "PUBLIC SPEAKING & EXECUTIVE SUMMITS",
    description: "Delivered over 120+ keynote addresses across pan-African summits, corporate AGMs, and academic convocations focused on 'Architecting Future Leaders'.",
    highlights: ["Over 120 keynotes delivered globally", "Reaching 50,000+ live & virtual participants", "Keynote speaker at African Youth Leadership Conclave"]
  },
  {
    number: "02",
    title: "State Advisory & Governance Recognition",
    category: "PUBLIC SECTOR CONSULTING",
    description: "Consulted for state orientation agencies and federal youth ministries on policy frameworks for youth inclusion, ethical leadership curricula, and civil service workforce optimization.",
    highlights: ["NOA Excellence Award for National Cohesion", "Public Service Policy Framework Author", "Lateef Jakande Leadership Academy Faculty"]
  },
  {
    number: "03",
    title: "International Policy & Global Strategy",
    category: "GLOBAL NETWORKS",
    description: "Represented regional youth leadership delegations at global summits, forging cross-continental partnerships with European and Pan-African youth development networks.",
    highlights: ["Friends for Leadership Delegate", "Tony Elumelu Foundation Advisory Network", "Pan-African Youth Policy Contributor"]
  },
  {
    number: "04",
    title: "Elite Fellowships & Professional Inductions",
    category: "CONSULTING & ACADEMIC MERIT",
    description: "Inducted as Fellow of the Institute of Management Consultants (FIMC) and Certified Management Consultant (CMC) — the global benchmark for management advisory.",
    highlights: ["FIMC & CMC Highest Professional Designation", "CMS with Distinction Honors", "M.Sc. Candidate at Covenant University"]
  }
];

export const PARTNERS_DATA = [
  { name: "African Union", acronym: "AU", category: "Intergovernmental" },
  { name: "American University of Nigeria", acronym: "AUN", category: "Academic Institution" },
  { name: "G-Organization", acronym: "G-ORG", category: "Youth Alliance" },
  { name: "A'Doo Arts & Media", acronym: "A'DOO", category: "Media & Creative" },
  { name: "Taraba State University", acronym: "TSU", category: "Higher Education" },
  { name: "University of Jos", acronym: "UNIJOS", category: "Academic Institution" },
  { name: "African Film Institute", acronym: "AFI", category: "Creative Arts" },
  { name: "Hand of Favor Foundation", acronym: "HOFF", category: "Social Impact" },
  { name: "Impact Training Room", acronym: "ITR", category: "Executive Capacity" },
  { name: "Pannyword", acronym: "PANNYWORD", category: "Corporate Communications" },
  { name: "Nobis Solutions", acronym: "NOBIS", category: "Enterprise Tech" },
  { name: "Youth Ministers International", acronym: "YMI", category: "Civic Leadership" }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "clarity-before-strategy",
    title: "Why Most Organizational Strategies Fail: The Missing Clarity Blueprint",
    category: "STRATEGIC ADVISORY",
    readTime: "6 min read",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    summary: "Strategy without internal clarity is merely expensive momentum. Discover how top executives eliminate strategic drift before executing quarterly goals.",
    content: `
# Why Most Organizational Strategies Fail: The Missing Clarity Blueprint

In over nine years of management consulting and executive training, I have observed a recurring pattern across corporations, public sector bodies, and growing enterprises: **organizations do not fail because they lack ambition; they fail because they execute blindly on unexamined assumptions.**

When strategic drift occurs, leadership teams typically react by introducing new KPIs, restructuring hierarchies, or increasing meeting frequencies. Yet, these measures only accelerate confusion if foundational clarity is absent.

## The 3 Pillars of Strategic Clarity

1. **Purpose Alignment over Goal Velocity:** High velocity in the wrong direction is disastrous. True clarity defines *why* the destination matters before selecting the vehicle.
2. **Role & Identity Precision:** Teams perform at their zenith when every member understands not just their job description, but their direct contribution to collective legacy.
3. **Friction Auditing:** Identifying cognitive and operational bottlenecks before laying down execution roadmaps.

> "Clarity is not the absence of complexity; it is the mastery of priorities amidst noise."

When you establish radical clarity at the executive level, strategy ceases to be an annual document and becomes an intuitive, daily operating culture.
    `
  },
  {
    id: "character-in-crisis",
    title: "Leading Through Friction: The 4 Pillars of Character-Driven Leadership",
    category: "LEADERSHIP DEVELOPMENT",
    readTime: "5 min read",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    summary: "Motivation gets leaders through smooth seas, but character anchors the ship when economic and organizational storms strike.",
    content: `
# Leading Through Friction: The 4 Pillars of Character-Driven Leadership

In times of economic uncertainty and market volatility, charisma is insufficient. Followers look beyond polished keynote speeches to inspect the moral and emotional anchor of their leaders.

## The Four Anchors

* **Integrity under Pressure:** Maintaining commitments when compliance carries a heavy short-term cost.
* **Calm Competence:** Radiating composure that stabilizes team anxiety during organizational transitions.
* **Radical Transparency:** Communicating truth with empathy, ensuring no stakeholder is blindsided.
* **Servant Stewardship:** Viewing authority as a trust to be managed, not a trophy to be displayed.

Building these muscle groups requires deliberate daily practice, reflection, and accountability.
    `
  },
  {
    id: "empowering-african-youth",
    title: "Empowering 10,000+ Young Leaders: Lessons from Pan-African Youth Bootcamps",
    category: "YOUTH DEVELOPMENT",
    readTime: "7 min read",
    date: "May 2026",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    summary: "Reflections and operational frameworks from founding Youth Making Impact (YMI) and training emerging leaders across Africa.",
    content: `
# Empowering 10,000+ Young Leaders: Lessons from Pan-African Youth Bootcamps

Africa possesses the youngest demographic on the planet. Yet, potential without structured guidance remains dormant energy. Through **Youth Making Impact (YMI)**, we set out to transform passive potential into active civic and entrepreneurial leadership.

## Key Insights from Training 10,000+ Emerging Leaders

1. **Shift from Aid Mentality to Agency:** Young people do not need sympathy; they demand actionable toolkits and high-demand skills.
2. **Civic Intelligence is Non-Negotiable:** Leadership without civic responsibility breeds corruption; we embed ethical governance into every bootcamp curriculum.
3. **Peer Mentorship Networks:** Creation of sustainable local pods ensures training continues long after formal bootcamps conclude.

The future of African governance and enterprise is being written right now in classrooms, community halls, and digital hubs across the continent.
    `
  },
  {
    id: "executive-mindset-shift",
    title: "From Management to Mastery: Transitioning from Operational Control to Visionary Leadership",
    category: "EXECUTIVE COACHING",
    readTime: "4 min read",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    summary: "How senior executives break out of micro-management loops and step into long-term legacy creation.",
    content: `
# From Management to Mastery

Many senior executives remain trapped in tactical firefighting. They are excellent managers who have forgotten how to lead.

## Breaking the Operational Loop

* **Delegate with Decision Rights:** Transfer authority, not just task lists.
* **Schedule Uninterrupted Clarity Time:** Block 4 hours weekly dedicated solely to deep strategic thinking.
* **Measure Legacy Metrics:** Evaluate success by the leaders you raise, not the meetings you attend.
    `
  }
];

export const LINKEDIN_INSIGHTS: InsightQuote[] = [
  {
    id: "quote-1",
    quote: "Motivation is an emotional spark; clarity is an architectural blueprint. You can be motivated and still walk off a cliff. Build clarity first.",
    context: "Executive Masterclass on Strategic Focus",
    date: "3 days ago",
    likesCount: 1420
  },
  {
    id: "quote-2",
    quote: "Position gives you authority, but character gives you influence. Title without transformational impact is merely administrative noise.",
    context: "Lateef Jakande Leadership Academy Keynote",
    date: "1 week ago",
    likesCount: 2150
  },
  {
    id: "quote-3",
    quote: "If your leadership journey only benefits you, you haven't started leading yet — contribution is the true yardstick.",
    context: "Pan-African Youth Leadership Address",
    date: "2 weeks ago",
    likesCount: 1890
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "DISCOVERY & ADVISORY",
    question: "What happens during a Strategic Discovery Session with Shalom Ernest?",
    answer: "A Strategic Discovery Session is a focused, 60 to 90-minute deep-dive designed to diagnose organizational or personal bottlenecks. Before the call, you submit a brief diagnostic form. During the session, Shalom maps out your current state, identifies strategic misalignment, and delivers an immediate 3-point clarity roadmap."
  },
  {
    id: "faq-2",
    category: "CORPORATE & MANAGEMENT",
    question: "How does Leadview Advisory customize management training for corporate teams?",
    answer: "Every corporate advisory or training engagement begins with a stakeholder diagnostic and workforce alignment audit. We customize frameworks directly around your quarterly objectives, company culture, and sector-specific challenges."
  },
  {
    id: "faq-3",
    category: "EXECUTIVE COACHING",
    question: "Who is the Clarity Conclave designed for?",
    answer: "The Clarity Conclave is an exclusive mastermind and 1-on-1 coaching experience tailored specifically for C-suite executives, founders, public sector directors, and high-impact leaders seeking radical strategic focus, personal alignment, and legacy architecture."
  },
  {
    id: "faq-4",
    category: "KEYNOTES & SPEAKING",
    question: "What are Shalom's primary keynote topics for international conferences?",
    answer: "Shalom regularly delivers keynotes on 'Architecting Future Leaders', 'Leading Through Friction & Uncertainty', 'The Clarity Shift: Moving from Status to Significance', and 'Building Sustainable Pan-African Enterprises'."
  }
];

export const CONSULTATION_SERVICES = [
  {
    id: "strategic-discovery",
    title: "Strategic Discovery Session",
    duration: "60 - 90 Mins",
    format: "1-on-1 Virtual / Executive Boardroom",
    desc: "Targeted diagnosis of strategic bottlenecks, personal clarity alignment, and immediate 3-point roadmap."
  },
  {
    id: "leadership-training",
    title: "Corporate Leadership Training",
    duration: "Half-Day / Full-Day / Multi-Day",
    format: "On-site / Custom Retreats",
    desc: "Bespoke capacity development programs for middle and senior management teams."
  },
  {
    id: "corporate-advisory",
    title: "Leadview Corporate Advisory",
    duration: "Quarterly / Retainer",
    format: "Executive Board Advisory",
    desc: "Governance optimization, organizational restructuring, and strategic workforce alignment."
  },
  {
    id: "clarity-coaching",
    title: "Clarity Conclave Mastermind",
    duration: "3 - 6 Months Executive Track",
    format: "1-on-1 & Retreats",
    desc: "Intense personal clarity, legacy planning, and high-stakes executive coaching."
  }
];
