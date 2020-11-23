import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { View,StyleSheet } from 'react-native';

const DatePick = props => {
    const currDate = new Date()
    //  console.log(currDate);

    const [date, setDate] = useState(currDate)

    const onChange = (date)=>{
        props.closeDatePicker()
        if(date.type!=="dismissed"){
            const _timedate = new Date(date.nativeEvent.timestamp)
            const _date = _timedate.toUTCString().slice(0,25)
            // const _date =  _timedate.toLocaleDateString().slice(0,10) 
            props.handleDateChange(_date)
        }
    }

    return (
        <View style={styles.container}>
            <DateTimePicker
                value={date}
                mode="date"
                testID="dateTimePicker"
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });

export default DatePick;