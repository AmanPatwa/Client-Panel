import React from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setAllowRegistration, setDisabledBalanceOnAdd, setDisabledBalanceOnEdit } from '../../actions/settingsActions'
import { firebaseConnect } from 'react-redux-firebase'

const Settings = (props) => {
    const { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration } = props.settings
    
    const allowRegistrationChange = () => {
        const {setAllowRegistration} = props
        setAllowRegistration()
    }

    const disableBalanceOnAddChange = () => {
        const {setDisabledBalanceOnAdd} = props
        setDisabledBalanceOnAdd()
    }

    const disableBalanceOnEditChange = () => {
        const {setDisabledBalanceOnEdit} = props
        setDisabledBalanceOnEdit()
    }



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
                <div className="card-header">
                    Edit Settings
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Allow Registration</label>{' '}
                            <input type="checkbox" name="allowRegistration" checked={allowRegistration} onChange={allowRegistrationChange}/>
                        </div>
                        <div className="form-group">
                            <label>Disable Balance On Add</label>{' '}
                            <input type="checkbox" name="disableBalanceOnAdd" checked={disableBalanceOnAdd} onChange={disableBalanceOnAddChange}/>
                        </div>
                        <div className="form-group">
                            <label>Disable Balance On Edit</label>{' '}
                            <input type="checkbox" name="disableBalanceOnEdit" checked={disableBalanceOnEdit} onChange={disableBalanceOnEditChange}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default compose(firebaseConnect(),connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}), {
    setDisabledBalanceOnEdit, setDisabledBalanceOnAdd, setAllowRegistration
}))(Settings);
