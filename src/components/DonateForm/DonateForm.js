import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { navigateTo } from 'gatsby-link';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const styles = theme => ({
  submit: {
    margin: '3em 0',
    // width: '100%'
  },
  multilineInput: {
    lineHeight: 1.4,
    fontSize: '1.2em',
  },
  singleLineInput: {
    lineHeight: 1.4,
    fontSize: '1.2em',
    [`@media (min-width: 100px)`]: {
      width: '47%',
      marginLeft: '3%',
      '&:first-child,&:nth-child(3),&:nth-child(5)': {
        marginRight: '3%',
        marginLeft: 0,
      },
    },
  },
  checkboxInput: {
    fontSize: '1.2em',
    paddingTop: '1em',
    marginLeft: 0,
    marginRight: '3%',
    marginUp: '3%',
    marginDown: '3%',
  },
  submitError: {
    background: 'red',
    color: 'white',
  },
});

class DonateForm extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      name: data.name,
      amount: data.amount,
      expireOn: data.expireOn,
      availableOn: data.availableOn,
      description: data.description,
      accountNumber: '',
      routingNumber: '',
      submitError: '',
    }
  }

  handleChange = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({ [name]: value });
  };

  handleNetworkError = e => {
    this.setState({ submitError: 'There was a network error.' });
  };

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "campaign", ...this.props })
    })
      .then(() => {
        console.log("Form submission success");
        navigateTo("/success");
      })
      .catch(error => {
        console.error("Form submission error:", error);
        this.handleNetworkError();
      });

    e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { name, amount, expireOn, availableOn, routingNumber, accountNumber, description, submitError } = this.state;

    return (
      <ValidatorForm
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
        name="campaign"
        ref={f => (this.form = f)}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        {submitError && <p className={classes.submitError}>{submitError}</p>}
        <TextValidator
          id="name"
          name="name"
          label="Name"
          value={name}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="amount"
          name="amount"
          label="amount"
          value={amount}
          onChange={this.handleChange}
          validators={['required', 'matchRegexp:^[0-9]*$']}
          errorMessages={['this field is required', 'not valid amount']}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="availableOn"
          name="availableOn"
          label="available on"
          type="date"
          value={availableOn}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.singleLineInput}
        />
        <TextValidator
          id="expireOn"
          name="expireOn"
          label="expires on"
          type="date"
          value={expireOn}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="routingNumber"
          name="routingNumber"
          label="Routing Number"
          value={routingNumber}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          value={accountNumber}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="description"
          name="description"
          label="description"
          value={description}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['this field is required']}
          multiline
          fullWidth
          margin="normal"
          className={classes.multilineInput}
        />
        <input name="bot-field" style={{ display: 'none' }} />
        <Button variant="raised" color="primary" size="large" type="submit" className={classes.submit}>
          Send
        </Button>
      </ValidatorForm>
    );
  }
}

DonateForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    availableOn: PropTypes.string.isRequired,
    expireOn: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(
  DonateForm
);
