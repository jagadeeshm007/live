import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaTwitter, FaInstagram, FaMedium, FaDev } from 'react-icons/fa';

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: #000000;
    z-index: -1;
  }
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

const SocialSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SocialCard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  height: 80px;

  svg {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.accent};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
    border-color: rgba(147, 51, 234, 0.5);
  }
`;

const SocialText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow: hidden;
`;

const SocialLabel = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const SocialValue = styled.span`
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ContactSectionProps {
  id: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const socialLinks = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'jagadeeshm943@gmail.com',
      href: 'mailto:jagadeeshm943@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 7893959928',
      href: 'tel:+917893959928'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'github.com/jagadeeshm007',
      href: 'https://github.com/jagadeeshm007'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'Jagadeesh Mandala',
      href: 'https://linkedin.com/in/jagadeeshmandala'
    },
    {
      icon: <FaTwitter />,
      label: 'Twitter',
      value: '@Jagadeesh140703',
      href: 'https://twitter.com/Jagadeesh140703'
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      value: '@jagadeesh__1333',
      href: 'https://instagram.com/jagadeesh__1333'
    },
    // {
    //   icon: <FaMedium />,
    //   label: 'Medium',
    //   value: '@jagadeesh.tech',
    //   href: 'https://medium.com/@jagadeesh.tech'
    // },
    // {
    //   icon: <FaDev />,
    //   label: 'Dev.to',
    //   value: '@jagadeesh',
    //   href: 'https://dev.to/jagadeesh'
    // }
  ];

  return (
    <Section id={id}>
      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Get In Touch
        </Title>

        <SocialSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <SocialCard
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
            >
              {link.icon}
              <SocialText>
                <SocialLabel>{link.label}</SocialLabel>
                <SocialValue>{link.value}</SocialValue>
              </SocialText>
            </SocialCard>
          ))}
        </SocialSection>
      </ContentWrapper>
    </Section>
  );
};

export default ContactSection; 