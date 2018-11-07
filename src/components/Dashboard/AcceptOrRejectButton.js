import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginLeft: theme.spacing.unit * 4,
  },
  extendedIcon: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function AcceptOrRejectButton({classes, data}) {
  return (
    <div className={classes.root}>
      <Button variant="extendedFab" aria-label="Accept" className={classes.button} >
        <ThumbUpIcon className={classes.extendedIcon} />
        &nbsp;&nbsp;ACCEPT
      </Button>
      <Button variant="extendedFab" aria-label="Accept" className={classes.button}>
        <ThumbDownIcon className={classes.extendedIcon} />
        &nbsp;&nbsp;ACCEPT
      </Button>
    </div>
  )
}

AcceptOrRejectButton.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
};
  
export default withStyles(styles)(AcceptOrRejectButton);
