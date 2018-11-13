import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header, Subline, Article, SectionTitle } from 'components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import DashApprovalCard from '../components/Dashboard/DashApprovalCard';

const { ApiRootDonation } = require('../models/api-root-donation');

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

export default class ListApprovals extends Component {

  constructor(props) {
    super(props);
    const { location: { search : donationId }} = props;
    this.state = {
      dataOk: false,
      donationId: donationId.slice(1, donationId.length),
      pageState: config.pageStateDonorListPost,
      pageEntityId: '',
    };
  }

  async componentDidMount() {
    try {
      const { donationId } = this.state;
      const dashboard = await ApiRootDonation(donationId);
      console.log('root-donation - componentDidMount: ', dashboard);
      this.setState({ dashboard, dataOk: true });
      console.log('root-componentDidMount: start', dashboard);
    } catch (error) {
      console.log(error);
    }
  }

  renderOk() {
    const { donationId, dashboard, pageState, pageEntityId } = this.state;
    const totalCount = dashboard.data.length;
    const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${dashboard.donationName}"`;

    return (
      <Layout>
        <Wrapper>
          <Helmet title={`${donationId} | ${config.siteTitle}`} />
          <Header>
            <Link to="/">{dashboard.donationName}</Link>
          </Header>
          <Content>
            <Subline sectionTitle>
              {subline} (See <Link to="/">all donations</Link>)
            </Subline>
            {
              pageState == config.pageStateDonorListPost ? 
                dashboard.data.map(item => DashApprovalCard.call(this, item)) : pageState + '=' + config.pageStateDonorListPost
            }
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
