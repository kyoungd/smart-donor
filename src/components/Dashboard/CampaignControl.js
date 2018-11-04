import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CampaignFormButton from './CampaignFormButton'

const styles = theme => ({
  iconButtons: {
    display: "flex",
    flexDirection: "row",
    padding: `0`,
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: theme.spacing.unit*2,
    padding: `0`,
  },
  input: {
    display: 'none',
  },
});

function handleDelete() {
  alert("You clicked the delete icon."); // eslint-disable-line no-alert
}

function IconButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.iconButtons}>
      <CampaignFormButton />
      <IconButton className={classes.button} aria-label="Delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);
