import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, DonationArticle, Wrapper, Button, SectionTitle } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';

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

const TitleArea = styled.div`
  grid-column: 2;
  border-radius: 1rem;
  padding: 1rem 6rem;
  @media ${media.tablet} {
    padding: 1rem 2rem;
  }
  @media ${media.phone} {
    padding: 1rem 1.5rem;
  }
  overflow: hidden;
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
      editslug: post.node.fields.editslug,
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
      <TitleArea>
        <CampaignAddButton />
      </TitleArea>
      <Content>
        {dashboardData(postEdges).map(item => (
          <CampaignCard data={item} key={item.id} />
        ))}
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
            editslug
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
