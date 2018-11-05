import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

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
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing.unit * 2,
    justifyContent: "center",
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
  margin-top: 4rem;
`;

function PaperSheet(props) {
  const { classes, data } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Typography variant="h5" component="h3">
          {data.title}
        </Typography>
        <CardContent className={classes.iframeVideo}>
          {/* <PostContent dangerouslySetInnerHTML={{ __html: data.video }} /> */}
          <iframe src='https://www.youtube.com/embed/kCxj68UgfmI?title=0&byline=0&portrait=0&badge=0&color=39a3bd' data-fit='yes' frameborder='0' id='fitvid90951'></iframe>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Product Excerpt
          </Typography>
          <Typography component="p">{data.excerpt}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          ACCEPT
        </Button>
        <Button size="large" color="primary">
          REJECT
        </Button>
      </CardActions>
    </Card>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
