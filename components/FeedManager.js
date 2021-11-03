import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppLoading from 'expo-app-loading';

import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import Styles from './Style';
import PostComponent from './PostComponent';

const localstyles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    
  }
})

import { SimpleLineIcons } from '@expo/vector-icons';

const FeedManager = (props) => {
  let [fontsLoaded] = useFonts({
    WorkSans_500Medium
  });

  

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={localstyles.container}>
        <View style={localstyles.innerContainer}>
          {props.data.map((item, index) => (
            <View key={index}>
              <PostComponent item={item} />
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default FeedManager