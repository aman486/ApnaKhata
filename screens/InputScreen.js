import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Platform, Button,ActivityIndicator,TouchableNativeFeedback} from 'react-native';
import ImagePicker from '../components/imagePicker';
import DatePick from '../components/UI/datePicker';

// import {HeaderButtons,Item} from 'react-navigation-header-buttons';
// import HeaderButton from '../components/UI/HeaderButton';
import {useDispatch} from 'react-redux';
import * as PaymentActions from '../store/actions/data-action';

const InputScreen = props =>{
    const [amount,setAmount] = useState();
    const [date,setDate] = useState(new Date().toUTCString().slice(0,16))
    const [isLoading,setIsLoading] = useState(false);
    const [showDatePicker,setShowDatePicker] = useState(false)
    const {userid,name} = props
    const dispatch = useDispatch();

    const textChangehandler = text =>{
        setAmount(text)
    }
    

    const imagetakenHandler = date =>{
        console.log(date)
    }

    const savePlaceHandler =async (amountType) =>{
        //setIsLoading(true)
    
        await dispatch(PaymentActions.addBorrowPaymnet(userid,name,amount,amountType,date))
        
        //setIsLoading(false);
        props.closeModal()        
    }

    const handleDateChange = date=>{
        setDate(date)
    }

    const handleShowDatePicker = ()=>{
        setShowDatePicker(true)
    }

    const handleCloseDatePicker = ()=>{
        setShowDatePicker(false)
    }

    return(
        <View style={styles.container}>
            <View style={styles.screen}>
                <TextInput style={styles.input} textContentType="telephoneNumber"  keyboardType='decimal-pad' placeholder="  Enter Amount" onChangeText={textChangehandler} value={amount} />
            </View>

            <TouchableNativeFeedback
                onPress={handleShowDatePicker}
            >
                <View style={styles.dateContainer}>
                    <Text>{date}</Text>
                </View>
            </TouchableNativeFeedback>

            <View> 
                <ImagePicker onImageTaken={imagetakenHandler}/>
            </View>
        

            <View style={{flexDirection:'row',justifyContent:'space-between', marginStart:10,marginEnd:10}}>
                <View>
                    {isLoading ? <ActivityIndicator size="small" color='red'/>:(
                    <Button  title="Advance" color='green' onPress={()=>savePlaceHandler('advance')}  />
                    )}
                </View>
                <View>
                    {isLoading ? <ActivityIndicator size="small" color='red'/>:(
                    <Button  title="Borrow" color='red' onPress={()=>savePlaceHandler('borrow')}  />
                    )}
                </View>
                <View style={styles.button3}>
                    <Button  title="Cancel" color='orange' onPress={props.closeModal}  />
                </View>
            </View>

            {
                showDatePicker&&
                <View >
                    <DatePick
                        closeDatePicker={handleCloseDatePicker}
                        handleDateChange = {handleDateChange}
                    />
                </View>
            }

        </View>
    )

}



const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:20
    },
    screen:{
        flex:1,
    },
    input:{
        height:50,
        borderWidth:1,
        backgroundColor:'white',
        color:'red',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    },
    dateContainer:{
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        marginBottom:20,
    }
});

export default InputScreen;