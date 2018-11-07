import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'gatsby';

const styles = theme => ({
  iconButtons: {
    display: 'flex',
    flexDirection: 'row',
    padding: `0`,
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    display: 'flex',
    marginRight: theme.spacing.unit,
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    flex: 10
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.iconButtons}>
      <div className={classes.section}>DONATIONS</div>
      <div className={classes.button}>
        <Link to='/add-donation'>
          <Button variant="fab" mini color="secondary" aria-label="Add">
            <AddIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
