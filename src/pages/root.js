import React, { Component } from 'react'
import styled from 'styled-components';
import { Layout, Wrapper } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';
const { ApiRoot } = require('../models/api-root.js');
import config from '../../config/SiteConfig';
import DonationPage from '../components/DonateForm/DonationPage';

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
      pageState: config.pageState.donor.rootList,
      pageEntityId: '',
    };
  }

  async componentDidMount() {
    try {
      console.log('root-componentDidMount: start');
      const data = await ApiRoot('DONOR');
      this.setState({data, dataOk: true});
      console.log('root-componentDidMount: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  PageRootEdit = () => {
    return config.siteState == config.siteStateDonor ? DonationPage : undefined;
  }

  PageRootAdd = () => {
      return config.siteState == config.siteStateDonor ? DonationPage : undefined;
  }

  PageRoot = () => {
      return config.siteState == config.siteStateDonor ? CampaignCard : undefined;
  }

  renderOk() {
    const { data, pageState, pageEntityId } = this.state;
    const emptyItem =
      { id: "", title: "", description: "", rules: "", availableOn: "", amount:0, accountNumber:"", routingNumber:"" }

    console.log('root-render: ', data);
    return (
      <div>
      {
        pageState == config.pageState.donor.rootAdd ? this.PageRootAdd().call(this, emptyItem) :
        (
          data.map(item => 
            pageState == config.pageState.donor.rootList ? this.PageRoot().call(this, item) :
            (pageState == config.pageState.donor.rootEdit && pageEntityId == item.id ? this.PageRootEdit().call(this, item) : '')
          )
        )
      }
      </div>
    )
  }

  renderLoading() {
    return <div>LOADING...</div>
  }

  render() {
    const { dataOk } = this.state;
    return (
      <Layout>
        <Wrapper>
          <TitleArea>
            { CampaignAddButton.call(this) }
          </TitleArea>
          <Content>
            { dataOk ? this.renderOk() : this.renderLoading() }
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
