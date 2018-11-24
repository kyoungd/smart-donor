import React from 'react';
import CloseIcon from  '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
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

export default function CampaignAddButton(level = 'root') {
  const site = config.pageState[config.siteState];
  return (
    <Content>
      <div>
        <Hero><p>{config.pageState[config.siteState].rootTitle}</p></Hero>
      </div>
      <div>
        {config.siteState === config.siteStateCustomer && (
          <IconButton 
            aria-label="closebutton"
            onClick={() => {
              this.setState({
                pageState: (level == 'root' ? site.rootAdd : site.sublevelAdd),
                pageEntityId: '',
              })
            }}
          >
            <Tooltip title="Make a New Donation">
              <AddIcon fontSize="large" />
            </Tooltip>
          </IconButton>
        )}
        {level === 'sublevel' && (
          <Link to="/">
            <IconButton aria-label="closebutton">
              <CloseIcon fontSize="large" />
            </IconButton>
          </Link>
        )}
      </div>
    </Content>
  );
}
