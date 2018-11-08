import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { media } from '../../utils/media';
import Tooltip from '@material-ui/core/Tooltip';

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
    justifyContent: 'flex-start',
    flex: 10
  },
});

const Hero = styled.div`
  grid-column: 2;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  p {
    font-size: 1.68rem;
    @media ${media.phone} {
      font-size: 1.25rem;
    }
    @media ${media.tablet} {
      font-size: 1.45rem;
    }
  }
`;

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div className={classes.iconButtons}>
      <div className={classes.section}>
        <Hero><p>ALL DONATIONS</p></Hero>
      </div>
      <div className={classes.button}>
        <Link to='/add-donation'>
          <Button variant="outlined" mini color="secondary" aria-label="Add">
            <Tooltip title="Make a New Donation"><AddIcon /></Tooltip>
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
