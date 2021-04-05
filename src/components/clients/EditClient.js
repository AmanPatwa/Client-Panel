import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class EditClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newClient = this.state;
        const {client,firestore} = this.props

        if (newClient.balance==''){
            newClient.balance = 0;
        }

        firestore.update({ collection: 'clients',doc:client.id },newClient).then(()=> this.props.history.push('/'))
    }

    componentDidMount(){
        const {client} = this.props
        this.setState({
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            balance: client.balance,
            phone: client.phone
        })
    }

    render() {
        
        const {disableBalanceOnEdit} = this.props.settings

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" 
                                       className="form-control"
                                       name="firstName"
                                       minLength="2"
                                       required
                                       onChange={this.onChange}
                                       value={this.state.firstName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" 
                                       className="form-control"
                                       name="lastName"
                                       minLength="2"
                                       required
                                       onChange={this.onChange}
                                       value={this.state.lastName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" 
                                       className="form-control"
                                       name="email"
                                       required
                                       onChange={this.onChange}
                                       value={this.state.email}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone">Phone No</label>
                                <input type="text" 
                                       className="form-control"
                                       name="phone"
                                       minLength="10"
                                       required
                                       onChange={this.onChange}
                                       value={this.state.phone}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="balance">Balance</label>
                                <input type="text" 
                                       className="form-control"
                                       name="balance"
                                       onChange={this.onChange}
                                       value={this.state.balance}
                                       disabled = {disableBalanceOnEdit}
                                />
                            </div>
                            <input type="submit" value="Submit" style={{width:'100%'}} className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    firestoreConnect((props) => [
        { collection: 'clients',storeAs: 'client', doc: props.match.params.id } // or `todos/${props.todoId}`
    ]),
    connect(({ firestore: { ordered },settings }, props) => ({
        client: ordered.clients && ordered.clients[0],
        settings: settings
    }))
)(EditClient)