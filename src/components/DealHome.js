import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import A from './Tabs';
import ServerInfo from './Home/ServerInfo';
import ProcessInstance from './Home/ProcessInstances';
import ProcessDefinition from './Home/ProcessDefinitions';

export class DealHome extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      index: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      'value': newValue
    })
  };
  logout = () => {
    this.props.history.push('/logout')
  }
  handleStartProcess = (cid, pid) => {
    fetch('http://localhost:8090/rest/server/containers/' + cid + '/processes/' + pid + '/instances', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then((result) => {
        fetch(`http://localhost:8090/rest/server/containers/deal-bpm-kjar-1_0_0/processes/instances/${result}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then((res) => {
            const taskId1 = res['active-user-tasks'];
            const taskId2 = taskId1['task-summary'];
            const taskId3 = taskId2[0]['task-id'];
            this.props.history.push({
              pathname: '/DealDetails',
              state: {
                instanceId: result,
                containerName: cid,
                taskId: taskId3
              }
            });
          })

      })
      .catch((error) => console.log(error));

    //this.props.history.replace('/DealDetails');


  };
  render() {
    const { values, value, handleChange } = this.props;

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
                  Deal Home
                </Typography>
                <Button color="inherit" onClick={this.logout}>LOGOUT</Button>
              </Toolbar>
            </AppBar>
            <Grid container spacing={1} style={{ margin: '10px !important' }}>
              <Grid item xs={6}>
                <div style={{ margin: '10px', padding: '10px', width: '900px' }}>

                  <A.Tabs value={this.state.index} onChange={(_, index) => this.setState({ index })}>
                    <A.Tab title="Server Info" />
                    <A.Tab title="Process Definitions" />
                    <A.Tab title="Process Instances" />
                  </A.Tabs>
                  <A.TabContent value={this.state.index} index={0}>
                    <ServerInfo />
                  </A.TabContent>
                  <A.TabContent value={this.state.index} index={1}>
                    <ProcessDefinition handleStartProcess={this.handleStartProcess} />
                  </A.TabContent>
                  <A.TabContent value={this.state.index} index={2}>
                    <ProcessInstance />
                  </A.TabContent>
                </div>
              </Grid>


            </Grid>
          </Dialog>
        </>
      </MuiThemeProvider >
    );
  }
}

export default DealHome;
