import { Section, SectionTitle, Card, CardTitle, List, ListItem } from './styles';

export const Achievements = () => {
  return (
    <Section id="achievements">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Achievements & Certifications
      </SectionTitle>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CardTitle>Competitive Coding</CardTitle>
        <List>
          <ListItem>700+ problems solved on LeetCode & GeeksforGeeks</ListItem>
          <ListItem>3-Star Coder on CodeChef (Highest Rating: 1637)</ListItem>
          <ListItem>LeetCode Rating: 1547</ListItem>
          <ListItem>Top badges in MySQL, C++, Java, Python on Hackerrank</ListItem>
        </List>
      </Card>
      <Card
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <CardTitle>Certifications</CardTitle>
        <List>
          <ListItem>Harvard CS50: Introduction to Computer Science</ListItem>
          <ListItem>AWS Cloud Practitioner</ListItem>
          <ListItem>Red Hat Certified System Administrator (RHCSA)</ListItem>
          <ListItem>IT Specialist in Python & Java</ListItem>
          <ListItem>Cisco C++ Essentials</ListItem>
        </List>
      </Card>
    </Section>
  );
}; 