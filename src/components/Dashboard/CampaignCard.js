import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import CampaignTableData from './CampaignTableData';
import CampaignChip from './CampaignChip';
import CampaignControl from './CampaignControl';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    maxWidth: theme.spacing.unit * 120,
    overflowX: 'auto',
  },
});

function PaperSheet(props) {
  const { classes, data } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <CampaignControl data={data} />
      <Link to={data.slug}>
        <Typography variant="h8" component="h8">
          {data.title}
        </Typography>
        <Typography component="p">{data.description}</Typography>
        <CampaignTableData data={data} />
      </Link>
      <CampaignChip data={data} />
    </Paper>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
