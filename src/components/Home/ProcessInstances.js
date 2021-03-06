import React, { Component } from 'react'
class ProcessInstance extends Component {
    componentDidMount() {
        setInterval(this.getProcessInstancesData, 2000);
    }
    getProcessInstancesData = () => {
        fetch('http://localhost:8090/processinstances',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    instances: data
                });
            });
    };

    render() {
        const haveData = this.state && this.state.instances;
        return (
            <div class="card mb-4">
                <div class="view overlay" className="ReactTitleStyle3">
                    <center><strong>Process Instances</strong></center>
                </div>
                <div class="card-body jbpm-card-body">
                    {haveData ? (
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Initiator</th>
                                    <th scope="col">Date</th>



                                </tr>
                            </thead>
                            <tbody>
                                {this.state.instances.map(processinst => (
                                    <tr>
                                        <td><small> <a href="http://localhost:8090/rest/server/containers/deal-bpm-kjar-1_0_0/images/processes/instances/1">{processinst.id}</a></small></td>
                                        <td><small>{processinst.processName}</small></td>
                                        <td><small>{processinst.state === 2 ? 'Completed' : 'In-Progress'}</small></td>
                                        <td><small>{processinst.initiator}</small></td>
                                        <td><small>{processinst.dataTimeStamp}</small></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    ) : (
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        )}
                </div>
            </div>
        );
    }


}
export default ProcessInstance;