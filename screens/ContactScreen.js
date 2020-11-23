import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux"

const ContactScreen = props => {
  const contacts = useSelector(state => state.contacts.contacts)
  const [searchText, setSearchText] = useState('');
  
  const searchHandler = (text) => {
   

  }

  const selectContactHandler = (name, userid) => {
    props.navigation.navigate('SelectedContact', {
      selectedName: name,
      userid: userid
    }
    )
  }
  return (
    <View style={styles.screen}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search Contacts"
          onChangeText={(text) => searchHandler(text)}
          value={searchText}
        />
      </View>
      <FlatList data={contacts} renderItem={(item) => {
        //console.log(item)
        return (
          <TouchableOpacity onPress={() => { selectContactHandler(item.item.name, item.item.id) }}>
            <View style={styles.contactList}>

              <Ionicons name="md-contact" size={45} color="#808080" />
              <Text style={styles.name}>{item.item.name}</Text>
              {/* <Text>{item.item.phoneNumbers[0].number}</Text> */}



            </View>
          </TouchableOpacity>
        )
      }} />

    </View>
  )
}

ContactScreen.navigationOptions = {
  headerTitle: 'Contacts'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,

  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    //alignItems:'center',
    justifyContent: 'center'
  },
  contactList: {
    flex: 1,
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',


  },
  name: {
    // paddingLeft:20,
    // borderWidth:1,
    height: 40,
    fontSize: 18,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomColor: '#808080',
    width: '100%',
    marginLeft: 20,
  }
})


export default ContactScreen;