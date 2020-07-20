import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


export class DealTeam extends Component {
  continue = e => {
    e.preventDefault();
    // this.props.nextStep();
  };
  logout = () => {
    this.props.history.push('/logout');
  }
  back = () => {
    this.props.history.push('/DealDetails');
  }
  handleAssignedPMS = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      ["assignPMs"]: value
    })
  };
  handleAssignedDMS = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      ["assignDMs"]: value
    })
  };
  handleAssignedApprovers = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      ["assignApprovers"]: value
    })
  };
  getAuthDetails() {
    let encoded = window.btoa('wbadmin:wbadmin');
    let auth = 'Basic ' + encoded;
    return auth;
  }
  save = () => {
    fetch(`http://localhost:8090/rest/server/containers/${this.props.location.state.dealObj.containerName}/tasks/${this.props.location.state.dealObj.taskId}/states/started?user=bapi`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthDetails()
      },
    })
      .then((data) => {
        console.log("data", data);
        if (data.status === 201) {
          alert('Task', this.props.location.state.dealObj.taskId, 'Started');
          this.saveDealInfo()
        }

      }).catch((error) => console.log(error));

  }
  saveDealInfo = () => {
    const { assignPMs, assignDMs, assignApprovers } = this.state;
    const dealDetails = {
      "dealDetails": {
        "com.example.dealbpm.models.DealDetails": {
          "id": this.props.location.state.dealObj.instanceId,
          "dealName": this.props.location.state.dealObj.dealAmount,
          "amount": this.props.location.state.dealObj.dealName,
          "dealDate": this.props.location.state.dealObj.dealDate,
          "customerName": this.props.location.state.dealObj.customerName,
          "addressLine1": this.props.location.state.dealObj.addressLine1,
          "addressLine2": this.props.location.state.dealObj.addressLine2,
          "state": this.props.location.state.dealObj.state,
          "country": this.props.location.state.dealObj.country,
          "zipcode": this.props.location.state.dealObj.zipCode,
          "email": this.props.location.state.dealObj.Email
        }
      },
      "isApproved": true,
      "dealTeam": {
        "com.example.dealbpm.models.DealTeam": {
          "assignPMs": assignPMs[0],
          "assignDMs": assignDMs[0],
          "assignApprovers": assignApprovers[0]
        }
      }
    }
    fetch(`http://localhost:8090/rest/server/containers/${this.props.location.state.dealObj.containerName}/tasks/${this.props.location.state.dealObj.taskId}/states/completed?user=Bapi`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthDetails()
      },
      body: JSON.stringify(dealDetails),
    }).then((result) => {
      console.log("data", result);
      if (result.status === 201) {
        console.log("Process Completed");
        this.props.history.push('/DealHome');
      }
    }).catch((error) => console.log(error));

  }
  useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  implStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#5f27cd'
  }

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='md'
          >
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" style={{ marginRight: '2' }} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Identify Deal Details
                </Typography>
                <Button color="inherit" onClick={this.logout}>LOGOUT</Button>
              </Toolbar>
            </AppBar>
            <FormControl >
              <InputLabel shrink htmlFor="select-multiple-native" style={this.implStyle}>
                Assign Protfolio Manager
             </InputLabel>
              <Select
                multiple
                native
                onChange={this.handleAssignedPMS}
                inputProps={{
                  id: 'select-multiple-native',
                }}
              >
                {this.names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl >
              <InputLabel id="demo-simple-select-label" style={{ fontWeight: 'bold' }}>Assign Protfolio Manager</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={10}>Alex</MenuItem>
                <MenuItem value={20}>Austin</MenuItem>
                <MenuItem value={30}>David</MenuItem>
              </Select>
            </FormControl> */}
            <br />
            <br />
            {/* <FormControl >
              <InputLabel id="demo-simple-select-label1" style={{ fontWeight: 'bold' }}>Assign Document Manager</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={10}>Alex</MenuItem>
                <MenuItem value={20}>Austin</MenuItem>
                <MenuItem value={30}>David</MenuItem>
              </Select>
            </FormControl> */}
            <FormControl >
              <InputLabel shrink htmlFor="select-multiple-native" style={this.implStyle}>
                Assign Document Manager
             </InputLabel>
              <Select
                multiple
                native
                onChange={this.handleAssignedDMS}
                inputProps={{
                  id: 'select-multiple-native',
                }}
              >
                {this.names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl >
              <InputLabel shrink htmlFor="select-multiple-native" style={this.implStyle}>
                Assign Final Approvers
             </InputLabel>
              <Select
                multiple
                native
                onChange={this.handleAssignedApprovers}
                inputProps={{
                  id: 'select-multiple-native',
                }}
              >
                {this.names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <Button
              color="default"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="secondary"
              variant="contained"
            >Save</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.save}
            >Submit</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default DealTeam;
