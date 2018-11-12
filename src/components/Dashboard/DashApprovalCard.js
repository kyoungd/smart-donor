import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { SectionTitle } from 'components';
import AcceptOrRejectButton from './AcceptOrRejectButton';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1,
    maxWidth: theme.spacing.unit * 120,
    overflowX: 'auto',
  },
  iframeVideo: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing.unit * 2,
    justifyContent: 'center',
    marginBottom: `0`,
},
  card: {
    maxWidth: 960,
    padding:20,
    margin:20
  },
  media: {
    height: 140,
  },
});

const PostContent = styled.div`
  margin: 0;
`;

function PaperSheet(props) {
  const { classes, data } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Link to={data.clickslug}>
          <SectionTitle>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
          </SectionTitle>
        </Link>
        <CardContent className={classes.iframeVideo}>
          <PostContent dangerouslySetInnerHTML={{ __html: data.video }} />
        </CardContent>
        <Link to={data.clickslug}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              OVERVIEW
            </Typography>
            <Typography component="p">{data.excerpt}</Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <AcceptOrRejectButton data={data} />
      </CardActions>
    </Card>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
