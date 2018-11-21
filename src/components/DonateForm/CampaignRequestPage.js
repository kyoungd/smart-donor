/* eslint jsx-a11y/label-has-for:0 */

import update from 'immutability-helper';
import React from 'react';
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { media } from '../../utils/media';
import config from '../../../config/SiteConfig';

const _ = require('lodash');
const { SetBlockchain } = require('../../models/api-post');
const { ListSupplier } = require('../../models/api-customer-campaignrequest');
const { getResourceId } = require('../../models/api');

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

const SupplierDiv = styled.div`
  div {
    min-width: 20em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

export default function CampaignRequestPage(campaignRequestId) {
  const { dashboard } = this.state;
  console.log('CampaignRequestPage ', dashboard.data, campaignRequestId);
  const requestIx = dashboard.data.findIndex(item => item.id == campaignRequestId);
  const request = dashboard.data[requestIx];
  // console.log('CampaignRequestPage ', request);

  const changeHandler = type => event => {
    this.setState({
      dashboard: update(this.state.dashboard, { 
        data:
          {[requestIx] : {[type]: {$set: event.target.value}}}
      })
    })
  }

  const nameid = (id, name) => `${id}#${name}`;

  const handlerSupplier = event => {
    console.log('======== changeSupplierHandler', event.target);
    
    const item = event.target.value.split('#');
    this.setState({
      dashboard: update(this.state.dashboard, { 
        data:
          {[requestIx] : { supplier: {$set: item[0]}, supplierName: {$set: item[1]} }}
      })
    })
  }

  const closeWindow = () => {
    this.setState({
      pageState: config.pageState[config.siteState].sublevelList,
      pageEntityId: ''
    });
  }

  const saveNew = () => {
    console.log('CampaignPage.saveNew() request 2 ', request);
    let formData = _.cloneDeep(request);
    formData.entityId = 'new';
    formData.name = request.name;
    formData.description = request.description;
    formData.approvalStatus = request.status;
    formData.status = request.rfp;
    formData.supplier = request.supplier;
    console.log('CampaignRequestPage.saveNew() request 3 ', JSON.stringify(formData, null, 2));
    SetBlockchain('campaignrequest', formData)
      .then(result => {
        console.log('CampaignRequestPage.saveNew() request saved 1 ');
        this.setState({
          dashboard: update(this.state.dashboard, { 
            data:
              {[requestIx] : {id: {$set: result.data.entityId}}}
          })
        }, () => {
          console.log('CampaignRequestPage.saveNew() request saved 2 ');
          let newblock = this.state.dashboard.data.filter(item => item.id === 'blank');
          newblock.id = 'new';
          this.setState(prevState => ({
            ...prevState,
            dashboard: {
              ...prevState.dashboard,
              data: [...this.state.dashboard.data, newblock]
            }
          }));
        })
      })
      .catch(err => {
        console.log('CampaignRequestPage.saveNew() error ', err);
      })
    closeWindow();
  }

  const saveEdit = () => {
    let formData = _.cloneDeep(request);
    formData.name = request.name;
    formData.entityId = request.id;
    formData.description = request.description;
    formData.approvalStatus = request.status;
    formData.status = request.rfp;
    formData.supplier = request.supplier;
    console.log('saveEdit: 1', formData);
    SetBlockchain('campaignrequest', formData)
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
    console.log('Request submitHandler --------', request);
    if (request.id === 'new') saveNew();
    else saveEdit();
  }

  return (
    <div>
      <Content>
        <p>Request for Proposal</p>
        <form name="contact-form" method="post" onSubmit={submitHandler}>
          <div>
            <div>
              <TextField 
                variant="outlined"
                id="name"
                label="name"
                value={request.name}
                margin="normal"
                onChange={changeHandler('name')}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="description"
                label="description"
                multiline
                rowsMax="3"
                value={request.description}
                onChange={changeHandler('description')}
                margin="normal"
              />
            </div>
            <SupplierDiv>
              <FormControl variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Choose Supplier
                </InputLabel>
                <Select
                  onChange={handlerSupplier}
                  value={ nameid(getResourceId(request.supplier), request.supplierName) }
                  input={<OutlinedInput labelWidth={100} name="age" id="outlined-age-simple" />}
                >
                  { 
                    ListSupplier(dashboard.data, dashboard.allSupplier, request).map(s =>
                      <MenuItem disabled={s.checked} value={nameid(s.id, s.name)}><em>{s.name}</em></MenuItem>) 
                  }
                </Select>
              </FormControl>
              <FormControl variant="outlined">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Choose Status
              </InputLabel>
              <Select
                value={request.rfp}
                onChange={changeHandler('rfp')}
                input={<OutlinedInput labelWidth={100} name="rfp" id="outlined-rfp-simple" />}
              >
                {config.siteStatus.map(s => <MenuItem value={s}><em>{s}</em></MenuItem>)}
              </Select>
            </FormControl>
            </SupplierDiv>
          </div>
          <SIconButtons>
            <SButton>
              <Button variant="outlined" color="primary" type="submit">
                Submit
              </Button>
            </SButton>
            <SButton>
              <Button variant="outlined" color="primary" onClick={() => {
                this.setState({
                  pageState: config.pageState[config.siteState].sublevelList,
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
