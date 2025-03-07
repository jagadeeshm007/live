import styled from '@emotion/styled';
import { Section, SectionTitle, Card, CardTitle, List, ListItem } from './styles';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const Skills = () => {
  return (
    <Section id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Skills
      </SectionTitle>
      <SkillsGrid>
        <Card>
          <CardTitle>Languages</CardTitle>
          <List>
            <ListItem>C++</ListItem>
            <ListItem>Python</ListItem>
            <ListItem>Java</ListItem>
            <ListItem>JavaScript</ListItem>
            <ListItem>TypeScript</ListItem>
          </List>
        </Card>
        <Card>
          <CardTitle>Frontend</CardTitle>
          <List>
            <ListItem>React Native</ListItem>
            <ListItem>React.js</ListItem>
            <ListItem>Expo</ListItem>
            <ListItem>HTML</ListItem>
            <ListItem>CSS</ListItem>
          </List>
        </Card>
        <Card>
          <CardTitle>Backend & Cloud</CardTitle>
          <List>
            <ListItem>Node.js, Express</ListItem>
            <ListItem>Django</ListItem>
            <ListItem>AWS, GCP</ListItem>
            <ListItem>Docker, Kubernetes</ListItem>
            <ListItem>Jenkins, Ansible</ListItem>
          </List>
        </Card>
      </SkillsGrid>
    </Section>
  );
}; 