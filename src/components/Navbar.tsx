import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { LoadingQuote } from './LoadingQuote';

const NavContainer = styled(motion.nav)<{ $hide: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(${props => props.$hide ? '-100%' : '0'});
  transition: transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.3) 100%
    );
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.15),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  transition: transform 0.3s ease;
  z-index: 1001;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.25rem;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  &:hover {
    transform: rotate(360deg);
  }
`;

const MobileNavLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 5rem 2rem;
  gap: 2rem;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div<{ isMobile?: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isMobile ? 'flex' : 'none'};
  }
`;

const NavLink = styled(motion.div)<{ isMobile?: boolean }>`
  color: #000000;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  font-size: ${props => props.isMobile ? '1rem' : '0.85rem'};
  cursor: pointer;
  position: relative;
  padding: 0.25rem 0;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  letter-spacing: -0.02em;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: element;

  &:hover {
    color: #000000;
    text-shadow: 0 2px 4px rgba(255, 255, 255, 0.7);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #000000, rgba(0, 0, 0, 0.8));
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AboutMeLink = styled(motion.a)<{ isMobile?: boolean }>`
  color: #000000;
  background: #ffffff;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  font-size: ${props => props.isMobile ? '1rem' : '0.85rem'};
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  margin-left: ${props => props.isMobile ? '0' : '1.5rem'};
  letter-spacing: -0.02em;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  width: ${props => props.isMobile ? '100%' : 'auto'};
  text-align: center;
`;

const HamburgerButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 24px;
  height: 2px;
  background-color: #000;
  display: block;
  transform-origin: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [draggedPath, setDraggedPath] = useState<string | null>(null);
  const [hideNav, setHideNav] = useState(false);
  console.log(draggedPath);
  useEffect(() => {
    let prevScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navbar when:
          // 1. At the top of the page
          // 2. Scrolling up
          setHideNav(currentScrollY > 50 && currentScrollY > prevScrollY);
          
          prevScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location.pathname, isInitialLoad]);

  const handleMouseDown = (text: string) => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
    }
    setIsDragging(true);
    dragTimeout.current = setTimeout(() => {
      if (isDragging) {
        navigator.clipboard.writeText(text).then(() => {
          console.log('Text copied to clipboard');
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    }, 200);
  };

  const handleMouseUp = () => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    return () => {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
      }
    };
  }, []);

  const handleNavigation = async (sectionId: string) => {
    if (isInitialLoad) return;
    setIsLoading(true);
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (isHomePage) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsLoading(false);
      }, 1000);
    } else {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsLoading(false);
      }, 1500);
    }
  };

  const handlePageNavigation = (path: string) => {
    if (isInitialLoad) return;
    setIsLoading(true);
    setIsMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1000);
  };

  const handleDoubleClick = (path: string) => {
    window.open(path, '_blank');
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, path: string) => {
    setDraggedPath(path);
    e.dataTransfer.setData('text/plain', window.location.origin + path);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedPath(null);
  };

  return (
    <>
      <LoadingQuote isVisible={isLoading} isInitialLoad={isInitialLoad} />
      <NavContainer
        $hide={hideNav}
      >
        <Logo to="/">
          <LogoImage 
            src="/uzumaki-clan-symbol/img.jpg" 
            alt="Uzumaki Clan Symbol"
            title="Dattebayo!"
          />
        </Logo>

        <NavLinks>
          {/* <NavLink 
            onClick={() => handleNavigation('projects')} 
            whileHover={{ scale: 1.1 }}
            onMouseDown={() => handleMouseDown('WORK & EXPERIENCE')}
            onMouseUp={handleMouseUp}
            onDoubleClick={() => handleDoubleClick('/#projects')}
            draggable
            onDragStart={(e) => handleDragStart(e, '/#projects')}
            onDragEnd={handleDragEnd}
          >
            WORK & EXPERIENCE
          </NavLink> */}
          
          <NavLink 
            onClick={() => handlePageNavigation('/blogs')} 
            whileHover={{ scale: 1.1 }}
            onMouseDown={() => handleMouseDown('BLOGS')}
            onMouseUp={handleMouseUp}
            onDoubleClick={() => handleDoubleClick('/blogs')}
            draggable
            onDragStart={(e) => handleDragStart(e as any, '/blogs')}
            onDragEnd={handleDragEnd}
          >
            BLOGS
          </NavLink>
          <NavLink 
            onClick={() => handlePageNavigation('/contact')} 
            whileHover={{ scale: 1.1 }}
            onMouseDown={() => handleMouseDown('CONNECT')}
            onMouseUp={handleMouseUp}
            onDoubleClick={() => handleDoubleClick('/contact')}
            draggable
            onDragStart={(e) => handleDragStart(e as any, '/contact')}
            onDragEnd={handleDragEnd}
          >
            CONNECT
          </NavLink>
          <AboutMeLink
            onClick={() => handlePageNavigation('/about')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={() => handleMouseDown('ABOUT ME')}
            onMouseUp={handleMouseUp}
            onDoubleClick={() => handleDoubleClick('/about')}
            draggable
            onDragStart={(e) => handleDragStart(e as any, '/about')}
            onDragEnd={handleDragEnd}
          >
            ABOUT ME
          </AboutMeLink>
        </NavLinks>

        <HamburgerButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
        >
          <HamburgerLine
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 8 }
            }}
          />
          <HamburgerLine
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
          />
          <HamburgerLine
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -8 }
            }}
          />
        </HamburgerButton>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLinks
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <NavLink 
                  onClick={() => handleNavigation('projects')} 
                  isMobile
                  onMouseDown={() => handleMouseDown('WORK & EXPERIENCE')}
                  onMouseUp={handleMouseUp}
                  onDoubleClick={() => handleDoubleClick('/#projects')}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, '/#projects')}
                  onDragEnd={handleDragEnd}
                >
                  WORK & EXPERIENCE
                </NavLink>
                <NavLink 
                  onClick={() => handlePageNavigation('/contact')} 
                  isMobile
                  onMouseDown={() => handleMouseDown('CONNECT')}
                  onMouseUp={handleMouseUp}
                  onDoubleClick={() => handleDoubleClick('/contact')}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, '/contact')}
                  onDragEnd={handleDragEnd}
                >
                  CONNECT
                </NavLink>
                <NavLink 
                  onClick={() => handlePageNavigation('/blogs')} 
                  isMobile
                  onMouseDown={() => handleMouseDown('BLOGS')}
                  onMouseUp={handleMouseUp}
                  onDoubleClick={() => handleDoubleClick('/blogs')}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, '/blogs')}
                  onDragEnd={handleDragEnd}
                >
                  BLOGS
                </NavLink>
                <AboutMeLink
                  onClick={() => handlePageNavigation('/about')}
                  isMobile
                  whileTap={{ scale: 0.95 }}
                  onMouseDown={() => handleMouseDown('ABOUT ME')}
                  onMouseUp={handleMouseUp}
                  onDoubleClick={() => handleDoubleClick('/about')}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, '/about')}
                  onDragEnd={handleDragEnd}
                >
                  ABOUT ME
                </AboutMeLink>
              </MobileNavLinks>
            </>
          )}
        </AnimatePresence>
      </NavContainer>
    </>
  );
}; 