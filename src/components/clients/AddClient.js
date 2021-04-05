import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux';

class AddClient extends Component {
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
        const {firestore} = this.props

        if (newClient.balance==''){
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients' },newClient).then(()=> this.props.history.push('/'))
    }

    render() {
        const {disableBalanceOnAdd} = this.props.settings
        
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
                                       disabled = {disableBalanceOnAdd}
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

export default compose(firestoreConnect(),
connect((state,props) => ({
    settings: state.settings
})))(AddClient);