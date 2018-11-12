import React, { Component } from 'react'
import styled from 'styled-components';
import { Layout, Wrapper } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';

import CampaignAddButton from '../components/Dashboard/CampaignAddButton';

const { ApiRoot } = require('../models/api-root.js');

const dashboardData = () => { 
  let data;
  ApiRoot().then(result => { 
    data = result
  }).catch(function(error) {
    console.log(error);
  });
  console.log('dashboard-data: ', data);
  return ApiRoot().then(result => result) 
};

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

export default class ListDonation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataOk: false,
    };
  }

  async componentDidMount() {
    try {
      console.log('root-componentDidMount: start');
      const data = await ApiRoot();
      this.setState({data, dataOk: true});
      console.log('root-componentDidMount: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { data, dataOk } = this.state;
    console.log('root-render: ', data);
    if (dataOk) {
      return (
        <Layout>
          <Wrapper>
            <TitleArea>
              <CampaignAddButton />
            </TitleArea>
            <Content>
              {data.map(item => (
                <CampaignCard data={item} key={item.id} />
              ))}
            </Content>
          </Wrapper>
        </Layout>
      );
    }
    else {
      return <div></div>
    }
  }
}
