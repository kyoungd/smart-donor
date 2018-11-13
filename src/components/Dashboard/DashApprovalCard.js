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
import config from '../../../config/SiteConfig';

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
  return (
    <RootPage>
      <Card>
        <CardActionArea>
          <div onClick={()=> {
            this.setState({pageState: config.pageStateDonorPost, pageEntityId: data.id})
          }}>
            <SectionTitle>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
            </SectionTitle>
          </div>
          <CardContent>
            <PostContent dangerouslySetInnerHTML={{ __html: data.video }} />
          </CardContent>
          <div onClick={()=> {
            this.setState({pageState: config.pageStateDonorPost, pageEntityId: data.id})
          }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                OVERVIEW
              </Typography>
              <Typography component="p">{data.excerpt}</Typography>
            </CardContent>
          </div>
        </CardActionArea>
        <CardActions>
          <AcceptOrRejectButton data={data} />
        </CardActions>
      </Card>
    </RootPage>
  );
}
