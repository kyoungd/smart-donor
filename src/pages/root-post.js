import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, SectionTitle, Header, Content, Subline, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import DashPostCard from '../components/Dashboard/DashPostCard';
import '../utils/prismjs-theme.css';
const { get } = require('../models/api');
const { getDashboardDonorPost } = require('../models/api-data');

const Title = styled.h1`
  margin-botapim: 1rem;
`;

export default class PostPage extends Component {

  constructor(props) {
    super(props);
    const { location: { search : productId }} = props;
    this.state = {
      dataOk: false,
      productId: productId.slice(1, productId.length),
    };
  }

  async componentDidMount() {
    try {
      const { productId } = this.state;
      const dashboard = await get('product', productId);
      console.log('root-post - componentDidMount: ', dashboard);
      this.setState({ dashboard, dataOk: true });
      console.log('root-componentDidMount: start', dashboard);
    } catch (error) {
      console.log(error);
    }
  }

  renderOk() {
    const { dashboard } = this.state;
    const post = getDashboardDonorPost(dashboard);
    return (
      <Layout>
        <Wrapper>
          <Helmet title={`${post.productName} | ${config.siteTitle}`} />
          <Header>
            <Link to="/">{post.title}</Link>
          </Header>
          <Content>
            <DashPostCard data={post} />
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

  render() {
    const { dataOk } = this.state;
    if (dataOk)
      return this.renderOk();
    else
      return this.renderLoading();
  }

};
