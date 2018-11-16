import React, { Component } from 'react'
import styled from 'styled-components';
import { Layout, Wrapper } from 'components';
import { media } from '../utils/media';
import CampaignCard from '../components/Dashboard/CampaignCard';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';
import ApiRoot from '../models/api-root.js';
import ApiRootHelper from '../models/api-root-helper.js';
import config from '../../config/SiteConfig';
import DonationPage from '../components/DonateForm/DonationPage';
import CampaignPage from '../components/DonateForm/CampaignPage';
import SupplierRequestProductCard from '../components/Dashboard/SupplierRequestProductCard';

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
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: '',
    };
  }

  async componentDidMount() {
    try {
      console.log('root-componentDidMount: start');
      const data = await ApiRoot(config.siteState);
      const helper = await ApiRootHelper(config.siteState);
      this.setState({data, helper, dataOk: true});
      console.log('root-componentDidMount: ', data);
    } catch (error) {
      console.log(error);
    }
  }

  PageRootEdit = () => {
    return config.siteState == config.siteStateDonor ? DonationPage :
      ( config.siteState == config.siteStateCustomer ? CampaignPage : undefined);
  }

  PageRootAdd = () => {
      return config.siteState == config.siteStateDonor ? DonationPage :
      ( config.siteState == config.siteStateCustomer ? CampaignPage : undefined);
  }

  PageRoot = () => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return CampaignCard;
      case config.siteStateCampaign:
        return CampaignCard;
      case config.siteStateSupplier:
        return SupplierRequestProductCard;
      default:
        return undefined;
    }
  }

  renderOk() {
    const { data, pageState, pageEntityId } = this.state;
    const emptyItem =
      { id: "", title: "", description: "", rules: "", availableOn: "", amount:0, accountNumber:"", routingNumber:"" }

    console.log('root-render: ', this.state);
    return (
      <div>
      {
        pageState == config.pageState[config.siteState].rootAdd ? this.PageRootAdd().call(this, 'new') :
        (
          data.map(item => 
            pageState == config.pageState[config.siteState].rootList && item.id !== 'new' ? this.PageRoot().call(this, item) :
            (pageState == config.pageState[config.siteState].rootEdit && pageEntityId == item.id ? this.PageRootEdit().call(this, item.id) : '')
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
