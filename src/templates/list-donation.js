import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, DonationArticle, Wrapper, Button, SectionTitle } from 'components';
import { media } from '../utils/media';
import Dashboard from '../components/Dashboard';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media ${media.tablet} {
    padding: 3rem 2rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 1rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  p {
    font-size: 1.68rem;
    margin-top: -1rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

const dashboardData = (data) => {
  const dashboard = [];
  data.forEach(post => {
    const item = {
      id: post.node.id,
      title: post.node.name,
      description: post.node.excerpt,
      amount: post.node.amount,
      total: post.node.total,
      approved: post.node.accepted,
      waiting: post.node.waiting,
      rejected: post.node.rejected,
      status: post.node.status,
      slug: post.node.fields.slug,
    }
    dashboard.push(item);
  });
  return dashboard;
}

const ListDonation = ({
  data: {
    allDonorapiDonation: { edges: postEdges },
  },
}) => (
  <Layout>
    <Wrapper>
      <Hero>
        <p>
          DONOR APPROVE SMART CONTRACT
        </p>
      </Hero>
      <Content>
        <SectionTitle>Latest stories</SectionTitle>
        {/* {postEdges.map(post => (
          <DonationArticle
            title={post.node.name}
            date={post.node.createdOn}
            excerpt={post.node.excerpt}
            slug={post.node.fields.slug}
            approvalUri={`/`}
            key={post.node.fields.slug}
          />
        ))} */}
        <Dashboard data={dashboardData(postEdges)} />
      </Content>
    </Wrapper>
  </Layout>
);

export default ListDonation;

ListDonation.propTypes = {
  data: PropTypes.shape({
    allDonorapiApproval: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const IndexQuery = graphql`
  query {
    allDonorapiDonation(sort: { fields: [donateOn], order: DESC }) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
          excerpt
          status
          amount
          total
          accepted
          rejected
          waiting
        }
      }
    }
  }
`;
