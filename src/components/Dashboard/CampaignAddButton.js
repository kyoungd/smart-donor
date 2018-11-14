import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { media } from '../../utils/media';
import Tooltip from '@material-ui/core/Tooltip';
import config from '../../../config/SiteConfig';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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

export default function() {
  return (
    <Content>
      <div>
        <Hero><p>{config.pageState[config.siteState].rootTitle}</p></Hero>
      </div>
      <div>
          <Button variant="outlined" mini color="secondary" aria-label="Add"
            onClick = {()=> {
              console.log('Add Donation Button clicked');
              this.setState({
                pageState: config.pageState[config.siteState].rootAdd,
                pageEntityId: '',
              })
            }}>
            <Tooltip title="Make a New Donation"><AddIcon /></Tooltip>
          </Button>
      </div>
    </Content>
  );
}
