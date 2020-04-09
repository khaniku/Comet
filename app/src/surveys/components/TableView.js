import React, { Componenet } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import styling from '../../css/survey.css'

class App extends Componenet {
    state = {
        data: [],
        newDataModal: false
    }

    componentWillMount() {
        const auth = useSelector(state => state.auth);

        useEffect(() => {
            fetch('http://159.203.100.198:5000/api/survey/index', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.accessToken
                }
            })
                .then((response) => {
                    if (response.ok) {
                        setData(response.data)
                    }
                })
                .catch((error) => console.error(error))
        })
    }

    toggleNewData() {
        this.setState({
            newDataModal: true 
        })
    }

    render() {
        let data = this.state.data.map((value) => {
            return (
                <tr key={data.id}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td color="success" size="sm">edit</td>
                    <td color="danger" size="sm">delete</td>
                </tr>
            )
        })

        return (
            <div className="App container">
                <Button color="primary" onClick={this.toggleNewData.bind(this)}>Add New Survey</Button>
                <Modal isOpen={this.state.newDataModal} toggle={this.toggleNewData.bind(this)} >
                    <ModalHeader toggle={this.toggleNewData.bind(this)}>Add a new survey</ModalHeader>
                    <ModalBody>
                        Testing
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleNewData.bind(this)}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewData.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Site Address</th>
                            <th>Due Date</th>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </Table>
            </div>
        )
    }
}