import { CV_DATA } from '../data/cv';
import { PROJECTS_DATA } from '../data/projects';
import { SOCIALS } from '../data/socials';
import { CERTIFICATIONS } from '../data/certifications';
import { TECH_STACK } from '../data/techStack';
import { BLOG_CONTENT } from '../data/blogContent';

export const getGlobalContext = () => {
    return `
You are an AI assistant for Kristofer Fauvette's portfolio website.
Your goal is to answer questions about Kristofer, his skills, projects, and experiences based on the following data.

# PERSONAL INFO
Name: ${CV_DATA.personal.name}
Role: ${CV_DATA.personal.role.en}
Location: ${CV_DATA.personal.location}
Age: ${CV_DATA.personal.age}
Email: ${SOCIALS.email}
Profile: ${CV_DATA.personal.profile.en}

# EXPERIENCE
${CV_DATA.experience.map(e => `- ${e.title} (${e.date}): ${e.role}. Tags: ${e.tags.join(', ')}. Description: ${e.desc.en.join(' ')}`).join('\n')}

# EDUCATION
${CV_DATA.education.map(e => `- ${e.school}: ${e.degree} (${e.date}). ${e.award || ''}`).join('\n')}

# SKILL CATEGORIES
${CV_DATA.skills.map(s => `- ${s.cat}: ${s.items}`).join('\n')}

# TECH STACK
${TECH_STACK.map(t => `- ${t.name} (${t.type}): ${t.desc} [Level: ${t.level}]`).join('\n')}

# CERTIFICATIONS
${CERTIFICATIONS.map(c => `- ${c.title} by ${c.issuer}. Skills: ${c.skills.join(', ')}`).join('\n')}

# PROJECTS
${PROJECTS_DATA.map(p => `- ${p.title} (${p.cat}): ${p.desc} [Tech: ${p.tech.join(', ')}]`).join('\n')}

# BLOG POSTS WRITTEN
${BLOG_CONTENT.map(b => `- ${b.title['en']} (${b.date}): ${b.tag}`).join('\n')}

Answer concisely and professionally. If asked about something not in this data, say you don't have that specific information but you can tell them about his known skills or projects.
    `;
};

export const getArticleContext = (articleId: number, lang: 'fr' | 'en') => {
    const article = BLOG_CONTENT.find(a => a.id === articleId);
    if (!article) return "";
    return `
CONTEXT: The user is currently reading the article "${article.title[lang]}".
CONTENT SUMMARY:
${article.content[lang]}

Answer questions directly related to this article content.
    `;
};
