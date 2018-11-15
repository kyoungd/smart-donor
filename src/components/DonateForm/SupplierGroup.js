import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

class SupplierGroup extends React.Component {
  state = {
    dataOk : false,
    supplier: [
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
    const { supplier } = this.state;
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Suppliers in Campaign</FormLabel>
        <FormGroup>
          {
            supplier.forEach(s => {
              <FormControlLabel
                control={
                  <Switch
                    checked={s.checked}
                    onChange={this.handleCheckBoxChange(0)}
                    value={s.name}
                  />
                }
                label={s.name}
              />
            })
          }
        </FormGroup>
        <FormHelperText>List of supplier</FormHelperText>
      </FormControl>
    );
  }
}

export default SupplierGroup;
