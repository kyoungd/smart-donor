import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const _ = require('lodash');

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

class YesNoButton extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      rejectOpen: false,
      status: data.status,
    };
  }

  handleRejectOpen = () => {
    this.setState({ rejectOpen: true });
  };

  handleClose = () => {
    this.setState({ rejectOpen: false });
  };

  acceptButtonColor = status => (status.toLowerCase() === 'accepted' ? 'primary' : 'default');

  acceptButtonDisable = status => _.includes(['canceled', 'rejected'], status.toLowerCase());

  rejectButtonColor = status => (status.toLowerCase() === 'rejected' ? 'secondary' : 'default');

  rejectButtonDisable = status => _.includes(['canceled', 'accepted'], status.toLowerCase());

  buttonLetter = (status, letter) => _.includes(['accepted', 'rejected'], status.toLowerCase()) ? letter + 'ED' : letter;

  render() {
    const { classes } = this.props;
    const { status, rejectOpen } = this.state;
    return (
      <div className={classes.root}>
        <Dialog open={rejectOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Reason for rejection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please tell us few quick reasons why you are rejecting this. It will help us improve so we can provide
              works more in line with your vision.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="reason" label="Reason" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="outlined"
          aria-label="Accept"
          className={classes.button}
          color={this.acceptButtonColor(status)}
          disabled={this.acceptButtonDisable(status)}
        >
          <ThumbUpIcon className={classes.extendedIcon} />
          &nbsp;&nbsp;{this.buttonLetter(status, 'ACCEPT')}
        </Button>
        <Button
          variant="outlined"
          aria-label="Accept"
          className={classes.button}
          color={this.rejectButtonColor(status)}
          disabled={this.rejectButtonDisable(status)}
          onClick={this.handleRejectOpen}
        >
          <ThumbDownIcon className={classes.extendedIcon} />
          &nbsp;&nbsp;{this.buttonLetter(status, 'REJECT')}
        </Button>
      </div>
    )
  }
}

YesNoButton.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
};

const AcceptOrRejectButton = withStyles(styles)(YesNoButton);
export default AcceptOrRejectButton;
