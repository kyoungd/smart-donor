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

const getSelectedMenu = (data) => {
  const item = data.supplier.find(s => s.selected);
  const menu = item ? item.id : 'None';
  return menu;
}

export default function CampaignRequestPage(campaignRequestId) {
  const { dashboard, test } = this.state;
  console.log('CampaignRequestPage ', dashboard.data, campaignRequestId);
  const requestIx = dashboard.data.findIndex(item => item.id == campaignRequestId);
  const data = dashboard.data[requestIx];

  const changeHandler = type => event => {
    this.setState({
      dashboard: update(this.state.dashboard, { 
        data:
          {[requestIx] : {[type]: {$set: event.target.value}}}
      })
    })
  }

  const submitHandler = (event) => {
    console.log('description --------', data);
    //Make a network call somewhere
    event.preventDefault();
  }

  return (
    <div>
      <Content>
        <p>Request for Proposal</p>
        <form name="contact-form" method="post" onSubmit={submitHandler}>
          <div>
            <div>
              <TextField variant="outlined" id="name" label="name" value={data.name} margin="normal"
                onChange={changeHandler('name')}
                // onChange={event => {
                //   // this.setState(prevState => ({
                //   //   ...prevState,
                //   //   test: {
                //   //     one: 'great',
                //   //   }
                //   // }));
                //   console.log('name changed');
                //   this.setState({
                //     dashboard: update(this.state.dashboard, { 
                //       data:
                //         {[requestIx] : {name: {$set: event.target.value}}}
                //     })
                //   })
                //   // this.setState(prevState => ({
                //   //   ...prevState,
                //   //   dashboard: {
                //   //     ...prevState.dashboard,
                //   //     data: {
                //   //       ...prevState.dashboard.data,
                //   //       0: {
                //   //         ...prevState.dashboard.data[0],
                //   //         name: 'hello'
                //   //       }
                //   //     }
                //   //   }
                //   // }));
                // }} 
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                id="amount"
                label="amount"
                defaultValue={data.amount}
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
                  value={data.availableOn}
                  onChange={changeHandler('availableOn')}
                  InputLabelProps={{ shrink: true, }}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  id="expireOn"
                  label="expireOn"
                  type="date"
                  value={data.expireOn}
                  onChange={changeHandler('expireOn')}
                  InputLabelProps={{ shrink: true, }}
                />
              </div>
            </DateDiv>
            <div>
              <TextField
                variant="outlined"
                id="description"
                label="description"
                multiline
                rowsMax="3"
                value={data.description}
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
                  value={getSelectedMenu(data)}
                  onChange={event => {
                    const supplierList = data.supplier.map(s => {
                      s.selected = s.id === event.target.value;
                      return s;
                    });
                    this.setState(
                      {...dashboard.data[requestIx].supplier, supplier: supplierList}
                    );
                  }}
                  input={
                    <OutlinedInput labelWidth={100} name="age" id="outlined-age-simple" />
                  }>
                  <MenuItem value="None">
                    <em>None </em>
                  </MenuItem>
                  {data.supplier.map(s => <MenuItem disabled={s.checked} value={s.id}><em>{s.name}</em></MenuItem>)}
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
