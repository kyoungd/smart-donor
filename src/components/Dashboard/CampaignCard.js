import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import CampaignTableData from './CampaignTableData';
import CampaignChip from './CampaignChip';
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

export default function (data) {
  return (
    <Paper elevation={1}>
      <Root>
        { CampaignControl.call(this, data) }
        <Link to={data.clickslug}>
          <Typography variant="h8" component="h8">
            {data.title}
          </Typography>
          <Typography component="p">{data.description}</Typography>
          <CampaignTableData data={data} />
        </Link>
        <CampaignChip data={data} />
      </Root>
    </Paper>
  );
}
