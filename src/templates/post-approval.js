import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, SectionTitle, Header, Subline, SEO, PrevNext } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import Post from '../components/Dashboard/DashPost';
import '../utils/prismjs-theme.css';

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const dashboardData = (data) => {
  const dashboard = [];
  data.forEach(post => {
    const item = {
      id: post.node.id,
      title: post.node.name,
      html: post.node.html,
      status: post.node.approvalStatus,
      video: post.node.video,
      slug: post.node.fields.slug,
      createdOn: post.node.createdOn
    }
    dashboard.push(item);
  });
  return dashboard;
}

const PostPage = ({ pageContext: { id, slug, prev, next }, data: { allDonorapiApproval } }) => {
  const { edges } = allDonorapiApproval;
  const post = edges[0].node;

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${post.name} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
        <SectionTitle>DONOR REIVEW AND APPROVAL</SectionTitle>
          <Post data={dashboardData(edges)} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default PostPage;

PostPage.propTypes = {
  pageContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
    donationId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    allDonorapiApproval: PropTypes.object.isRequired,
  }).isRequired,
};

export const postQuery = graphql`
  query PostPage($id: String!) {
    allDonorapiApproval(
      sort: { fields: [createdOn], order: DESC },
      filter: { id: { eq: $id } }
    ){
      edges {
        node {
          id
          name
          createdOn
          fields {
            category
            slug
          }
          html
          video
          description
          approvalStatus
        }
      }
      totalCount
    }
  }
`;
