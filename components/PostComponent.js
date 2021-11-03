import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ExtendedImage from './XImg';
import * as Haptics from 'expo-haptics';

import { Foundation } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

const localstyles = StyleSheet.create({
  container:{
    paddingBottom:40
  },
  profile_image: {
    width: 50,
    height: 50,
    borderRadius: 15,
    // marginRight: 10,
  },
  poster_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  profile_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  interactions_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  interaction: {
    padding: 10
  }
})

const PostComponent = (props) => {
  const [ liked, setLiked ] = useState(false)
  const toggleLiked = () => {
    if(liked) {
      setLiked(false)
    } else {
      setLiked(true)
    }
  }

  let imageComponentPressedTimeout = null;
  let imageComponentPressedCount = 0;
  const handleImageComponentPressed = () => {
    clearTimeout(imageComponentPressedTimeout);
    imageComponentPressedTimeout = setTimeout(() => {
      imageComponentPressedCount = 0;
    }, 300);
    
    imageComponentPressedCount++;
    if(imageComponentPressedCount > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      toggleLiked();
    }
  }

  return (
    <View style={localstyles.container}>
      <View style={localstyles.poster_row}>
        <Image source={{uri:props.item.image}} style={localstyles.profile_image} />
        <Text style={localstyles.profile_text}>{props.item.username}</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleImageComponentPressed}>
        <View>
          <ExtendedImage src={props.item.image} />
        </View>
      </TouchableWithoutFeedback>
      <View style={localstyles.interactions_row}>
        <TouchableOpacity>
          <Foundation style={localstyles.interaction} name="comment" size={48} color="black" />
        </TouchableOpacity>
        <Text>{liked}</Text>
        <TouchableOpacity onPress={toggleLiked}>
          <Foundation style={localstyles.interaction} name="heart" size={48} color={liked ? 'red' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostComponent;