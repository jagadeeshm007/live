import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import { useState, useEffect } from 'react';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import SkillsSection from './sections/SkillsSection';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <main>
            <HomeSection id="home" />
            <AboutSection id="about" />
            <SkillsSection id="skills" />
            <ProjectsSection id="projects" />
            <ContactSection id="contact" />
          </main>
          <ScrollToTop />
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
