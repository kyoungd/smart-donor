import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CampaignFormButton from './CampaignFormButton';
import config from '../../../config/SiteConfig';

import styled from 'styled-components';

const SIconButtons = styled.div`
    display: flex;
    padding: 0;
    flex-direction: row;
    justify-content: flex-end;
`;

const SButton = styled.div`
    margin-left: 30,
    padding: 0,
`;

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

export default function IconButtons(data) {
  return (
    <SIconButtons>
      <IconButton aria-label="Edit" onClick={()=> {
        console.log('CampaignControl-handleEdit: ', data.id);
        this.setState ({
          pageState: config.pageState.donor.rootEdit,
          pageEntityId: data.id
        });
      }}>
        <SButton> <CreateIcon /> </SButton>
      </IconButton>
      <IconButton aria-label="Delete" onClick={handleDelete}>
        <SButton> <DeleteIcon /> </SButton>
      </IconButton>
    </SIconButtons>
  );
}
