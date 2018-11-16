/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import update from 'immutability-helper';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header } from 'components';
import { media } from '../../utils/media';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import config from '../../../config/SiteConfig';
import { func } from 'prop-types';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 1000;
  margin-top: -2rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 30em;
        margin-left: 2em;
        margin-top: 0.5rem;
      }
      textarea {
        resize: vertical;
        min-width: 30em;
        min-height: 5em;
        width: 100%;
        margin-top: 0.5rem;
      }
    }
  }
`;

const SIconButtons = styled.div`
  display: flex;
  padding: 0.5em;
  flex-direction: row;
  justify-content: flex-end;
`;

const DateDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    input-width: 10em;
  }
  div {
    margin-top: 0.5rem;
    margin-right:2em;
  }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

function showAccount() {
  return (
    <DateDiv>
      <div>
        <TextField id="account" label="account number" value="" InputLabelProps={{ shrink: true, }} />
      </div>
      <div>
        <TextField id="routing" label="routing" type="text" value="" InputLabelProps={{ shrink: true, }} />
      </div>
    </DateDiv>
  )
}

export default function (campaignId) {
  const { data } = this.state;
  const campaignIx = data.findIndex(item => item.id === campaignId);
  const campaign = data[campaignIx];

  const changeHandler = type => event => {
    this.setState({
      data: update(this.state.data, { [campaignIx]: { [type]: { $set: event.target.value } } })
    });
  }

  const submitHandler = (event) => {
    console.log('submitHandler --------', donation);
    //Make a network call somewhere
    event.preventDefault();
  }

  return (
    <div>
      <Content>
        <p>Make Donation</p>
        <form name="contact-form" method="post">
          <div>
            <p>
              <TextField
                variant="outlined"
                id="name"
                label="name"
                value={campaign.title}
                margin="normal"
                onChange={changeHandler('title')}
              />
            </p>
            <p>
              <TextField
                variant="outlined"
                id="amount"
                label="amount"
                value={campaign.amount}
                margin="normal"
                onChange={changeHandler('amount')}
              />
            </p>
            <DateDiv>
              <div>
                <TextField
                  variant="outlined"
                  id="availableOn"
                  label="availableOn"
                  type="date"
                  defaultValue={campaign.availableOn}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={changeHandler('availableOn')}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  id="expireOn"
                  label="expireOn"
                  type="date"
                  defaultValue={campaign.expireOn}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={changeHandler('expireOn')}
                />
              </div>
            </DateDiv>
            {campaign.id === 'new' && showAccount()}
            <p>
              <TextField
                variant="outlined"
                id="description"
                label="description"
                multiline
                rowsMax="3"
                value={campaign.description}
                margin="normal"
                onChange={changeHandler('description')}
                />
            </p>
          </div>
          <SIconButtons>
            <SButton>
              <Button variant="outlined" color="primary">
                Submit
                        </Button>
            </SButton>
            <SButton>
              <Button variant="outlined" color="primary" onClick={() => {
                this.setState({
                  pageState: config.pageState[config.siteState].rootList,
                  pageEntityId: ''
                });
              }}>
                Cancel
                        </Button>
            </SButton>
          </SIconButtons>
        </form>
      </Content>
    </div>
  )
}
