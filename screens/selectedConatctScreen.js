import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Modal,FlatList,Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { loadPaymentDetails } from '../store/actions/data-action';

import InputScreen from "./InputScreen"


const SelectedContactScreen = props => {
    const userid = props.navigation.getParam('userid')
    const name = props.navigation.getParam('selectedName')
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const data = useSelector(state => state.data.data)
    const record = useSelector(state => state.data.record)
    // console.log("record",record)
    const selectedUserData = data.filter(item => item.userid == userid)
    const contacts = useSelector(state => state.contacts.contacts)
    console.log(selectedUserData)
    //const selectedContact = contacts.filter(item => item.id == userid)
    //console.log(selectedContact)
    //console.log(selectedUserData[0]["advance"]);
    //console.log(selectedUserData[0]["borrow"]);

    let advance=0,borrow=0

    if (selectedUserData.length !== 0){
        advance = selectedUserData[0]["advance"];
        borrow = selectedUserData[0]["borrow"];
    }
    
    


    const loadPaymentDetails1 = useCallback(() => {
        dispatch(loadPaymentDetails(userid))
    }, [dispatch])

    useEffect(() => {
        loadPaymentDetails1()
    }, [loadPaymentDetails1])

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleReminder = () => {
        let url = `whatsapp://send?text= Payement of ₹${borrow - advance} is due. Please send as soon as possible.`
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });

    }

    const handleCloseModal = () => {
        dispatch(loadPaymentDetails(userid))
        setShowModal(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text>Date  </Text>
                <Text>You Got</Text>
                <Text>You Give</Text>
            </View>
            
            <View style={styles.listContainer}>
               <FlatList
                    data={record}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.payment}>
                                <View style={styles.dateContainer}>
                                <Text style={{paddingLeft:5}}>{item.date}</Text>
                                </View>
                                {
                                (item.borrow > 0) ?
                                    <View style={styles.advance}>
                                    </View>
                                    :null
                                }
                                {
                                (item.advance > 0) ?
                                    <View style={styles.advance}>
                                        <Text style={{color:'red', fontWeight:"bold"}}>₹ {item.advance}</Text>
                                    </View>
                                     :
                                    <View style={styles.borrow}>
                                        <Text style={{color:'green', fontWeight:"bold"}}>₹ {item.borrow}</Text>
                                    </View>
                                }
                                {
                                (item.advance > 0) ?
                                    <View style={styles.borrow}>
                                    </View>
                                    :null
                                }
                            </View>
                        )
                    }}
                />



            </View>

            <View style={styles.addAmountButtonContainer}>
              
                <TouchableOpacity
                    style={styles.button1}
                    onPress={handleShowModal}
                >
                    <Text>
                        Add Amount
                </Text>
                    
                </TouchableOpacity>
                { 
                    (borrow > advance) ?  
                        <TouchableOpacity
                        style={styles.button1}
                        onPress={handleReminder}
                        >
                            <Text>
                                Reminder
                            </Text>
                    
                        </TouchableOpacity> : null
                }

            </View>
            


            {
                    showModal &&
                    <Modal
                        visible={showModal}
                        animationType="slide"
                    >
                        <InputScreen
                            closeModal={handleCloseModal}
                            userid={userid}
                            name={name}
                        />
                    </Modal>
                }
        </View>
    )
}

SelectedContactScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('selectedName')
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:5,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5,
        paddingHorizontal : 10
    },
    listContainer:{
        height:'85%',
        width:'100%'
    },
    payment:{
        width:'100%',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginBottom:15,
        elevation:3,
        borderRadius:5,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal : 2
    },
    dateContainer:{
        width:'28%',
    },
    advance:{
        width:'22%',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        backgroundColor:'rgba(255,0,0,0.2)'
    },
    borrow:{
        width:'22%',
        justifyContent:'center',
        alignItems:'center',
    },
    addAmountButtonContainer: {
        width:'100%',
        height:'5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'

    },
    button1: {
        backgroundColor: "red",
        padding: 20,
        borderRadius: 10,
        margin: 20,
        width: '40%',
        alignItems: 'center'
    },
    button2: {
        backgroundColor: "green",
        padding: 20,
        borderRadius: 10,
        margin: 20,
        width: '40%',
        alignItems: 'center'
    },
})

export default SelectedContactScreen;