import React from 'react'
import update from 'immutability-helper';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';

const { SetBlockchain } = require('../../models/api-post');

const _ = require('lodash');

const RootPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  button: {
    margin-left: 4em;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    margin-left: 5%;
  }
`;

const ExtendedIcon = styled.div`
  margin-right: 1em;
`;

export default function YesNoButton(productId, readOnly=false) {
  const { data } = this.state.dashboard;
  const productIx = data.findIndex(item => item.id === productId);
  const product = data[productIx];
  const rejectOpen = this.state.rejectOpen === undefined ? false : this.state.rejectOpen;
  console.log('ApprovalButton - YesNoButton ', product);
  
  const UpdateApproval = () => {
    const formData = {
      entityId: this.state.dashboard.data[productIx].product,
      approvalStatus: this.state.dashboard.data[productIx].status,
      approvalResponse: ' No Reason ',
    }
    console.log('UpdateApproval', formData);
    SetBlockchain('product', formData)
      .then(result => {
        if (result.status === 200) {
          console.log(result.statusText);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const changeHandler = type => event => {
    this.setState({
        dashboard: update(this.state.dashboard, 
        {
          data:
            { [productIx]: { status: { $set: type } } }
        })
      },
        UpdateApproval
      );
  }

  const handleRejectOpen = () => {
    this.setState({'rejectOpen': true} );
  }

  const handleRejectClose = () => {
    console.log('handleRejectClose ');
    this.setState({
      'rejectOpen': false,
      dashboard: update(this.state.dashboard, 
      {
        data:
          { [productIx]: { status: { $set: 'REJECTED' } } }
      })
    },
      UpdateApproval
    );
  }

  const handleClose = () => {
    this.setState({'rejectOpen': false} );
  }

  const buttonVariant = (status) => (product.status.toLowerCase() === status ? 'contained' : 'outlined');
  const buttonLetter = letter => _.includes(['accepted', 'rejected'], product.status.toLowerCase()) ? letter + 'ED' : letter;

  const readOnlyButtons = () => (
    <ButtonIcon>
      <Button variant={buttonVariant('accepted')} aria-label="Accept" color="default" disableRipple>
        <ThumbUpIcon />&nbsp;&nbsp;{buttonLetter('ACCEPT')}
      </Button>
      <Button variant={buttonVariant('rejected')} aria-label="Accept" color="default" disableRipple>
        <ThumbDownIcon />
        &nbsp;&nbsp;{buttonLetter('REJECT')}
      </Button>
    </ButtonIcon>
  )

  const writeButtons = () => (
    <ButtonIcon>
    <Button 
      variant={buttonVariant('accepted')}
      aria-label="Accept"
      color="default"
      disableRipple
      onClick={changeHandler('ACCEPTED')}
    >
      <ThumbUpIcon />
      &nbsp;&nbsp;{buttonLetter('ACCEPT')}
    </Button>
    <Button
      variant={buttonVariant('rejected')}
      aria-label="Accept"
      color="default"
      disableRipple
      onClick={handleRejectOpen}
    >
      <ThumbDownIcon />
      &nbsp;&nbsp;{buttonLetter('REJECT')}
    </Button>
    </ButtonIcon>
  )

  return (
    <RootPage>
      <Dialog open={rejectOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reason for rejection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please tell us few quick reasons for the rejection. It will help us improve so we can provide
            works more in line with your vision.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="reason" label="Reason" type="text" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRejectClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      { readOnly ? readOnlyButtons() : writeButtons() }
    </RootPage>
  );

}
