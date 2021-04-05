import React from 'react';
import firebase from 'firebase'

const Auth = redirectPath => WrappedComponent => {
    class WithAuthProtection extends React.Component {
      componentDidMount() {
        // use history from parent.
        const { history } = this.props;
        if (!firebase.auth().currentUser) {
          // no auth at the beginning of the app, redirect them to 
            //  login.
          return history.push(redirectPath)
        }
      }
      
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
     
    return WithAuthProtection
  }

export default Auth