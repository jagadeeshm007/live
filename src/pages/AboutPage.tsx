import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import MusicPlayer from '../components/MusicPlayer'; // Import the MusicPlayer component

const AboutPageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  font-family: 'Roboto Mono', monospace;
  background-color: #fff;
  color: #000;
`;

// Rest of your styled components remain the same
const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #000;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-bottom: 2px solid rgb(255, 255, 255);
  padding-bottom: 1rem;
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
  border: 1px solid #000;
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color:rgb(2, 0, 0);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #000;
`;

const Timeline = styled.div`
  position: relative;
  margin-top: 1.5rem;
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: 1.5rem;
  border-left: 1px solid rgb(0, 0, 0);
  padding-left: 1.5rem;
  margin-left: 0.5rem;
`;

const TimelineDate = styled.span`
  font-weight: 600;
  color: #fff;
  background-color: #ff0000;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ff0000;
`;

const TimelineTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  margin: 0.75rem 0;
`;

const TimelineDescription = styled.p`
  color: #333;
  margin: 0.5rem 0;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SkillCard = styled.div`
  background: #fff;
  padding: 1.25rem;
  border: 1px solid #000;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color:rgb(0, 0, 0);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: #000;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      position: relative;
      padding-left: 1rem;
      
      &::before {
        content: '>';
        position: absolute;
        left: 0;
        color:rgb(0, 0, 0);
      }
    }
  }
`;

export const AboutPage = () => {
  return (
    <>
      <AboutPageContainer>
        <PageTitle>About Me</PageTitle>
        
        <Section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SectionTitle>My Story</SectionTitle>
          <Content>
            <p>
              I'm a passionate software engineer with a deep love for creating innovative solutions
              that make a difference. My journey in technology began with a curiosity about how
              things work on the internet, which led me to pursue a career in software development.
            </p>
            <p>
              Over the years, I've worked on various projects ranging from web applications to
              mobile apps, always striving to learn new technologies and best practices. My
              approach combines technical expertise with a strong focus on user experience and
              clean code principles.
            </p>
          </Content>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <SectionTitle>Experience</SectionTitle>
          <Timeline>
            <TimelineItem>
              <TimelineDate>2024 - Present</TimelineDate>
              <TimelineTitle>Freelancer Software Developer</TimelineTitle>
              <TimelineDescription>
                Worked on various projects ranging from web applications to
                mobile apps, always striving to learn new technologies and best practices.
              </TimelineDescription>
            </TimelineItem>
            <TimelineItem>
              <TimelineDate>2023</TimelineDate>
              <TimelineTitle>Full Stack Developer</TimelineTitle>
              <TimelineDescription>
                Developed and maintained multiple web applications using modern technologies.
                Collaborated with cross-functional teams to deliver high-quality solutions.
              </TimelineDescription>
            </TimelineItem>
          </Timeline>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <SectionTitle>Skills & Expertise</SectionTitle>
          <SkillsGrid>
            <SkillCard>
              <h3>Frontend</h3>
              <ul>
                <li>React & React Native</li>
                <li>TypeScript</li>
                <li>Next.js</li>
                <li>HTML5 & CSS3</li>
                <li>Redux & Context API</li>
                <li>Responsive Design</li>
              </ul>
            </SkillCard>
            <SkillCard>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Python</li>
                <li>Java</li>
                <li>SQL & NoSQL</li>
                <li>RESTful APIs</li>
                <li>GraphQL</li>
              </ul>
            </SkillCard>
            <SkillCard>
              <h3>Cloud & DevOps</h3>
              <ul>
                <li>AWS & Azure</li>
                <li>Docker & Kubernetes</li>
                <li>CI/CD</li>
                <li>Infrastructure as Code</li>
                <li>Monitoring & Logging</li>
                <li>Security Best Practices</li>
              </ul>
            </SkillCard>
            <SkillCard>
              <h3>Tools</h3>
              <ul>
                <li>Git & GitHub</li>
                <li>VS Code</li>
                <li>Postman</li>
                <li>Jira & Agile</li>
                <li>Testing Frameworks</li>
                <li>Performance Optimization</li>
              </ul>
            </SkillCard>
          </SkillsGrid>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <SectionTitle>Education</SectionTitle>
          <Timeline>
            <TimelineItem>
              <TimelineDate>2021 - 2025</TimelineDate>
              <TimelineTitle>Bachelor of Technology in Computer Science</TimelineTitle>
              <TimelineDescription>
                Graduated with honors, focusing on software engineering and web technologies.
                Participated in various hackathons and technical competitions.
              </TimelineDescription>
            </TimelineItem>
          </Timeline>
        </Section>
      </AboutPageContainer>
      
      {/* Add the Music Player component */}
      <MusicPlayer />
    </>
  );
};