import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import CampaignTableData from './CampaignTableData';
import StatusForDonor from './StatusForDonor';
import CampaignControl from './CampaignControl';
import styled from 'styled-components';

const Root = styled.div`
  max-width: 960px;
  overflow-x: auto;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
`;

const TitleDiv = styled.div`
  margin-bottom: 0.5em;
`;

export default function CampaignCard(data) {
  return (
    <Paper elevation={1}>
      <Root>
        {CampaignControl.call(this, data)}
        <Link to={data.clickslug}>
          <TitleDiv>
            <Typography variant="h5" component="h5">
              {data.title}
            </Typography>
          </TitleDiv>
          <Typography component="p">{data.description}</Typography>
          <CampaignTableData data={data} />
        </Link>
        <StatusForDonor status={data.status} />
      </Root>
    </Paper>
  );
}
