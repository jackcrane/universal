import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppLoading from 'expo-app-loading';

import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import Styles from './Style';

const localstyles = StyleSheet.create({
  container: {
    // paddingBottom: 30,
    padding: 20,
    paddingTop: 30
  },
  header_row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  title_text: {
    fontSize: 60,
    fontFamily: 'WorkSans_500Medium'
  }
})

import { SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = (props) => {
  let [fontsLoaded] = useFonts({
    WorkSans_500Medium
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={localstyles.container}>
        <View style={localstyles.header_row}>
          <TouchableOpacity onPress={() => props.nav.openDrawer()}>
            <SimpleLineIcons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {props.scrollPos > 130 ? (
            <Text style={{...localstyles.title_text, fontSize: 45}}>{props.title}</Text>
          ) : (<Text></Text>)}
          <TouchableOpacity onPress={() => props.nav.navigate('profile')}>
            <Image source={{uri:'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg'}} style={localstyles.profile_image} />
          </TouchableOpacity>
        </View>
        {props.scrollPos < 130 ? (
          <Text style={localstyles.title_text}>{props.title}</Text>
        ) : (<Text></Text>)}
      </View>
    )
  }
}

export default HomeScreen;