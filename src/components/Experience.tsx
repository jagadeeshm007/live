import styled from '@emotion/styled';
import { Section, SectionTitle, Card, CardTitle, List, ListItem } from './styles';

const ExperienceDate = styled.span`
  color: #666;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
`;

export const Experience = () => {
  return (
    <Section id="experience">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Work Experience & Internships
      </SectionTitle>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CardTitle>Freelance Software Developer</CardTitle>
        <ExperienceDate>2024 – Present</ExperienceDate>
        <List>
          <ListItem>Completed multiple freelance projects focused on React Native, Full Stack Development, and AWS</ListItem>
          <ListItem>Developed and deployed custom mobile and web applications for clients, ensuring optimal performance</ListItem>
          <ListItem>Successfully delivered solutions that improved client business operations and user engagement</ListItem>
        </List>
      </Card>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CardTitle>AWS DevOps Intern</CardTitle>
        <ExperienceDate>June 2024 – Aug 2024</ExperienceDate>
        <List>
          <ListItem>Deployed cloud applications supporting 1,000+ users with optimized scaling</ListItem>
          <ListItem>Automated cloud infrastructure, improving deployment efficiency by 20% using AWS tools</ListItem>
        </List>
      </Card>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <CardTitle>C Programming & DSA Tutor Intern</CardTitle>
        <ExperienceDate>March 2023 - July 2023</ExperienceDate>
        <List>
          <ListItem>Conducted 50+ training sessions, helping students achieve a 25% improvement in DSA skills</ListItem>
          <ListItem>Designed interactive problem-solving workshops to reinforce programming concepts</ListItem>
        </List>
      </Card>
    </Section>
  );
}; 