import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import CampaignTableData from './CampaignTableData';
import StatusForDonor from './StatusForDonor';
import CampaignControl from './CampaignControl';
import styled from 'styled-components';
import CardActionArea from '@material-ui/core/CardActionArea';
const uuidv1 = require('uuid/v1');

const Root = styled.div`
  max-width: 960px;
  overflow-x: auto;
  padding-top: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  margin-bottom: 0.5em;
  padding-bottom: 0.5em;
`;

const ContentDiv = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const ApprovalCardDiv = styled.div`
  display: block;
  font-size: small;
`;

const TitleDiv = styled.div`
  margin-bottom: 0.5em;
`;

export default function CampaignCard(data) {
  return (
    <Root key={uuidv1()}>
      <Paper elevation={1}>
        <ContentDiv>
          {CampaignControl.call(this, data)}
          <Link to={data.clickslug}>
            <CardActionArea>
              <TitleDiv>
                <Typography variant="h5" component="h5">
                  {data.title}
                </Typography>
              </TitleDiv>
              <Typography component="p">{data.description}</Typography>
              <CampaignTableData data={data} />
            </CardActionArea>
          </Link>
        </ContentDiv>
        <ApprovalCardDiv>
          <StatusForDonor status={data.status} statusType="status" />
        </ApprovalCardDiv>
      </Paper>
    </Root>
  );
}
