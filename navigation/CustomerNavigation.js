import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import StartUpScreen from '../screens/StartUpScreen';
import ContactScreen from '../screens/ContactScreen';
import SelectedContactScreen from '../screens/selectedConatctScreen';

const CustomerNavigation = createStackNavigator({
   StartUp: StartUpScreen,
   Contacts:ContactScreen,
   SelectedContact:SelectedContactScreen,
});


export default createAppContainer(CustomerNavigation);