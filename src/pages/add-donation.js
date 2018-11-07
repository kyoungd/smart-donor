import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { Layout, Wrapper, SectionTitle, Header, Content, SEO, PrevNext } from 'components';
import config from '../../config/SiteConfig';
import DonateForm from '../components/DonateForm/DonateForm';
import '../utils/prismjs-theme.css';

const dashboardData = {
  id: '',
  name: '',
  editslug: '',
  description: '',
  amount: '',
  availableOn: '',
  expireOn: '',
}

const PostPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Helmet title={`${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
          <SectionTitle>MAKE DONATION</SectionTitle>
          <DonateForm data={dashboardData} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default PostPage;
