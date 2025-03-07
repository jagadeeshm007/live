import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { BlogsPage } from './pages/BlogsPage';
import { Projects } from './components/Projects';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { Navbar } from './components/Navbar';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/ScrollToTop';
import styled from '@emotion/styled';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { Sitemap } from './pages/Sitemap';
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Projects />
              </>
            } />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </MainContent>
        <Footer />
        <ScrollToTop />
      </AppContainer>
    </Router>
  );
}

export default App; 