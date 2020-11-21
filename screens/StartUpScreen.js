import React, { useEffect } from 'react';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


const StartUpScreen = props => {
  const data = useSelector(state => state.data.data)
  const dispatch = useDispatch();

  const detailPage = (username, id) => {
    props.navigation.navigate('SelectedContact', {
      selectedName: username,
      userid: id
    }
    )
  }

  return (
    <View style={styles.screen}>

      <FlatList
        data={data}
        keyExtractor={item => item.userid}
        renderItem={({ item }) => {
          return (
            <View >
              <TouchableOpacity onPress={() => { detailPage(item.username, item.userid) }} >
                <View style={styles.PaymentList}>
                  <Text style={styles.username}>{item.username}</Text>
                  {
                    (item.advance > item.borrow) ?
                      <Text style={styles.advance}>
                        {item.advance - item.borrow}{'\n'}{'\n'} Give
                    </Text> :
                      <Text style={styles.borrow}>
                        {item.borrow - item.advance}{'\n'}{'\n'} Got
                    </Text>

                  }
                </View>

              </TouchableOpacity>



            </View>
          )
        }} />

    </View>
  )
}

StartUpScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Home',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="MENU"
          iconName={'md-menu'}
        />
      </HeaderButtons>
    ),
    headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Contact"
        iconName={'md-person-add'}
        onPress={() => { navData.navigation.navigate('Contacts') }} />
    </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20
  },

  PaymentList: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    width: '100%',
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  username: {
    width: '60%',
    fontSize: 20,

  },
  advance: {
    marginLeft: '20%',
    width: '30%',
    fontWeight: 'bold',
    color: 'rgb(0,128,0)'
    
  },
  borrow: {
    marginLeft: '20%',
    width: '30%',
    fontWeight: 'bold',
    color: 'rgb(255,99,71)'
    //marginLeft:'50%'

  }

})

export default StartUpScreen;