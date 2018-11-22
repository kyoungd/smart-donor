import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { SectionTitle } from 'components';
import AcceptOrRejectButton from './AcceptOrRejectButton';
import config from '../../../config/SiteConfig';
import CampaignControl from './CampaignControl';
import ApprovalButton from './ApprovalButton';
import StatusHighlight from './StatusHightlight';

const RootPage = styled.div`
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  max-width: 960px;
  padding: 10px;
  margin: 10px;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.5em;
  justify-content: center;
  margin-bottom: 0.5em;
`;

const HeaderContent= styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.5em;
  justify-content: space-around;
  margin-bottom: 0;
`;
 
export default function DashApprovalCard(data, showControl=false) {
  return (
    <RootPage>
      <Card>
        <HeaderContent>
          <StatusHighlight 
            createdOn={data.createdOn}
            status={data.rfp} 
            approval={data.status}
            approvalResponse={data.approvalResponse}
          />
          { CampaignControl.call(this, data, 'sublevelEdit') }
        </HeaderContent>
        <CardContent>
          <PostContent dangerouslySetInnerHTML={{ __html: data.video }} />
          <SectionTitle>
            <Typography gutterBottom variant="h5" component="h2">
              {`${data.title} / ${data.name}`}
            </Typography>
          </SectionTitle>
          <Typography gutterBottom variant="h5" component="h2">
            OVERVIEW
          </Typography>
          <Typography component="p">{data.excerpt}</Typography>
        </CardContent>
      </Card>
    </RootPage>
  );
}
