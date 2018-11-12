import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, SectionTitle, Header, Content, Subline, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import DashPostCard from '../components/Dashboard/DashPostCard';
import '../utils/prismjs-theme.css';
const dashboardData = require('./api-root-post.json');

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const PostPage = () => {
  const post = dashboardData;

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${post.productName} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{post.title}</Link>
        </Header>
        <Content>
          <DashPostCard data={post} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default PostPage;
