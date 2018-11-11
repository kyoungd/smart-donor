import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, SectionTitle, Header, Content, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import DonateForm from '../components/DonateForm/DonateForm';
import '../utils/prismjs-theme.css';
const dashboardData = require('./api-root-donation-edit');

const PostPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${config.siteTitle}`} />
        <Header>
          <Link to="/">MAKE DONATION</Link>
        </Header>
        <Content>
          <DonateForm data={dashboardData} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default PostPage;
