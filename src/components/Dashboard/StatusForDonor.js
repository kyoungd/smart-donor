import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const siteStatus = [
  {code: 'NS', value: 'NOT_STARTED', info: 'Status: Not Started'}, 
  {code: 'AT', value: 'ACTIVE', info: 'Status: Active'}, 
  {code: 'CP', value: 'COMPLETE', info: 'Status: Complete'},
  {code: 'XX', value: 'CANCELED', info: 'Status: Canceled'}, 
  {code: 'SP', value: 'SUSPENDED', info: 'Status: Suspended'}, 
]

const siteApprovalStatus = 
[
  {code: 'SB', value: 'SUBMITTED', info: 'Submited for approval'}, 
  {code: 'AC', value: 'ACCEPTED', info: 'Accepted and approved'},
  {code: 'RJ', value: 'REJECTED', info: 'Rejected. '},
  {code: 'XX', value: 'CANCELED', info: 'Approval Request Canceled'}, 
  {code: 'NS', value: 'NOT_SUBMITTED', info: 'Not submiited for approval'}, 
];

function getSteps(statusList) {
  return statusList.map(s => s.value);
}

function getType(statusType) {
  return statusType === 'status' ? siteStatus : siteApprovalStatus;
}
class StatusForDonor extends React.Component {
  render() {
    const { classes, status, statusType } = this.props;
    const statusList = getType(statusType);
    const steps = getSteps(statusList);
    const activeStep = statusList.findIndex(s => s.value === status);

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = { completed: false };
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <Tooltip title={statusList.find(s => s.value === label).info}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Tooltip>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

StatusForDonor.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StatusForDonor);
