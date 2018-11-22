import React from 'react';
import update from 'immutability-helper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/Backspace';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Subline } from 'components';
import { SectionTitle } from 'components';
import config from '../../../config/SiteConfig';
import { EntityStateDdl } from '../../models/api-data-status';

const { SetBlockchain } = require('../../models/api-post');

const RootPage = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  margin-bottom: 1em;
  max-width: 60em;
  form {
    input {
      min-width: 36em;
      margin-left: 2em;
      margin-top: 0.5rem;
    }
    textarea {
      resize: vertical;
      min-width: 36em;
      margin-left: 2em;
      min-height: 5em;
      width: 100%;
      margin-top: 0.5rem;
    }EntityStateDdl
    EntityStateDdl
    select {
      min-width: 20em;
    }
  }
`;

const EntityStatusDiv = styled.div`
  margin-top: 0.5em;
  div {
    min-width: 15em;
  }
`;

const SIconButtons = styled.div`
  display: flex;
  padding: 0.5em;
  flex-direction: row;
  justify-content: flex-end;
`;

const SButton = styled.div `
  margin-left: 1.5em;
`;

export default function ProductPage(requestId) {
  const { data } = this.state;
  const productIx = data.findIndex(d => d.id === requestId);
  const product = data[productIx];

  const closeWindow = () => {
    console.log('closeWindow called.', config.pageState[config.siteState].rootList);
    this.setState({
      pageState: config.pageState[config.siteState].rootList,
      pageEntityId: ''
    });
  }

  const changeHandler = type => event => {
    this.setState({
      data: update(this.state.data, { [productIx]: { [type]: { $set: event.target.value } } })
    });
  }

  const saveEdit = () => {
    let formData = _.cloneDeep(product);
    formData.name = product.name;
    formData.video = product.video;
    formData.excerpt = product.excerpt;
    formData.html = product.html;
    formData.status = product.rfp;
    formData.entityId = product.product;
    console.log('saveEdit: 1', formData);
    SetBlockchain('product', formData)
      .then(result => {
        console.log('saveEdit: 2');
        if (result.status === 200) {
          this.setState({
            data: update(this.state.data, { [productIx]: { product: { $set: result.data.entityId } } })
          });
          console.log('saveEdit: 3', result);
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
    console.log('Product submitHandler --------', product);
    saveEdit();
  }

  console.log('ProductPage  ---', product);
  const subline = `STATUS: ${product.rfp} - - - - - APPROVAL: ${product.status} `;
  return (
    <RootPage>
      <form name="contact-form" method="post" onSubmit={submitHandler}>
        <Card>
          <Subline sectionTitle>
            {subline} - - - 
          </Subline>
          <CardContent>
            <TextField
              variant="outlined"
              id="name"
              label="name"
              value={product.name}
              margin="normal"
              onChange={changeHandler('name')}
            />
            <TextField
              variant="outlined"
              id="video"
              label="video"
              value={product.video}
              margin="normal"
              onChange={changeHandler('video')}
            />
            <TextField
              variant="outlined"
              id="excerpt"
              label="excerpt"
              multiline
              rowsMax="2"
              value={product.excerpt}
              margin="normal"
              onChange={changeHandler('excerpt')}
            />
            <TextField
              variant="outlined"
              id="html"
              label="html"
              multiline
              rowsMax="4"
              value={product.html}
              margin="normal"
              onChange={changeHandler('html')}
            />
            <EntityStatusDiv>
              <FormControl variant="outlined">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple"
                >
                  Product Status
                </InputLabel>
                <Select
                  value={product.rfp}
                  onChange={changeHandler('rfp')}
                  input={<OutlinedInput labelWidth={100} name="rfp" id="outlined-rfp-simple" />}
                >
                  {EntityStateDdl(product.rfp).map(s => <MenuItem value={s.value}><em>{s.name}</em></MenuItem>)}
                </Select>
              </FormControl>
            </EntityStatusDiv>
          </CardContent>
          <CardActions>
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
          </CardActions>
        </Card>
      </form>
    </RootPage>
  );
}
