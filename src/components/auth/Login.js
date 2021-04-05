import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault()

        const {firebase,history} = this.props
        const {email,password} = this.state

        firebase.login({
            email,
            password
        })
        .then(() => {
            const {history} = this.props
            history.push('/')
        })
        .catch(err => alert('Invalid Creds'))

        
    }

    render() {
        return (
            <div className='row'>
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">

                                <span className="text-primary">
                                    <i className="fas fa-lock">

                                    </i>
                                    {' '} Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" required value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" name="password" required value={this.state.password} onChange={this.onChange} />
                                </div>
                                <input type="submit" value="Login" className="btn btn-primary" style={{ width: '100%' }} />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default firebaseConnect()(Login);