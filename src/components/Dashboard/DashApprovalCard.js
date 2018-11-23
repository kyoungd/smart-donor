import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { SectionTitle } from 'components';
import config from '../../../config/SiteConfig';
import CampaignControl from './CampaignControl';
import StatusHighlight from './StatusHightlight';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const uuidv1 = require('uuid/v1');
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
    <RootPage key={uuidv1()}>
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
          <CardActionArea 
            onClick={()=> {
              this.setState({pageState: config.pageState[config.siteState].post, pageEntityId: data.id})
            }}
          >
            <SectionTitle>
              <Typography gutterBottom variant="h6" component="h6">
                {`${data.title} / ${data.name}`}
              </Typography>
            </SectionTitle>
            <Typography gutterBottom variant="h6" component="h6">
              OVERVIEW
            </Typography>
            <Typography component="p">{data.excerpt}</Typography>
          </CardActionArea>
        </CardContent>
      </Card>
    </RootPage>
  );
}
