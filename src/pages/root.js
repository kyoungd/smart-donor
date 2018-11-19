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
import ProductPage from '../components/DonateForm/ProductPage';
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
    } catch (error) {
      console.log(error);
    }
  }

  PageRootEdit = () => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return DonationPage;
      case config.siteStateCustomer:
        return CampaignPage;
      case config.siteStateSupplier:
        return ProductPage;
      default:
        return undefined;
    }
  }

  PageRootAdd = () => {
      return config.siteState == config.siteStateDonor ? DonationPage :
      ( config.siteState == config.siteStateCustomer ? CampaignPage : undefined);
  }

  PageRoot = () => {
    switch (config.siteState) {
      case config.siteStateDonor:
        return CampaignCard;
      case config.siteStateCustomer:
        return CampaignCard;
      case config.siteStateSupplier:
        return SupplierRequestProductCard;
      default:
      console.log('PageRoot exception: ', config.siteState, config.siteStateCustomer, CampaignCard);
        return undefined;
    }
  }

  mainRenderer = (pageState, data, pageEntityId) => {
    switch (pageState) {
      case config.pageState[config.siteState].rootAdd:
        return this.PageRootAdd().call(this, 'new');
      case config.pageState[config.siteState].rootList:
        return data.map(item => item.id !== 'new' && item.id !== 'blank' ? this.PageRoot().call(this, item) : '');
      case config.pageState[config.siteState].rootEdit:
        return data.map(item => pageEntityId == item.id ? this.PageRootEdit().call(this, item.id) : '');
      default:
        return '';
    }
  }

  renderOk() {
    const { data, pageState, pageEntityId } = this.state;
    const emptyItem =
      { id: "", title: "", description: "", rules: "", availableOn: "", amount:0, accountNumber:"", routingNumber:"" }

    console.log('--------------------------------------------------------------------root-render: ', this.state);
    return (
      <div>{ this.mainRenderer(pageState, data, pageEntityId) }</div>
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
            { config.pageState[config.siteState].rootAdd !== '' && CampaignAddButton.call(this, 'root') }
          </TitleArea>
          <Content>
            { dataOk ? this.renderOk() : this.renderLoading() }
          </Content>
        </Wrapper>
      </Layout>
    );
  }
}
