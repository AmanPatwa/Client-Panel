import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import {
  firebaseReducer,
} from 'react-redux-firebase'
import settingsReducer from '../components/reducers/settingsReducer'

const fbConfig = {
    apiKey: "AIzaSyD71NU9F1XI4DKofk26QUpE7QXk73ghFH4",
    authDomain: "react-client-app-827aa.firebaseapp.com",
    projectId: "react-client-app-827aa",
    storageBucket: "react-client-app-827aa.appspot.com",
    messagingSenderId: "250437183999",
    appId: "1:250437183999:web:38338a1ec463297e991fca",
    measurementId: "G-683KZ822VM"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
firebase.firestore() 

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  settings: settingsReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

if(localStorage.getItem('settings') == null){
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false 
  }

  localStorage.setItem('settings',JSON.stringify(defaultSettings))
}



// Create store with reducers and initial state
const initialState = {settings:JSON.parse(localStorage.getItem('settings'))}

export const store = createStore(rootReducer, initialState, compose(
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

));

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}
