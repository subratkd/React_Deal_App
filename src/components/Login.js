import React, { Component } from 'react';
import { useHistory, Route } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    }
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  checkLogin(e) {
    e.preventDefault();
    const { name, password } = this.state;
    this.props.history.push('/DealHome');

  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Login" />
            <TextField
              placeholder="Enter Your User Name"
              label="User Name"
              name="name"
              type="text"
              margin="normal"
              onChange={e => this.handleChange(e)}
              fullWidth
            />
            <br />
            <TextField
              placeholder="Enter Your Password"
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
              margin="normal"
              fullWidth
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => this.checkLogin(e)}
            >Login</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Login;
