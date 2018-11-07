import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, SectionTitle, Header, Content, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import DonateForm from '../components/DonateForm/DonateForm';
import '../utils/prismjs-theme.css';

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const dashboardData = (data) => {
  const dashboard = [];
  data.forEach(post => {
    const item = {
      id: post.node.id,
      name: post.node.name,
      editslug: post.node.fields.editslug,
      description: post.node.description,
      amount: post.node.amount,
      availableOn: post.node.availableOn.slice(0, 10),
      expireOn: post.node.expireOn.slice(0, 10),
    }
    dashboard.push(item);
  });
  return dashboard;
}

const PostPage = props => {
  const { data } = props;
  const { edges } = data.allDonorapiDonation;
  
  return (
    <Layout>
      { dashboardData(edges).map(item => (
          <Wrapper>
            <Helmet title={`${item.name} | ${config.siteTitle}`} />
            <Header>
              <Link to="/">{config.siteTitle}</Link>
            </Header>
            <Content>
              <SectionTitle>MAKE DONATION</SectionTitle>
              <DonateForm data={item} />
            </Content>
          </Wrapper>
        ))}
    </Layout>
  );
};

export default PostPage;

PostPage.propTypes = {
  pageContext: PropTypes.shape({
    donationId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allDonorapiDonation: PropTypes.object.isRequired,
  }).isRequired,
};

export const postQuery = graphql`
  query DonorEditPage($donationId: String!) {
    allDonorapiDonation(
      sort: {fields: [donateOn], order: DESC}, 
      filter: {entityId: {eq: $donationId}}
    ) {
      edges {
        node {
          id
          name
          availableOn
          expireOn
          fields {
            editslug
          }
          description
          amount
        }
      }
      totalCount
    }
  }
`;
