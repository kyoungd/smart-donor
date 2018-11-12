import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header, Subline, Article, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import DashApproval from '../components/Dashboard/DashApproval';

const dashboardData = require('./api-root-donation');

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

function ListApprovals () {
  // const { donationId } = props;
  const donationId = "1";
  const totalCount = dashboardData.data.length;
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${dashboardData.donationName}"`;

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${donationId} | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{dashboardData.donationName}</Link>
        </Header>
        <Content>
          <Subline sectionTitle>
            {subline} (See <Link to="/">all donations</Link>)
          </Subline>
          <DashApproval data={dashboardData.data} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default ListApprovals;
