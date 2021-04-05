import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';


class Navbar extends Component {

    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true }
        }
        else {
            return { isAuthenticated: false }
        }
    }

    onLogOutClick = (e) => {
        e.preventDefault()
        const {firebase} = this.props
        firebase.logout().then(()=>{
            const {history} = this.props
            history.push('/login')
        })
    }

    render() {
        const {auth} = this.props
        const { isAuthenticated } = this.state
        const {allowRegistration} = this.props.settings
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" exact className="navbar-brand">ClientPanel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav me-auto">
                        {isAuthenticated ? (<li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>) : null
                        }
                        </ul>
                        {isAuthenticated? (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href="#!" className="nav-link">
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                <Link to="/setting" className="nav-link">
                                    Setting
                                </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="#!" className="nav-link" onClick={this.onLogOutClick}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : null}

                        {allowRegistration && !isAuthenticated ? (
                            <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                            </li>
                        </ul>
                        ) : null}

                    </div>

                </div>
            </nav>
        );
    }
}

export default withRouter(compose(
    firebaseConnect(),
    connect(({ firebase: { auth },settings }, props) => ({
        auth: auth,
        settings: settings
    }))
)(Navbar))
