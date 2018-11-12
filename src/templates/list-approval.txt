import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header, Subline, Article, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import DashApproval from '../components/Dashboard/DashApproval';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 1000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

const dashboardData = (data) => {
  const dashboard = [];
  data.forEach(post => {
    const item = {
      id: post.node.id,
      title: post.node.name,
      excerpt: post.node.excerpt,
      status: post.node.approvalStatus,
      slug: post.node.fields.slug,
      video: post.node.video
    }
    dashboard.push(item);
  });
  console.log(JSON.stringify(dashboard, null, 4));
  return dashboard;
}

const ListApprovals = ({ pageContext: { donationId }, data: { allDonorapiApproval } }) => {
  const { edges, totalCount } = allDonorapiApproval;
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${edges[0].node.donationName}"`;

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${donationId} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{edges[0].node.donationName}</Link>
        </Header>
        <Content>
          <Subline sectionTitle>
            {subline} (See <Link to="/">all donations</Link>)
          </Subline>
          <DashApproval data={dashboardData(edges)} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default ListApprovals;

ListApprovals.propTypes = {
  pageContext: PropTypes.shape({
    donationId: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allDonorapiApproval: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query DonorListPage($donationId: String!) {
    allDonorapiApproval(
      sort: {fields: [createdOn], order: DESC}, 
      filter: {donationId: {eq: $donationId}}
    ) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
          donationName
          excerpt
          status
          approvalStatus
          description
          donationId
          createdOn
          video
        }
      }
      totalCount
    }
  }
`;
