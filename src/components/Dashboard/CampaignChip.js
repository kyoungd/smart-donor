import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import BugReport from '@material-ui/icons/BugReport';
import UpdateIcon from '@material-ui/icons/Update';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import CallMissedIcon from '@material-ui/icons/CallMissed';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';

// import FaceIcon from "@material-ui/icons/Face";
// import DoneIcon from "@material-ui/icons/Done";

const styles = theme => ({
  root: {
  },
  chip: {
    margin: theme.spacing.unit,
  }
});

function OutlinedChips(props) {
    const { classes, data } = props;

    switch(data.status.toLowerCase()) {
        case "complete" : 
            return (
                <div className={classes.root}>
                    <Chip
                        avatar={<Avatar>C</Avatar>}
                        label="Complete"
                        clickable
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                    />
                </div>
            )
        case "active" :
            return (
                <div className={classes.root}>
                    <Chip
                        icon={<UpdateIcon />}
                        label="In Progress"
                        className={classes.chip}
                        variant="outlined"
                    />
                </div>
            )
        case "returned": 
            return (
                <div className={classes.root}>
                    <Chip
                        icon={<CallMissedIcon />}
                        label="Returned"
                        clickable
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                    />
                </div>
            )
        case "warning2":
            return (
                <div className={classes.root}>
                    <Chip
                        icon={<AlarmIcon />}
                        label="2 weeks warning"
                        className={classes.chip}
                        variant="outlined"
                    />
                </div>
            )
        case "warning1":
            return (
                <div className={classes.root}>
                    <Chip
                        icon={<AlarmOnIcon />}
                        label="In Progress but less than 1 weeks"
                        className={classes.chip}
                        color="secondary"
                        variant="outlined"
                    />
                </div>
            )
        case "notstarted":
            return (
                <div className={classes.root}>
                    <Chip icon={<BatteryCharging50Icon />} label="Not Started" className={classes.chip} variant="outlined" /> 
                </div>
            )
        default:
            return (
                <div className={classes.root}>
                    <Chip
                        avatar={<BugReport />}
                        label="Unknown Status"
                        clickable
                        className={classes.chip}
                        color="secondary"
                        variant="outlined"
                    />
                </div>
            )
    }
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedChips);
