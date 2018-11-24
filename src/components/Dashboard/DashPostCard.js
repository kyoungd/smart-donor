import React from 'react';
import Card from '@material-ui/core/Card';
import CloseIcon from  '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Subline } from 'components';
import ApprovalButton from './ApprovalButton';
import config from '../../../config/SiteConfig';

const uuidv1 = require('uuid/v1');

const RootPage = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  div {
    max-width: 960px;
    margin: 10px;
  }
  h3 {
    margin-top: 0.5em;
  }
`;

const NameDiv = styled.div `
  display: flex;
  flex-direction: row;
  padding-top: 0.1em;
  justify-content: center;
  margin: 0;
`;

const PostVideo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.1em;
  justify-content: center;
  margin: 0;
`;

const PostContent = styled.div`
  display:block;
`;

export default function DashPostCard(entityId, readOnly=false) {
  const { dashboard: { data } } = this.state;
  const productIx = data.findIndex(item => item.id === entityId);
  const { dashboard: { data: { [productIx] : post } } } = this.state;
  console.log('DashPostCard  ---', post);
  const createdOn = post.createdOn ? post.createdOn : (post.productCreatedOn ? post.productCreatedOn : '');
  const subline = `STATUS: ${post.status} - - - CREATED ON: ${createdOn} `;
  return (
    <RootPage key={uuidv1()}>
      <Card>
        <Subline sectionTitle>
          {subline} - - -&nbsp;
          <IconButton 
            aria-label="closebutton"
            onClick={() => {
              this.setState({pageState: config.pageState[config.siteState].sublevelList, pageEntityId: ''});
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Subline>
        <NameDiv>{ post.name }</NameDiv>
        <CardContent>
          <PostVideo dangerouslySetInnerHTML={{ __html: post.video }} />
          <PostContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Product
              </Typography>
              <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
            </CardContent>
          </PostContent>
          { ApprovalButton.call(this, entityId, readOnly) }
        </CardContent>
      </Card>
    </RootPage>
  );
}
