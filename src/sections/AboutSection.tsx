import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaCertificate, FaCode } from 'react-icons/fa';

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  background: linear-gradient(to right, ${props => props.theme.colors.accent}, ${props => props.theme.colors.text});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    border-color: rgba(147, 51, 234, 0.5);
    transform: translateX(5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  svg {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const EducationDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const Degree = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const College = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Coursework = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Role = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const Duration = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const Achievements = styled.ul`
  list-style-type: none;
  padding-left: 0;
  
  li {
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: "•";
      color: ${props => props.theme.colors.accent};
      position: absolute;
      left: 0;
    }
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 15px;
  padding: 1.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(147, 51, 234, 0.5);
    box-shadow: 0 10px 30px -10px rgba(147, 51, 234, 0.3);
  }
`;

const AchievementHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(147, 51, 234, 0.2);
  padding-bottom: 1rem;
  
  svg {
    font-size: 1.6rem;
  }
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: ${props => props.theme.colors.text};
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    font-size: 1rem;
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
    
    &:before {
      content: "→";
      color: ${props => props.theme.colors.accent};
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    span {
      color: ${props => props.theme.colors.accent};
      font-weight: 600;
    }
  }
`;

const AboutSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Section id={id}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </Title>

        <Grid>
          <Card
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <FaGraduationCap />
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <EducationDetails>
              <Degree>Bachelor of Technology in Computer Science and Engineering</Degree>
              <College>Aditya College of Engineering and Technology, Surampalem</College>
              <Coursework>
                Relevant Coursework: Data Structures, Algorithms, Operating Systems, OOP, Database Systems
              </Coursework>
            </EducationDetails>
          </Card>

          <Card
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardHeader>
              <FaBriefcase />
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            
            <ExperienceItem>
              <Role>AWS DevOps Internship</Role>
              <Duration>June 2024 – Aug 2024</Duration>
              <Achievements>
                <li>Collaborated on cloud infrastructure projects, deploying applications that supported 1000+ users with optimized scaling and reliability.</li>
                <li>Utilized AWS services to enhance deployment efficiency by 20%, deepening expertise in cloud automation.</li>
              </Achievements>
            </ExperienceItem>

            <ExperienceItem>
              <Role>C Programming & DSA Tutor Intern</Role>
              <Duration>March 2023 - July 2023</Duration>
              <Achievements>
                <li>Conducted over 50+ instructional sessions in C programming and Data Structures, resulting in a 25% average improvement in student performance.</li>
                <li>Provided detailed feedback and tailored support to ensure measurable student progress.</li>
              </Achievements>
            </ExperienceItem>
          </Card>
        </Grid>

        <AchievementsGrid>
          <AchievementCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AchievementHeader>
              <FaCode />
              Competitive Coding
            </AchievementHeader>
            <AchievementList>
              <li>
                <span>3-Star</span> Coder on CodeChef with peak rating of <span>1637</span>
              </li>
              <li>
                Achieved <span>1547</span> rating in LeetCode contests
              </li>
              <li>
                Solved <span>700+</span> DSA problems across coding platforms
              </li>
              <li>
                Earned top badges in <span>MySQL</span>, <span>C++</span>, <span>Java</span> and <span>Python</span> on Hackerrank
              </li>
            </AchievementList>
          </AchievementCard>

          <AchievementCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AchievementHeader>
              <FaCertificate />
              Certifications
            </AchievementHeader>
            <AchievementList>
              <li>
                <span>AWS</span> Certified Cloud Practitioner
              </li>
              <li>
                <span>IT Specialist</span> certification in Python & Java
              </li>
              <li>
                <span>Red Hat</span> Certified System Administrator
              </li>
            </AchievementList>
          </AchievementCard>
        </AchievementsGrid>
      </ContentWrapper>
    </Section>
  );
};

export default AboutSection; 