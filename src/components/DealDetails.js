import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemText } from '@material-ui/core/';
export class DealDetails extends Component {
  continue = e => {
    e.preventDefault();
    const {
      Email,
      Gender,
      addressLine1,
      addressLine2,
      country,
      customerName,
      dealAmount,
      dealDate,
      dealName,
      state,
      zipCode
    } = this.state;
    const dealObj = {
      Email: Email,
      Gender: Gender,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      customerName: customerName,
      dealAmount: dealAmount,
      dealDate: dealDate,
      dealName: dealName,
      state: state,
      zipCode: zipCode,
      instanceId: this.props.location.state.instanceId,
      containerName: this.props.location.state.containerName,
      taskId: this.props.location.state.taskId

    }
    this.props.history.push({
      pathname: '/DealTeam',
      state: { dealObj: dealObj }
    });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  logout = () => {
    this.props.history.push('/logout')
  }
  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });

  };
  // On file upload (click the upload button) 
  onFileUpload = () => {

    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file 
    console.log(this.state.selectedFile);
  };


  render() {
    const { instanceId, values, handleChange } = this.props;
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
                  Deal Details
                </Typography>
                <Button color="inherit" onClick={this.logout}>LOGOUT</Button>
              </Toolbar>
            </AppBar>
            <Grid container spacing={1} style={{ margin: '10px !important' }}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Deal Name"
                    label="Deal Name"
                    name='dealName'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Deal Amount"
                    label="Deal Amount"
                    name='dealAmount'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="date"
                    placeholder="Deal Date"
                    label="Deal Date"
                    name='dealDate'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Customer Name"
                    label="Customer Name"
                    name='customerName'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Address Line 1"
                    label="Address Line 1"
                    name='addressLine1'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Address Line 2"
                    label="Address Line 2"
                    name='addressLine2'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    placeholder="State"
                    label="State"
                    name='state'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Country"
                    label="Country"
                    name='country'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Zip Code"
                    label="Zip Code"
                    name='zipCode'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Email"
                    label="Email"
                    name='Email'
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    placeholder="Gender"
                    label="Gender"
                    name="Gender"
                    onChange={e => this.handleChange(e)}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Upload Deal Document"
                    InputProps={{
                      readOnly: true,
                    }} />
                  <input type="file" onChange={this.onFileChange} />
                  <button onClick={this.onFileUpload}>
                    Upload!
                </button>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4} style={{ paddingRight: '10px' }}>
                  <input type="checkbox" /> I Agree
                </Grid>
                <Grid item xs={4}>
                  <ListItem>
                    <ListItemText primary="Instance Id" secondary={this.props.location.state.instanceId} />
                  </ListItem>
                </Grid>
              </Grid>

            </Grid>
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider >
    );
  }
}

export default DealDetails;
