// Certifications — deliberately DEMOTED per the redesign brief: they render as a
// collapsed appendix on the CV page, not as a home-page section. All facts and
// verification links carried over from the previous site.
import type { Locale } from '../i18n/locales';

export interface Certification {
  title: string;
  issuer: string;
  badge: string;      // public/ path to the badge image
  certImage: string;  // public/ path to the full certificate scan
  description: Record<Locale, string>;
  skills: string[];
  verificationLink: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Network Technician Career Path',
    issuer: 'Cisco',
    badge: '/Images/Badges/network-technician-career-path.png',
    certImage: '/Images/Course_completion_cert/NetworkTechnicianCareerPathUpdate20251129-33-qj43gq_page-0001.jpg',
    description: {
      en: 'Cisco verifies the earner of this badge successfully completed the Networking Technician career path and achieved this student level credential. Earner has knowledge of networking fundamentals, how devices communicate, cabling, network addressing and services, basics of configuring Cisco devices, troubleshooting and support of endpoints, networks, and users including diagnostics and documentation as a member of a help desk team, and basic wireless. Participated in up to 50 practice activities.',
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le parcours de Technicien Réseau et obtenu ce titre de niveau étudiant. Le titulaire possède des connaissances sur les fondamentaux des réseaux, la communication entre appareils, le câblage, l'adressage réseau et les services, la configuration de base des appareils Cisco, le dépannage et le support des terminaux, des réseaux et des utilisateurs (y compris diagnostics et documentation au sein d'une équipe de support), ainsi que les bases du sans-fil. Participation à jusqu'à 50 activités pratiques.",
    },
    skills: ['Cisco IOS', 'IPv4/IPv6 Addressing', 'Network Troubleshooting', 'Copper and Fiber Cabling', 'Hierarchical Network Design', 'Help Desk', 'Wireless Access'],
    verificationLink: 'https://www.credly.com/badges/463abac1-c0fe-467b-bc02-6dc2ce9a971c/public_url',
  },
  {
    title: 'Networking Essentials',
    issuer: 'Cisco',
    badge: '/Images/Badges/networking-essentials-badge.png',
    certImage: '/Images/Course_completion_cert/cert-networking-essentials-FULL.png',
    description: {
      en: 'Cisco verifies the earner of this badge successfully completed the Networking Essentials course and achieved this student level credential. Earner has knowledge of fundamentals of networking, how devices communicate, network addressing and services, how to build a home or small office network and configure basic security, basics of configuring Cisco devices, and the basics of testing and troubleshooting network problems. Participated in up to 19 labs and 24 Cisco Packet Tracer activities.',
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le cours Networking Essentials et obtenu ce titre de niveau étudiant. Le titulaire possède des connaissances sur les fondamentaux des réseaux, la communication des appareils, l'adressage et les services réseau, la conception d'un réseau domestique ou SOHO, la configuration de la sécurité de base, la configuration des appareils Cisco et les bases du test et du dépannage réseau. Participation à jusqu'à 19 laboratoires et 24 activités Cisco Packet Tracer.",
    },
    skills: ['Basic Network Security', 'DHCP', 'Ethernet Networks', 'IPv4 and IPv6 Fundamentals', 'SOHO Networks'],
    verificationLink: 'https://www.credly.com/badges/a334dfd4-8e55-4099-a8f5-1a5913029acf/linked_in_profile',
  },
  {
    title: 'Networking Basics',
    issuer: 'Cisco',
    badge: '/Images/Badges/networking-basics-badge.png',
    certImage: '/Images/Course_completion_cert/cert-networking-basics-FULL.png',
    description: {
      en: 'Cisco verifies the earner of this badge successfully completed the Networking Basics course and achieved this student level credential. Earner has knowledge of the types of networks, how they work, how devices send and receive data, the types of network cabling, how IP addresses find information on the Internet, how transport and applications operate, and has practiced building a home wireless network. Participated in up to 13 Cisco Packet Tracer activities.',
      fr: "Cisco vérifie que le titulaire de ce badge a réussi le cours Networking Basics et obtenu ce titre de niveau étudiant. Le titulaire connaît les types de réseaux, leur fonctionnement, l'envoi et la réception de données, les types de câblage, le fonctionnement des adresses IP sur Internet, les protocoles de transport et d'application, et a pratiqué la mise en place d'un réseau sans fil domestique. Participation à jusqu'à 13 activités Cisco Packet Tracer.",
    },
    skills: ['Application Layer Services', 'IPv4 Addresses', 'Network Media', 'Network Types', 'Wireless Access'],
    verificationLink: 'https://www.credly.com/badges/45d4f330-cc09-4ce8-9cb5-b0670eef3add/linked_in_profile',
  },
  {
    title: 'Introduction to Cloud Infrastructures',
    issuer: 'Microsoft',
    badge: '/Images/Badges/Microsoft_logo.png',
    certImage: '/Images/Course_completion_cert/cert-cloud-infra-FULL.png',
    description: {
      en: "New to the cloud? Introduction to Cloud Infrastructure is a three-part series that teaches you basic cloud concepts, provides a streamlined overview of many Azure services, and guides you with hands-on exercises to deploy your first services for free. Complete all of the learning paths in the series if you're preparing for Exam AZ-900: Microsoft Azure Fundamentals.",
      fr: "Nouveau dans le cloud ? « Introduction to Cloud Infrastructure » est une série en trois parties qui enseigne les concepts de base du cloud, offre un aperçu simplifié de nombreux services Azure et vous guide avec des exercices pratiques pour déployer vos premiers services gratuitement. Idéal pour préparer l'examen AZ-900 : Microsoft Azure Fundamentals.",
    },
    skills: ['Cloud Concepts', 'Infrastructure', 'Architecture', 'Cloud Computing'],
    verificationLink: 'https://learn.microsoft.com/en-us/users/kristoferfauvette-9446/achievements/pgsskld4?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    badge: '/Images/Badges/Google__G__logo.png',
    certImage: '/Images/Course_completion_cert/cert-generative-ai-introduction.png',
    description: {
      en: 'This is an introductory micro-course aiming to explain what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google tools to help you develop your own Gen AI applications.',
      fr: "Il s'agit d'un micro-cours d'introduction visant à expliquer ce qu'est l'IA générative, comment elle est utilisée et en quoi elle diffère des méthodes traditionnelles d'apprentissage automatique. Il couvre également les outils Google pour vous aider à développer vos propres applications d'IA générative.",
    },
    skills: ['Generative AI', 'LLM'],
    verificationLink: 'https://www.skills.google/public_profiles/ec684137-9170-4a05-b02f-0d74407ba2ab/badges/19919725?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
  },
];
