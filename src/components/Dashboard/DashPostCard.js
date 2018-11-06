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
import { Subline } from 'components';
import { SectionTitle } from 'components';
import { Link } from 'gatsby';

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
  margin: 0;
`;

function PaperSheet(props) {
  const { classes, data } = props;
  const subline = `STATUS: ${data.status} - - - CREATED ON: ${data.createdOn.slice(0, 10)} `;

  console.log("--", data);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <SectionTitle>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
        </SectionTitle>
        <Subline sectionTitle>
          {subline} - - - (See <Link to={data.backslug}>back to donation</Link>)
        </Subline>
        <CardContent className={classes.iframeVideo}>
          <PostContent dangerouslySetInnerHTML={{ __html: data.video }} />
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Product
          </Typography>
          <PostContent dangerouslySetInnerHTML={{ __html: data.html }} />
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
