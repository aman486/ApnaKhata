import React,{useEffect} from 'react';
import {StyleSheet} from 'react-native';
// import CustomerNavigation from './navigation/CustomerNavigation';
import  Layout from "./screens/Layout"
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import DataReducer from './store/reducers/data-reducer'; 
import ContactsReducer from './store/reducers/contacts-reducer'; 

import {init,init1} from './helpers/db';



const rootReducer = combineReducers({
  data:DataReducer,
  contacts:ContactsReducer
})
  
const store = createStore(rootReducer,applyMiddleware(ReduxThunk))  

export default function App() {

  useEffect(()=>{
    init()
      .then(() => {
        // console.log('Initial Databse')
      })
      .catch(err =>{
        // console.log('Intializind db is failed');
        console.log(err)
      })

      init1()
      .then(() => {
        // console.log('Initial Databse 1')
      })
      .catch(err =>{
        // console.log('Intializind db is failed 1');
        console.log(err)
      })


  },[init,init1])

  return (
    <Provider store={store}>
      <Layout/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
