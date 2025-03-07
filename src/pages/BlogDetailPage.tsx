import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogPost } from '../utils/blogData';

const BlogDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
`;

const BackButton = styled(motion.button)`
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BlogHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const BlogTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    #E0F2FE 0%,
    #BAE6FD 15%,
    #7DD3FC 35%,
    #38BDF8 55%,
    #0EA5E9 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BlogDate = styled.div`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const BlogImage = styled.div`
  width: 100%;
  height: 500px;
  background: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BlogContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BlogText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4b5563;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #000000;
    margin: 2rem 0 1rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const BlogSidebar = styled.div`
  background: #f3f4f6;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000000;
    margin-bottom: 1rem;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: #ffffff;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ShareButton = styled.a`
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BlogDetailPage = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const blog = blogId ? getBlogPost(blogId) : undefined;

  if (!blog) {
    return (
      <BlogDetailContainer>
        <BackButton onClick={() => navigate('/blogs')}>
          ← Back to Blogs
        </BackButton>
        <h1>Blog post not found</h1>
      </BlogDetailContainer>
    );
  }

  return (
    <BlogDetailContainer>
      <BackButton onClick={() => navigate('/blogs')}>
        ← Back to Blogs
      </BackButton>

      <BlogHeader>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogDate>{blog.date}</BlogDate>
      </BlogHeader>

      <BlogImage style={{ backgroundImage: `url(${blog.image})`, backgroundSize: 'cover' }} />

      <BlogContent>
        <BlogText>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </BlogText>

        <BlogSidebar>
          <SidebarSection>
            <h3>About the Author</h3>
            <p>{blog.author}</p>
            <p>{blog.readTime}</p>
          </SidebarSection>

          <SidebarSection>
            <h3>Tags</h3>
            <TagList>
              {blog.tags.map((tag: string, index: number) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagList>
          </SidebarSection>

          <ShareButtons>
            <ShareButton href="#" target="_blank" rel="noopener noreferrer">
              Share on Twitter
            </ShareButton>
            <ShareButton href="#" target="_blank" rel="noopener noreferrer">
              Share on LinkedIn
            </ShareButton>
          </ShareButtons>
        </BlogSidebar>
      </BlogContent>
    </BlogDetailContainer>
  );
}; 