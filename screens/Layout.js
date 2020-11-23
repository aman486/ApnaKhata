import React,{useCallback,useEffect} from 'react'

import {View} from 'react-native'
import {useDispatch} from 'react-redux'
import * as Contacts from 'expo-contacts';

import CustomerNavigation from '../navigation/CustomerNavigation';
import {addContacts} from "../store/actions/contacts-action"
import {loadPayment} from "../store/actions/data-action"


const Layout = ()=>{
    const dispatch = useDispatch();

    const fetchContacts = useCallback(async ()=>{
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.FirstName],
            //pageSize:20,
            //pageOffset: 0,
            });
            
            // Contacts.

            if (data.length > 0) {
                // console.log(data);
                dispatch(addContacts(data))
            }
        }
    },[])

    const fetchData = useCallback(()=>{
        dispatch(loadPayment())
    },[dispatch,loadPayment])

 

    useEffect(() => {
        fetchContacts()
        fetchData()
    }, [fetchContacts,fetchData]);

    return(
        <View style={{flex:1}}>
            <CustomerNavigation/>
        </View>
    ) 
}

export default Layout