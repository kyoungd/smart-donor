import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header, Subline, Article, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import DashApprovalCard from '../components/Dashboard/DashApprovalCard';
import DashPostCard from '../components/Dashboard/DashPostCard';
import ApiSublevel from '../models/api-sublevel';
import CampaignAddButton from '../components/Dashboard/CampaignAddButton';
import CampaignRequestPage from '../components/DonateForm/CampaignRequestPage';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 1000;
  margin-top: -2rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
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

export default class ListApprovals extends Component {

  constructor(props) {
    super(props);
    const { location: { search : donationId }} = props;
    this.state = {
      dataOk: false,
      donationId: donationId.slice(1, donationId.length),
      pageState: config.pageState[config.siteState].sublevelList,
      pageEntityId: '',
    };
  }

  async componentDidMount() {
    try {
      const { donationId } = this.state;
      const dashboard = await ApiSublevel(config.siteState, donationId);
      this.setState({ dashboard, dataOk: true });
      console.log('root-componentDidMount: start', dashboard);
    } catch (error) {
      console.log(error);
    }
  }

  PageSublevelAdd = () => {
    return (config.siteState === config.siteStateCustomer ? CampaignRequestPage : undefined);
  }

  PageSublevelEdit = () => {
    return (config.siteState === config.siteStateCustomer ? CampaignRequestPage : undefined);
  }

  renderSublevelList(dashboard, subline) {
    return (
      <div>
        <Subline sectionTitle>
          {subline} (See <Link to="/">all donations</Link>)
        </Subline>
        {dashboard.data.map(item => item.id === 'new' ? '' : DashApprovalCard.call(this, item))}
      </div>
    )
  }

  renderPost(dashboard, pageEntityId) {
    return <div> {dashboard.data.map(item => (pageEntityId === item.id ? DashPostCard.call(this, item) : ''))}</div>
  }

  renderSublevelEdit(dashboard, pageEntityId) {
    return this.PageSublevelEdit().call(this, pageEntityId);
  }

  renderSublevelAdd(dashboard) {
    return this.PageSublevelAdd().call(this, 'new');
  }

  renderLoop() {
    const { dashboard, pageState, pageEntityId } = this.state;
    const totalCount = dashboard.data.length;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${dashboard.donationName}"`;
    
    switch (pageState) {
      case config.pageState[config.siteState].sublevelList:
        return this.renderSublevelList(dashboard, subline);
      case config.pageState[config.siteState].sublevelEdit:
        return this.renderSublevelEdit(dashboard, pageEntityId);
      case config.pageState[config.siteState].sublevelAdd:
        return this.renderSublevelAdd(dashboard);
      case config.pageState[config.siteState].post:
        return this.renderPost(dashboard, pageEntityId);
      default:
        return '';
    }
}

  renderOk() {
    const { donationId, dashboard, pageState, pageEntityId } = this.state;
    console.log('root-donation - renderOK: ', this.state);

    return (
      <Layout>
        <Wrapper>
          <TitleArea>
            { config.siteState === config.siteStateCustomer && CampaignAddButton.call(this, 'sublevel') }
          </TitleArea>
          <Content>
            {this.renderLoop()}
          </Content>
        </Wrapper>
      </Layout>
    );
  }

  renderLoading() {
    return (
      <Layout>
        <Wrapper>
          <Content>
            <p>Loading...</p>
          </Content>
        </Wrapper>
      </Layout>
    );
  }

  // const { donationId } = props;
  render() {
    const { dataOk } = this.state;
    if (dataOk)
      return this.renderOk();
    else
      return this.renderLoading();
  }
};
