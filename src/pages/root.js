import React from 'react';
import styled from 'styled-components';
import { Layout, Wrapper } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';

const dashboardData = require('./api-root');

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

const ListDonation = () => (
  <Layout>
    <Wrapper>
      <TitleArea>
        <CampaignAddButton />
      </TitleArea>
      <Content>
        {dashboardData.map(item => (
          <CampaignCard data={item} key={item.id} />
        ))}
      </Content>
    </Wrapper>
  </Layout>
);

export default ListDonation;
