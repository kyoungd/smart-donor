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

const RootPage = styled.div`
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  div {
    max-width: 960px;
    padding: 10px;
    margin: 10px;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2em;
  justify-content: center;
  margin-bottom: 0;
`;

export default function(data) {
  console.log('DashApprovalCard: ', data)
  return (
    <RootPage>
      <Card>
        <CardActionArea>
          <Link to={data.clickslug}>
            <SectionTitle>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
            </SectionTitle>
          </Link>
          <CardContent>
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
    </RootPage>
  );
}
