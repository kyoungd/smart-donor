import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import { navigateTo } from 'gatsby-link';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const styles = theme => ({
  submit: {
    margin: '3em 0'
    //width: '100%'
  },
  multilineInput: {
    lineHeight: 1.4,
    fontSize: '1.2em'
  },
  singleLineInput: {
    lineHeight: 1.4,
    fontSize: '1.2em',
    [`@media (min-width: 100px)`]: {
      width: '47%',
      marginLeft: '3%',
      '&:first-child': {
        marginRight: '3%',
        marginLeft: 0
      },
      '&:nth-child(3)': {
        marginRight: '3%',
        marginLeft: 0
      },
      '&:nth-child(5)': {
        marginRight: '3%',
        marginLeft: 0
      }
    }
  },
  checkboxInput: {
    fontSize: '1.2em',
    paddingTop: '1em',
    marginLeft: 0,
    marginRight: '3%',
    marginUp: '3%',
    marginDown: '3%'
  },
  submitError: {
    background: 'red',
    color: 'white'
  }
});

class 
DonateForm extends React.Component {
  state = {
    name: "",
    email: "",
    message: "",
    submitError: ""
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleNetworkError = e => {
    this.setState({ submitError: "There was a network error." });
  };

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "campaign", ...this.state })
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
    const { name, amount, endDate, startDate, routingNumber, accountNumber, description, submitError } = this.state;

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
          validators={["required"]}
          errorMessages={["this field is required"]}
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
          validators={["required", "matchRegexp:^[0-9]*$"]}
          errorMessages={["this field is required", "not valid amount"]}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="startDate"
          name="startDate"
          label="start date"
          value={startDate}
          onChange={this.handleChange}
          validators={["required"]}
          errorMessages={["this field is required"]}
          fullWidth
          margin="normal"
          className={classes.singleLineInput}
        />
        <TextValidator
          id="endDate"
          name="endDate"
          label="end date"
          value={endDate}
          onChange={this.handleChange}
          validators={["required"]}
          errorMessages={["this field is required"]}
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
          validators={["required"]}
          errorMessages={["this field is required"]}
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
          validators={["required"]}
          errorMessages={["this field is required"]}
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
          validators={["required"]}
          errorMessages={["this field is required"]}
          multiline
          fullWidth
          margin="normal"
          className={classes.multilineInput}
        />
        <input name="bot-field" style={{ display: "none" }} />
        <Button
          variant="raised"
          color="primary"
          size="large"
          type="submit"
          className={classes.submit}
        >
          Send
        </Button>
      </ValidatorForm>
    );
  }
}


DonateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  DonateForm
);
