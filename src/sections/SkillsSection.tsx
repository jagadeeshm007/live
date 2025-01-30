import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { 
  FaCode, FaDatabase, FaBrain, FaTools, FaCloud,
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaAws, FaLinux
} from 'react-icons/fa';
import { 
  SiCplusplus, SiTypescript, SiJavascript, SiMongodb, 
  SiDjango, SiExpress, SiKubernetes, SiJenkins, SiGooglecloud,
  SiReact, SiJira, SiAnsible,
  SiHtml5, SiCss3, SiExpo, SiGithub
} from 'react-icons/si';

const ContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 6rem 2rem;
  position: relative;
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

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%;
  margin: 0 auto;
`;

const SkillCategory = styled(motion.div)`
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

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.accent};
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Skill = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  
  svg {
    font-size: 1.6rem;
    color: ${props => props.theme.colors.accent};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

interface SkillCategoryItem {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SkillsSection: React.FC<{ id: string }> = ({ id }) => {
  const skillCategories: SkillCategoryItem[] = [
    {
      title: "Programming Languages",
      icon: <FaCode />,
      skills: [
        { name: "C++", icon: <SiCplusplus /> },
        { name: "Python", icon: <FaPython /> },
        { name: "Java", icon: <FaJava /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> }
      ]
    },
    {
      title: "Databases",
      icon: <FaDatabase />,
      skills: [
        { name: "SQL", icon: <FaDatabase /> },
        { name: "MongoDB", icon: <SiMongodb /> }
      ]
    },
    {
      title: "Core Skills",
      icon: <FaBrain />,
      skills: [
        { name: "Data Structures" },
        { name: "Algorithms" },
        { name: "OOP" },
        { name: "Low-Level Design" },
        { name: "Operating Systems" },
        { name: "Machine Learning" },
        { name: "Competitive Coding" }
      ]
    },
    {
      title: "Development Tools",
      icon: <FaTools />,
      skills: [
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "CSS", icon: <SiCss3 /> },
        { name: "React", icon: <FaReact /> },
        { name: "Django", icon: <SiDjango /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "React Native", icon: <SiReact /> },
        { name: "Expo", icon: <SiExpo /> }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: <FaCloud />,
      skills: [
        { name: "AWS", icon: <FaAws /> },
        { name: "GCP", icon: <SiGooglecloud /> },
        { name: "Docker", icon: <FaDocker /> },
        { name: "Kubernetes", icon: <SiKubernetes /> },
        { name: "Jenkins", icon: <SiJenkins /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "GitHub", icon: <SiGithub /> },
        { name: "Linux", icon: <FaLinux /> },
        { name: "Jira", icon: <SiJira /> },
        { name: "Ansible", icon: <SiAnsible /> },
        // { name: "Networking", icon: <SiNetworkmanager /> }
      ]
    }
  ];

  return (
    <Section id={id}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Proficiencies
        </Title>
        
        <SkillsContainer>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryHeader>
                {category.icon}
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              <SkillsGrid>
                {category.skills.map((skill, skillIndex) => (
                  <Skill
                    key={skillIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    {skill.icon && skill.icon}
                    <span>{skill.name}</span>
                  </Skill>
                ))}
              </SkillsGrid>
            </SkillCategory>
          ))}
        </SkillsContainer>
      </ContentWrapper>
    </Section>
  );
};

export default SkillsSection; 