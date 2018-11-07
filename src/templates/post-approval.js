import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, SectionTitle, Header, Content, Subline, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import Post from '../components/Dashboard/DashPost';
import '../utils/prismjs-theme.css';

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
      backslug: post.node.fields.backslug,
      createdOn: post.node.createdOn
    }
    dashboard.push(item);
  });
  return dashboard;
}

const PostPage = ({ pageContext: { prev, next }, data: { allDonorapiApproval } }) => {
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
        <SectionTitle>
          DONOR REIVEW AND APPROVAL
        </SectionTitle>
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
            backslug
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
