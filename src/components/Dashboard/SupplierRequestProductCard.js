import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { SectionTitle, Subline } from 'components';
import AcceptOrRejectButton from './AcceptOrRejectButton';
import config from '../../../config/SiteConfig';
import CampaignControl from './CampaignControl';
import StatusHighlight from './StatusHightlight';

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
  padding-top: 2em;
  justify-content: center;
  margin-bottom: 0;
  div {
    max-width: 960px;
    padding: 5px;
    margin: 5px;
  }
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
    <RootPage>
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
          <div>
            <SectionTitle>
              <Typography gutterBottom variant="h6" component="h2">
                {`${data.requestName} / ${data.name}`}
              </Typography>
            </SectionTitle>
          </div>
          <Typography gutterBottom variant="h5" component="h2">
            OVERVIEW
          </Typography>
          <Typography component="p">{data.excerpt}</Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </RootPage>
  );
}
