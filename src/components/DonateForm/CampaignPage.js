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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import config from '../../../config/SiteConfig';
import { func } from 'prop-types';

const { SetBlockchain } = require('../../models/api-post');
const { get } = require('../../models/api');

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
  margin-top: 0.5em;
  input {
    input-width: 10em;
  }
  div {
    margin-top: 0.5rem;
    margin-right:2em;
  }
`;

const DonationDiv = styled.div`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  div {
    min-width: 20em;
  }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

export default function (campaignId) {
  const { data, helper } = this.state;
  const campaignIx = data.findIndex(item => item.id === campaignId);
  const campaign = data[campaignIx];

  const changeHandler = type => event => {
    this.setState({
      data: update(this.state.data, { [campaignIx]: { [type]: { $set: event.target.value } } })
    });
  }

  const closeWindow = () => {
    console.log('closeWindow called.', config.pageState[config.siteState].rootList);
    this.setState({
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: ''
    });
  }

  const saveNew = () => {
    let bankaccount;
    const accountInfo = {
      entityId: 'new',
      accountNumber: campaign.account,
      routingNumber: campaign.routing,
    }
    console.log('CampaignPage.saveNew() bankaccount ');
    SetBlockchain('bankaccount', accountInfo)
      .then(result => {
        console.log('CampaignPage.saveNew() campaign 1 ', result);
        bankaccount = result.data.entityId;
        return get('donation', campaign.donation);
      })
      .then(result => {
        console.log('CampaignPage.saveNew() campaign 2 ', result);
        let formData = _.cloneDeep(campaign);
        formData.availableOn = campaign.availableOn;
        formData.expireOn = campaign.expireOn;
        formData.name = campaign.title;
        formData.description = campaign.description;
        formData.entityId = campaign.id;
        formData.bankAccount = bankaccount;
        formData.customer = campaign.customer;
        formData.donor = result.data.donor;
        formData.donation = campaign.donation;
        console.log('CampaignPage.saveNew() campaign 3 ', JSON.stringify(formData, null, 2));
        return SetBlockchain('campaign', formData);
      })
      .then(result => {
        console.log('CampaignPage.saveNew() campaign saved 1 ');
        const clickslug = campaign.clickslug.replace('campaignId', result.data.entityId);
        this.setState({
          data: update(this.state.data, {
            [campaignIx]: { id: { $set: result.data.entityId }, clickslug: { $set: clickslug } },
          })
        }, () => {
          console.log('CampaignPage.saveNew() campaign saved 2 ');
          let newblock = this.state.data.filter(item => item.id === 'blank');
          newblock.id = 'new';
          this.setState({ data: [this.state.data, newblock] });
        })
      })
      .catch(err => {
        console.log('CampaignPage.saveNew() error ', err);
      })
    closeWindow();
  }

  const saveEdit = () => {
    let formData = _.cloneDeep(campaign);
    formData.availableOn = campaign.availableOn;
    formData.expireOn = campaign.expireOn;
    formData.name = campaign.title;
    formData.entityId = campaign.id;
    formData.description = campaign.description;
    console.log('saveEdit: 1');
    SetBlockchain('campaign', formData)
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
    console.log('Donation submitHandler --------', campaign);
    campaign.id === 'new' ? saveNew() : saveEdit();
  }

  const showAccount = () => {
    return (
      <DateDiv>
        <TextField
          variant="outlined"
          id="account"
          label="account number"
          type="text"
          value={campaign.account}
          onChange={changeHandler('account')}
        />
        <TextField
          variant="outlined"
          id="routing"
          label="routing number"
          type="text"
          value={campaign.routing}
          onChange={changeHandler('routing')}
        />
      </DateDiv>
    )
  }

  return (
    <div>
      <Content>
        <p>Make Campaign</p>
        <form name="contact-form" method="post" onSubmit={submitHandler}>
          <div>
            <div>
              <TextField
                variant="outlined"
                id="name"
                label="name"
                value={campaign.title}
                margin="normal"
                onChange={changeHandler('title')}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="amount"
                label="amount"
                value={campaign.amount}
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
            <div>
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
            </div>
          </div>
          <DonationDiv>
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Choose Donation
              </InputLabel>
              <Select
                value={campaign.donation}
                onChange={changeHandler('donation')}
                input={<OutlinedInput labelWidth={100} name="donation" id="outlined-donation-simple" />}
              >
                {helper.map(s => <MenuItem value={s.id}><em>{s.name}</em></MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Choose Donation
              </InputLabel>
              <Select
                value={campaign.status}
                onChange={changeHandler('status')}
                input={<OutlinedInput labelWidth={100} name="status" id="outlined-status-simple" />}
              >
                {config.siteStatus.map(s => <MenuItem value={s}><em>{s}</em></MenuItem>)}
              </Select>
            </FormControl>
          </DonationDiv>
          <SIconButtons>
            <SButton>
              <Button variant="outlined" color="primary" type="submit">
                Submit
              </Button>
            </SButton>
            <SButton>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  this.setState({
                    pageState: config.pageState[config.siteState].rootList,
                    pageEntityId: ''
                  });
                }}
              >
                Cancel
              </Button>
            </SButton>
          </SIconButtons>
        </form>
      </Content>
    </div>
  )
}
