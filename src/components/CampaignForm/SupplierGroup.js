import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

class SupplierGroup extends React.Component {
  state = {
    suppliers: [
      { name: "gilad", display: "Gilad Gray Advertising", checked: true },
      { name: "jason", display: "Jason Killian Video Production", checked: false },
      { name: "antoine", display: "Antoine Llorca Video Force", checked: true },
    ]
  };

  handleCheckBoxChange = ix => event => {
    let copy = JSON.parse(JSON.stringify(this.state.suppliers));
    copy[ix].checked = event.target.checked;
    this.setState({suppliers: copy});
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Suppliers in Campaign</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.suppliers[0].checked}
                onChange={this.handleCheckBoxChange(0)}
                value={this.state.suppliers[0].name}
              />
            }
            label={this.state.suppliers[0].display}
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.suppliers[1].checked}
                onChange={this.handleCheckBoxChange(1)}
                value={this.state.suppliers[1].name}
              />
            }
            label={this.state.suppliers[1].display}
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.suppliers[2].checked}
                onChange={this.handleCheckBoxChange(2)}
                value={this.state.suppliers[2].name}
              />
            }
            label={this.state.suppliers[2].display}
          />
        </FormGroup>
        <FormHelperText>List of suppliers</FormHelperText>
      </FormControl>
    );
  }
}

export default SupplierGroup;
