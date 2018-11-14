import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/Backspace';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Subline } from 'components';
import { SectionTitle } from 'components';
import { Link } from 'gatsby';
import AcceptOrRejectButton from './AcceptOrRejectButton';
import config from '../../../config/SiteConfig';

const RootPage = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  div {
    max-width: 960px;
    padding: 10px;
    margin: 10px;
  }
  Button {
    margin-left: 5%;
  }
`;

const PostVideo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2em;
  justify-content: center;
  margin: 0;
`;

const PostContent = styled.div`
  display:block;
`;

export default function(data) {
  const createdOn = data.createdOn.length > 10 ? data.createdOn.slice(0, 10) : data.createdOn;
  const subline = `STATUS: ${data.status} - - - CREATED ON: ${createdOn} `;
  return (
    <RootPage>
      <Card>
        <Subline sectionTitle>
          {subline} - - - 
          <Button variant="outlined" size="small" color="secondary" onClick={() => {
            this.setState({pageState: config.pageState.donor.sublevelList, pageEntityId: ''});
          }}>
            <BackIcon fontSize="medium" />&nbsp;close
          </Button>          
        </Subline>
        <CardActionArea>
          <CardContent>
            <PostVideo dangerouslySetInnerHTML={{ __html: data.video }} />
          </CardContent>
          <PostContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Product
              </Typography>
              <PostContent dangerouslySetInnerHTML={{ __html: data.html }} />
            </CardContent>
          </PostContent>
          const PostContent = styled.div`
            display:block;
          `;

        </CardActionArea>
        <CardActions>
          <AcceptOrRejectButton data={data} />
        </CardActions>
      </Card>
    </RootPage>
  );
}
