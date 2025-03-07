import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../utils/blogData';
import { useState, useEffect } from 'react';
import { ScrollToTop } from '../components/ScrollToTop';

const BlogsPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem 2rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
  background: rgb(0, 0, 0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #666666;
  max-width: 600px;
  font-family: 'JetBrains Mono', monospace;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BlogCard = styled(motion.div)`
  background: #F5F5F5;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #000000;
    
    h3 {
      color: #FFFFFF;
    }
  }
`;

const BlogTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const BlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogData = getBlogPosts();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  if (isLoading) {
    return (
      <BlogsPageContainer>
        <LoadingContainer>Loading blogs...</LoadingContainer>
      </BlogsPageContainer>
    );
  }

  return (
    <BlogsPageContainer>
      <ScrollToTop />
      <PageHeader>
        <PageTitle>Blog Posts</PageTitle>
        <PageDescription>
          Explore my thoughts and insights on software development, technology, and more
        </PageDescription>
      </PageHeader>
      <BlogsGrid>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={() => handleBlogClick(blog.id)}
            whileHover={{ scale: 1.02 }}
          >
            <BlogTitle>{blog.title}</BlogTitle>
          </BlogCard>
        ))}
      </BlogsGrid>
    </BlogsPageContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-family: 'JetBrains Mono', monospace;
  color: #666666;
  font-size: 1.1rem;
`; 