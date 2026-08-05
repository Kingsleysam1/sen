export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  summary: string;
  keyTakeaway: string;
  content: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  theme?: string;
  type: "Summit & Experience" | "Masterclass & Program" | "Executive Roundtable" | "Youth Forum";
  status: "Upcoming" | "Registration Open" | "Past Event";
  dateDisplay: string;
  timeDisplay: string;
  duration?: string;
  isoStartDate: string;
  isoEndDate: string;
  venue: string;
  fee: string;
  originalFee?: string;
  registrationUrl: string;
  flyerImage: string;
  description: string;
  highlights: string[];
  speakers?: { name: string; title?: string; avatar?: string }[];
  host: string;
}

export interface Initiative {
  id: string;
  title: string;
  number: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface Milestone {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InsightItem {
  id: string;
  topic: string;
  quote: string;
}

export const PROFILE_DATA = {
  fullName: "Shalom C. Ernest",
  shortName: "Shalom Ernest",
  title: "Management Consultant, Executive Leadership Trainer & Strategic Advisor",
  tagline: "Lead with Clarity. Build with Purpose.",
  email: "shalom4impact@gmail.com",
  phone: "+234 813 207 8249",
  location: "Lagos, Nigeria (Advising clients across Africa & globally)",
  socials: {
    linkedin: "https://www.linkedin.com/in/shalom-ernest-fimc-cmc-4028061a5",
    instagram: "https://instagram.com/shalomernest1",
    facebook: "https://www.facebook.com/shalom.ernest.98"
  },
  philosophy: "Great teams rarely fail from a lack of ambition—they stall when priorities become blurred. Real leadership is about creating focus, culture, and measurable progress.",
  mission: "Helping executives, founders, and public sector teams eliminate operational friction, align strategy with daily execution, and build organizations built to endure.",
  bio: "Shalom C. Ernest is a Certified Management Consultant (CMC, FIMC) and strategic advisor with over 9 years of hands-on experience advising corporate boards, non-profits, and government agencies. As principal at Leadview Consulting and convener of Clarity Conclave, Shalom has trained over 10,000 professionals and young leaders across Africa on strategic execution, governance, and organizational design.",
  certifications: [
    { title: "FIMC & CMC", detail: "Fellow of the Institute of Management Consultants (IMC) Nigeria & Certified Management Consultant" },
    { title: "CMS (Distinction)", detail: "Certified Management Specialist with distinction in time management by London Graduate School" },
    { title: "M.Sc. Candidate", detail: "Strategic Leadership at Covenant University, Nigeria" },
    { title: "Leadership Communication", detail: "Certified in Effective Leadership Communication by Centre for Social Awareness Advocacy and Ethics, MD, USA" },
    { title: "Institute of Leadership", detail: "Associate Member of the Institute of Leadership Coaching and Strategy" }
  ],
  affiliations: [
    "Core Leadership Team at Inspired to Lead Institute (John Maxwell Team Certified)",
    "Fellow of the Lateef Jakande Leadership Academy",
    "Active Mentor within Tony Elumelu Foundation (TEF) Mentorship Program",
    "Alumnus of Friends for Leadership Network (120+ nations)",
    "Alumnus of Platform Public Service Bootcamp (The Platform NG)"
  ],
  honors: [
    "MLA Foundation Leadership Award",
    "National Orientation Agency Civic Impact Award",
    "Recognized among 100 Change-Makers on the Plateau",
    "20 Most Influential Young People in Taraba State (2021)"
  ]
};

export const TRACK_RECORD = [
  { metric: "10,000+", label: "Leaders & Youth Trained", subtext: "Across Africa and international cohorts" },
  { metric: "9+", label: "Years Experience", subtext: "Executive Advisory & Governance" },
  { metric: "95%", label: "Client Satisfaction", subtext: "Based on executive post-session audits" },
  { metric: "15+", label: "Partner Organizations", subtext: "Public, Corporate & Academic Institutions" },
  { metric: "4", label: "National Honors", subtext: "Recognized for leadership & public service" }
];

export const INITIATIVES: Initiative[] = [
  {
    id: "clarity-conclave",
    number: "(01)",
    title: "Clarity Conclave",
    subtitle: "Thought Leadership & Clarity Hub",
    description: "Principal at a thought leadership and clarity hub empowering individuals and teams to live out their design and express their highest purpose.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80&sat=-100",
    highlights: [
      "Eliminate operational noise in leadership",
      "Executive alignment & strategic direction",
      "Purpose discovery & personal branding",
      "High-performance mindset coaching"
    ]
  },
  {
    id: "ymi",
    number: "(02)",
    title: "Youth Making Impact (YMI)",
    subtitle: "Non-Profit Youth Development",
    description: "Founded in 2018; a youth-led non-profit bridging skills, leadership, and talent development gaps.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80&sat=-100",
    highlights: [
      "Impacted over 10,000+ young leaders",
      "Career-readiness & soft skill bootcamps",
      "Civic empowerment & community projects",
      "Pan-African youth mentorship network"
    ]
  },
  {
    id: "leadview",
    number: "(03)",
    title: "Leadview Consulting",
    subtitle: "Enterprise Training Firm",
    description: "Head of a leadership development and management training firm committed to equipping corporations with cutting-edge skillsets.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80&sat=-100",
    highlights: [
      "Corporate execution & alignment systems",
      "Middle-management capacity building",
      "Cross-functional team velocity",
      "Customized leadership retreats"
    ]
  },
  {
    id: "legacy-advisory",
    number: "(04)",
    title: "Legacy & Sustainability",
    subtitle: "Advisory for HNWIs & Leaders",
    description: "Advisory partner to high-net-worth and high-profile individuals, designing enduring frameworks across family, business, and personal endeavors.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80&sat=-100",
    highlights: [
      "Enduring governance frameworks",
      "Multigenerational value transfer",
      "Philanthropic strategy & CSR",
      "Executive burnout prevention"
    ]
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    title: "Keynote Addresses & Thought Leadership",
    category: "Leadership Development & Strategic Consulting",
    description: "Inspiring executives, professionals, and youth leaders at national forums, delivering high-impact lectures on transformational leadership and organizational growth.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80&sat=-100"
  },
  {
    id: "m2",
    title: "State Advisory & Governance Recognition",
    category: "Public Sector & Youth Advocacy",
    description: "Partnering with government leaders to design pioneering youth development frameworks, civic empowerment models, and community impact initiatives.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80&sat=-100"
  },
  {
    id: "m3",
    title: "International Policy & Global Strategy",
    category: "Capacity Building & Management Advisory",
    description: "Contributing strategic, forward-thinking policy advisory on educational transformation, executive mentoring, and structural governance at international leadership summits.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80&sat=-100"
  },
  {
    id: "m4",
    title: "Elite Fellowships & Professional Inductions",
    category: "Institute Fellowship & Management Excellence",
    description: "Recognized as a Fellow and Certified Management Consultant by leading national institutes for a career dedicated to high-performance enterprise advisory.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80&sat=-100"
  },
  {
    id: "m5",
    title: "Executive Boardroom & Corporate Restructuring",
    category: "Corporate Governance & Advisory",
    description: "Advising enterprise boards on structural agility, governance frameworks, operational alignment, and executive succession planning.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80&sat=-100"
  },
  {
    id: "m6",
    title: "Pan-African Youth Leadership Summits",
    category: "Mentorship & Civic Empowerment",
    description: "Orchestrating transformative mentorship frameworks and capacity-building summits for next-generation leaders across Africa.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80&sat=-100"
  }
];

export const PARTNERS = [
  "African Union",
  "American University of Nigeria",
  "G-Organization",
  "A'Doo Arts & Media",
  "Taraba State University",
  "University of Jos",
  "African Film Institute",
  "Hand of Favor Foundation",
  "Impact Training Room",
  "Pannyword",
  "Nobis Solutions",
  "Youth Ministers International (YMI)"
];

export const ARTICLES: Article[] = [
  {
    id: "anatomy-of-execution",
    title: "The Anatomy of Execution: Transitioning from Noise to Strategic Clarity",
    category: "Clarity",
    readTime: "5 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "Operational noise is the greatest threat to modern organizational growth. Leaders must move from unmeasured busywork to a 'Clarity Cadence.'",
    keyTakeaway: "Identify your 'Single Point of Impact,' establish weekly execution rhythms, and measure progress instead of activity.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `Operational noise is the silent thief of enterprise growth. In many organizations, activity is routinely mistaken for achievement. Leaders find themselves immersed in back-to-back meetings, approving endless reports, and reacting to daily fires without ever advancing core strategic goals.

To transition from noise to strategic clarity, executives must institute a rigorous "Clarity Cadence":

1. Identify the Single Point of Impact: What single bottleneck, if eliminated, unlocks velocity across the entire organization? Focus resources here first.
2. Establish Weekly Execution Rhythms: Move away from vague quarterly intentions. Define weekly non-negotiable milestones tied directly to accountability owners.
3. Measure Progress, Not Busywork: Replace activity-based reporting with outcome metrics. Track real movement toward structural objectives.

When leaders cultivate character, discipline, and systematic clarity, teams stop running in place and begin building sustainable legacies.`
  },
  {
    id: "systemic-capacity",
    title: "Systemic Capacity: Building Resilient Youth Leaders in Africa",
    category: "Youth Impact",
    readTime: "6 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "Youth development requires moving past surface-level motivational seminars toward structured soft skill building and career-readiness curricula.",
    keyTakeaway: "Equip youth with systematic problem-solving, strategic communication, and adaptive emotional intelligence.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `Motivation alone is a short-lived spark. While inspiring young people is valuable, true transformation requires building deep systemic capacity.

Africa's demographic dividend presents an unprecedented opportunity, but only if emerging leaders are armed with practical operational skills:

- Systematic Problem Solving: Teaching framework-based analysis rather than trial-and-error decision making.
- Strategic Communication: Equipping youth to articulate value clearly across local and international stages.
- Adaptive Emotional Intelligence: Cultivating resilience required to navigate economic and career uncertainties.

Through Youth Making Impact (YMI), our work across 10,000+ young minds proves that when structured capacity meets hunger, transformation becomes inevitable.`
  },
  {
    id: "executive-pause",
    title: "The Executive Pause: Why High-Performing Leaders Retreat",
    category: "Leadership",
    readTime: "4 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "Constant action without strategic pause leads to executive burnout and vision drift.",
    keyTakeaway: "Intentional retreats provide psychological safety and distance required to evaluate systemic blockages and realign team priorities.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `In high-stakes environments, constant motion is often rewarded—until burnout or strategic drift takes hold.

The "Executive Pause" is not a luxury; it is a critical governance mechanism. Stepping back allows leaders to:

1. Gain Distance: Step out of the operational weeds to view organizational dynamics objectively.
2. Evaluate Systemic Blockages: Diagnose underlying cultural and structural impediments that daily routines obscure.
3. Realign Priorities: Ensure team energy is concentrated on high-value initiatives rather than historical inertia.

Leader, schedule your retreat before circumstances force one upon you.`
  },
  {
    id: "corporate-alignment",
    title: "Designing Corporate Alignment: Systems Over Slogans",
    category: "Corporate Strategy",
    readTime: "7 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "Corporate alignment is not built with slogans or lobby posters; it is an engineering challenge governed by operational systems and incentives.",
    keyTakeaway: "Audit daily workflows to ensure incentives reward the outcomes you preach.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `Many organizations plaster core values on boardroom walls while daily incentives reward opposing behavior.

Corporate alignment is an engineering discipline:

- Audit Daily Workflows: Look closely at how decisions are made, how information flows, and where handoffs fail.
- Align Incentives with Outcomes: If you preach collaboration but reward individual fiefdoms, friction will persist.
- Eliminate Redundant Friction: Prune meetings and approval layers that slow down decision velocity.

Slogans don't scale. Systems do.`
  },
  {
    id: "personal-clarity",
    title: "Unlocking Personal Clarity: The Strategy to Align Your Vision",
    category: "Clarity",
    readTime: "5 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "Feeling overwhelmed is rarely a time-management issue—it is a vision and alignment problem.",
    keyTakeaway: "Audit your mental and resource inputs, establish personal value hierarchies, and create habit systems that make high-value choices frictionless.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `When individuals report feeling chronically overwhelmed, the default reaction is usually to download a new calendar app or time-block schedule. But time management cannot solve a vision problem.

To unlock personal clarity:

1. Audit Inputs: Reduce information clutter and toxic cognitive noise.
2. Define Non-Negotiable Values: Establish what truly matters across career, character, and legacy.
3. Build Frictionless Habit Systems: Structure your environment so that high-value choices require minimal willpower.

Clarity creates quiet confidence.`
  },
  {
    id: "global-competence",
    title: "Global Competence, Local Impact: Preparing African Talent",
    category: "Leadership",
    readTime: "6 min",
    author: "Shalom Ernest, FIMC, CMC",
    summary: "African professionals are competing on a global stage and must combine deep local context with international operational excellence.",
    keyTakeaway: "Master strategic thinking, design rigorous business models, and execute with corporate-grade competence.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80&sat=-100",
    content: `The global market no longer recognizes geographical boundaries for intellectual capital. African leaders and professionals must operate with world-class standards while leveraging deep local insight.

Key pillars for global competence:
- Strategic Rigor: Applying battle-tested frameworks to solve complex organizational challenges.
- Corporate-Grade Execution: Delivering with precision, punctuality, and uncompromising quality.
- Ethical Fortitude: Building character-driven leadership that withstands systemic pressures.

When local context meets global competence, African talent leads the room.`
  }
];

export const LINKEDIN_INSIGHTS: InsightItem[] = [
  {
    id: "i1",
    topic: "Strategy & Systems",
    quote: "Strategic plans rarely fail because the slide deck was poor. They fail when daily priorities drift away from core objectives. Slogans don't scale—operational systems do."
  },
  {
    id: "i2",
    topic: "Youth Leadership",
    quote: "Motivation is a spark, but competence is the engine. Real leadership starts with practical problem-solving—you don't need a title to fix what's broken around you."
  },
  {
    id: "i3",
    topic: "Management Consulting",
    quote: "Consulting isn't about delivering generic frameworks. It's about diagnosing why an organization's engine is misfiring and helping leadership fix it."
  },
  {
    id: "i4",
    topic: "Operational Velocity",
    quote: "Friction is the quiet tax on team performance. Frequently, the highest-leverage strategic decision isn't adding a new initiative, but pruning what no longer serves."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What approach do you take during executive training sessions?",
    answer: "Sessions are interactive and practical. We analyze real organizational case studies, run structured strategic exercises, and focus on immediate operational takeaway plans rather than passive lectures."
  },
  {
    question: "Who is executive clarity coaching designed for?",
    answer: "It is built for founders, managing directors, NGO leaders, and senior executives who need to resolve strategic ambiguity, realign management teams, or restructure business priorities."
  },
  {
    question: "Do you advise both corporate businesses and public sector institutions?",
    answer: "Yes. Through Leadview Consulting and Clarity Conclave, we design tailored leadership frameworks and advisory programs for corporate boards, educational bodies, non-profits, and government agencies."
  },
  {
    question: "What is the typical engagement timeline for consulting projects?",
    answer: "Advisory engagements range from 2–4 week diagnostic retreats to 3–6 month systemic implementations with ongoing milestone tracking."
  },
  {
    question: "How can institutions collaborate with Youth Making Impact (YMI)?",
    answer: "Organizations can sponsor youth leadership cohorts, partner on soft skill bootcamps, or integrate YMI programs into their corporate social responsibility (CSR) initiatives."
  },
  {
    question: "Are advisory and coaching sessions available virtually?",
    answer: "Yes. We conduct both high-impact on-site workshops and virtual executive sessions for clients across Nigeria, Africa, and internationally."
  }
];

export const SERVICES = [
  { id: "strategic-discovery", title: "Strategic Discovery Session", duration: "90 Mins", format: "Virtual / On-site" },
  { id: "leadership-training", title: "Executive Leadership Training", duration: "Custom Retreats", format: "On-site / Corporate" },
  { id: "corporate-advisory", title: "Corporate Alignment Advisory", duration: "2 - 12 Weeks", format: "Systemic Consulting" },
  { id: "clarity-coaching", title: "Clarity & Legacy Coaching", duration: "1-on-1 Retainer", format: "Executive Retainer" }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "the-clarity-experience-2026",
    title: "THE CLARITY EXPERIENCE",
    organizer: "Clarity Conclave",
    theme: "The Power of Knowing What Matters",
    type: "Summit & Experience",
    status: "Upcoming",
    dateDisplay: "Sat. 4th July 2026",
    timeDisplay: "9:00 AM [WAT]",
    duration: "Full Day Experience",
    isoStartDate: "2026-07-04T09:00:00+01:00",
    isoEndDate: "2026-07-04T16:00:00+01:00",
    venue: "Favoured Place, Beside UP ASSO Building, 25 Ikorodu Road, Maryland, Lagos",
    fee: "Free Entry (Registration Compulsory)",
    registrationUrl: "https://bit.ly/TCEbyClarityConclave",
    flyerImage: "/src/assets/images/flyer_clarity_experience_1785847892158.jpg",
    description: "A curated experience for you to discover purpose, find direction and unlock your next phase with clarity.",
    highlights: [],
    host: "Shalom Ernest (Convener)"
  },
  {
    id: "elevate-your-edge-2026",
    title: "ELEVATE YOUR EDGE MASTERCLASS '26",
    organizer: "Clarity Conclave",
    theme: "2 Months Accountability, Support & Strategic Growth Program",
    type: "Masterclass & Program",
    status: "Registration Open",
    dateDisplay: "Starts 1st August 2026",
    timeDisplay: "Weekly Intensive Sessions",
    duration: "2 Months Cohort",
    isoStartDate: "2026-08-01T10:00:00+01:00",
    isoEndDate: "2026-09-30T17:00:00+01:00",
    venue: "Virtual Masterclass Hub & Live Cohort Sessions",
    fee: "₦35,000 (Was ₦50,000)",
    originalFee: "₦50,000",
    registrationUrl: "https://bit.ly/elevate-your-edge",
    flyerImage: "/src/assets/images/flyer_elevate_edge_1785847917282.jpg",
    description: "A two months accountability, support, and strategic growth program hosted by Shalom Ernest.",
    highlights: [],
    host: "Shalom Ernest (Host)"
  },
  {
    id: "virtual-meet-greet-2026",
    title: "VIRTUAL MEET & GREET",
    organizer: "Youth Making Impact & Empowerment Initiative",
    theme: "Interactive Executive & Youth Session with Sir Shalom Ernest",
    type: "Youth Forum",
    status: "Upcoming",
    dateDisplay: "Fri. 12th June 2026",
    timeDisplay: "8:00 PM - 9:30 PM [GMT+1]",
    duration: "90 Minutes Virtual",
    isoStartDate: "2026-06-12T20:00:00+01:00",
    isoEndDate: "2026-06-12T21:30:00+01:00",
    venue: "Virtual (Google Meet) & Yola / Abuja Community Hubs",
    fee: "Free Entry",
    registrationUrl: "https://bit.ly/TCEbyClarityConclave",
    flyerImage: "/src/assets/images/flyer_meet_greet_1785847933734.jpg",
    description: "Exclusive virtual session with Sir Shalom Ernest hosted by Youth Making Impact Initiative.",
    highlights: [],
    host: "Sir Shalom Ernest"
  }
];
