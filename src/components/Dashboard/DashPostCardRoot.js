import React from 'react';
import Card from '@material-ui/core/Card';
import CloseIcon from  '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Subline } from 'components';
import StatusForDonor from './StatusForDonor';
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
`;

const PostVideo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2em;
  justify-content: center;
  margin: 0;
`;

const PostContent = styled.div`
  display:block;
`;

export default function DashPostCardRoot(post, readOnly=false) {
  console.log('DashPostCardRoot  ---', post);
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
              this.setState({pageState: config.pageState[config.siteState].rootList, pageEntityId: ''});
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Subline>
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
          <StatusForDonor status={post.status} statusType="approved" />
        </CardContent>
      </Card>
    </RootPage>
  );
}
