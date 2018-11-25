/* eslint jsx-a11y/label-has-for:0 */

import React from 'react';
import update from 'immutability-helper';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Layout, Wrapper, Header } from 'components';
import { media } from '../../utils/media';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import config from '../../../config/SiteConfig';
import { func } from 'prop-types';

const { SetBlockchain } = require('../../models/api-post');

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
  p {
    margin-bottom: 0.1em;
  }
  form {
    #name {
      width: 30em;
    }
    #amount {
      width: 10em;
    }
    textarea {
      resize: vertical;
      min-width: 30em;
      min-height: 5em;
      width: 100%;
      margin-top: 0.5rem;
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

const SelectDiv = styled.div`
    margin-top: 0.8em;
    margin-bottom: 1em;
    div {
      min-width: 20em;
    }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

export default function DonationPage(donationId) {
  const { data } = this.state;
  const donationIx = data.findIndex(item => item.id === donationId);
  const donation = data[donationIx];

  const closeWindow = () => {
    console.log('closeWindow called.', config.pageState[config.siteState].rootList);
    this.setState({
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: ''
    });
  }

  const changeHandler = type => event => {
    this.setState({
      data: update(this.state.data, { [donationIx]: { [type]: { $set: event.target.value } } })
    });
  }

  const saveNew = () => {
    const accountInfo = {
      entityId: 'new',
      accountNumber: donation.account,
      routingNumber: donation.routing,
    }
    console.log('DonationPage.saveNew() bankaccount ');
    SetBlockchain('bankaccount', accountInfo)
      .then(result => {
        console.log('DonationPage.saveNew() donation 1 ', result);
        const bankaccount = result.data.entityId;
        let formData = _.cloneDeep(donation);
        formData.availableOn = donation.availableOn;
        formData.expireOn = donation.expireOn;
        formData.name = donation.title;
        formData.rules = donation.rules.split('.');
        formData.description = donation.description;
        formData.entityId = donation.id;
        formData.bankAccount = bankaccount;
        formData.customer = donation.customer;
        formData.donor = donation.donor;
        formData.rules = donation.rules.split('.');
        console.log('DonationPage.saveNew() donation 2 ', JSON.stringify(formData, null, 2));
        return SetBlockchain('donation', formData);
      })
      .then(result => {
        console.log('DonationPage.saveNew() donation saved 1 ');
        this.setState({
          data: update(this.state.data, { [donationIx]: { id: { $set: result.data.entityId } } })
        }, () => {
          console.log('DonationPage.saveNew() donation saved 2 ');
          let newblock = this.state.data.filter(item => item.id === 'blank');
          newblock.id = 'new';
          this.setState({ data: [...this.state.data, newblock] });
        })
      })
      .catch(err => {
        console.log('DonationPage.saveNew() error ', err);
      })
    closeWindow();
  }

  const saveEdit = () => {
    let formData = _.cloneDeep(donation);
    formData.availableOn = donation.availableOn;
    formData.expireOn = donation.expireOn;
    formData.name = donation.title;
    formData.entityId = donation.id;
    formData.rules = donation.rules.split('.');
    formData.description = donation.description;
    console.log('saveEdit: 1');
    SetBlockchain('donation', formData)
      .then(result => {
        console.log('saveEdit: 2');
        if (result.status === 200) {
          console.log('saveEdit: 3');
          console.log(result.statusText);
        }
      })
      .catch(err => {
        console.log(err);
      });
    closeWindow();
  }

  const submitHandler = event => {
    event.preventDefault();
    console.log('Donation submitHandler --------', donation);
    donation.id === 'new' ? saveNew() : saveEdit();
  }

  const showAccount = () => {
    return (
      <DateDiv>
        <div>
          <TextField
            variant="outlined"
            id="account"
            label="account number"
            type="text"
            value={donation.account}
            onChange={changeHandler('account')}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            id="routing"
            label="routing number"
            type="text"
            value={donation.routing}
            onChange={changeHandler('routing')}
          />
        </div>
      </DateDiv>
    )
  }

  return (
    <Content>
      <p>Make Donation</p>
      <form name="contact-form" method="post" onSubmit={submitHandler}>
        <div>
          <div>
            <TextField
              variant="outlined"
              id="name"
              label="name"
              value={donation.title}
              margin="normal"
              onChange={changeHandler('title')}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              id="amount"
              label="amount"
              value={donation.amount}
              margin="normal"
              onChange={changeHandler('amount')}
            />
          </div>
          <DateDiv>
            <div>
              <TextField
                variant="outlined"
                id="availableOn"
                label="availableOn"
                type="date"
                value={donation.availableOn}
                onChange={changeHandler('availableOn')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="expireOn"
                label="expireOn"
                type="date"
                value={donation.expireOn}
                onChange={changeHandler('expireOn')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </DateDiv>
          {donation.id == 'new' && showAccount()}
          <div>
            <TextField
              variant="outlined"
              id="rules"
              label="Rules"
              multiline
              rowsMax="3"
              value={donation.rules}
              onChange={changeHandler('rules')}
              margin="normal"
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              id="description"
              label="description"
              multiline
              rowsMax="3"
              value={donation.description}
              onChange={changeHandler('description')}
              margin="normal"
            />
          </div>
          <SIconButtons>
            <SButton>
              <Button variant="outlined" color="primary" type="submit">
                Submit
              </Button>
            </SButton>
            <SButton>
              <Button variant="outlined" color="primary" onClick={closeWindow}>
                Cancel
              </Button>
            </SButton>
          </SIconButtons>
        </div>
      </form>
    </Content>
  )
}
