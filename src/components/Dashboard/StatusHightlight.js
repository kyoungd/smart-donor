import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const siteStatus = [
  {code: 'NS', value: 'NOT_STARTED', info: 'Status: Not Started'}, 
  {code: 'AT', value: 'ACTIVE', info: 'Status: Active'}, 
  {code: 'XX', value: 'CANCELED', info: 'Status: Canceled'}, 
  {code: 'SP', value: 'SUSPENDED', info: 'Status: Suspended'}, 
  {code: 'CP', value: 'COMPLETE', info: 'Status: Complete'}
]

const siteApprovalStatus = 
[
  {code: 'NS', value: 'NOT_SUBMITTED', info: 'Not submiited for approval'}, 
  {code: 'XX', value: 'CANCELED', info: 'Approval Request Canceled'}, 
  {code: 'SB', value: 'SUBMITTED', info: 'Submited for approval'}, 
  {code: 'AC', value: 'ACCEPTED', info: 'Accepted and approved'},
  {code: 'RJ', value: 'REJECTED', info: 'Rejected. '}
];

const styles = {
  avatar: {
    margin: 10,
  },
  textAvatar: {
    marginRight:20,
    marginTop:10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
};

function tooltipApproval (itemApproval, approvalResponse) {
  return ('REJECTED' ? `${itemApproval.info} - ${approvalResponse}` : itemApproval.info);
}

function findStatus(allStatus, statusValue) {
  const itemStatus = allStatus.find(s => s.value === statusValue);
  return !itemStatus ? allStatus[0] : itemStatus;
}

function printDate(itemOn){
  const a = moment();
  const b = moment(itemOn);
  const numDays = a.diff(b, 'days');
  return numDays > 999 ? '+' : numDays;
}

function LetterAvatars(props) {
  const { classes, createdOn, status, approval, approvalResponse } = props;
  const itemStatus = findStatus(siteStatus, status);
  const itemApproval = findStatus(siteApprovalStatus, approval);
  const createdOnPrint = createdOn && createdOn.length > 10 ? createdOn.slice(0, 10) : createdOn;
  return (
    <div className={classes.row}>
      <Tooltip title={`Created On ${createdOnPrint}`}>
        <Avatar className={classes.purpleAvatar}>{printDate(createdOn)}</Avatar>
      </Tooltip>
      <Tooltip title={itemStatus.info}>
        <Avatar className={classes.avatar}>{itemStatus.code}</Avatar>
      </Tooltip>
      <Tooltip title={tooltipApproval(itemApproval, approvalResponse)}>
        <Avatar className={classes.orangeAvatar}>{itemApproval.code}</Avatar>
      </Tooltip>
    </div>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);
