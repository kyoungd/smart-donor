import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { SectionTitle, Subline } from 'components';
import CampaignControl from './CampaignControl';
import StatusHighlight from './StatusHightlight';
import config from '../../../config/SiteConfig';

const uuidv1 = require('uuid/v1');

const RootPage = styled.div`
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  padding: 10px;
  margin: 10px;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.1em;
  justify-content: center;
  margin-bottom: 0;
`;

const HeaderContent= styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2em;
  justify-content: space-around;
  margin-bottom: 0;
`;

export default function SupplierRequestProductCard(data) {
  return (
    <RootPage key={uuidv1()}>
      <Card>
        <HeaderContent>
          <StatusHighlight 
            createdOn={data.requestCreatedOn}
            status={data.rfp} 
            approval={data.status}
            approvalResponse={data.approvalResponse}
          />
          {CampaignControl.call(this, data, 'rootEdit')}
        </HeaderContent>
        <CardContent>
          <PostContent dangerouslySetInnerHTML={{ __html: data.video }} />
          <CardActionArea
            onClick={()=> {
              this.setState({pageState: config.pageState[config.siteState].post, pageEntityId: data.id})
            }}
          >
            <div>
              <SectionTitle>
                <Typography gutterBottom variant="h6" component="h6">
                  {`${data.requestName} / ${data.name}`}
                </Typography>
              </SectionTitle>
            </div>
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
