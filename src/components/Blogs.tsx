import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { getBlogPosts } from '../utils/blogData';

const BlogsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BlogsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    rgb(255, 255, 255) 0%,
    rgb(222, 222, 222) 15%,
    rgb(165, 165, 165) 35%,
    rgb(77, 77, 77) 55%,
    rgb(48, 48, 48) 75%,
    rgb(0, 0, 0) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
`;

const BlogCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: #f3f4f6;
  position: relative;
  overflow: hidden;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogDate = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  display: block;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.75rem;
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ViewMoreButton = styled(motion.button)`
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 10;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Blogs = () => {
  const navigate = useNavigate();
  const blogs = getBlogPosts().slice(0, 3); // Get only the 3 most recent blogs

  const handleViewMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/blogs');
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <AnimatedSection id="blogs">
      <BlogsHeader>
        <BlogsTitle>Recent Blogs</BlogsTitle>
      </BlogsHeader>
      <BlogsGrid>
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={() => handleBlogClick(blog.id)}
            style={{ cursor: 'pointer' }}
          >
            <BlogImage style={{ backgroundImage: `url(${blog.image})`, backgroundSize: 'cover' }} />
            <BlogContent>
              <BlogDate>{blog.date}</BlogDate>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogsGrid>
      <ViewMoreButton
        onClick={handleViewMore}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View More Blogs
      </ViewMoreButton>
    </AnimatedSection>
  );
}; 