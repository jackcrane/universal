import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

const localstyles = StyleSheet.create({
  cardBgParent:{
    width: '100%',
  },
  cardBg: {
    width: 30,
    height: 250,
    backgroundColor: '#5AD2F4',
  }
})

const ExtendedImage = (props) => {
  const [ wrapperWidth, setWrapperWidth ] = useState(0)
  const [ imageLoaded, setImageLoaded ] = useState(false)

  const [animation, setAnimation] = useState(new Animated.Value(0))

  const handleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue:1,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(animation, {
          toValue:0,
          duration: 1000,
          useNativeDriver: false
        })
      ]),
      {iterations: 10}
    ).start()
  }

  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["rgb(90,210,244)" , "rgb(224,82,99)"]
  })
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }

  useEffect(() => {
    handleAnimation()
  }, [])

  return (
    <View
      style={{ display: 'flex', flexDirection: 'row' }}
      onLayout={event => setWrapperWidth(event.nativeEvent.layout.width)}
    >
      <View>
        <AutoHeightImage
          width={wrapperWidth}
          source={{ uri: props.src }}
          maxHeight={600}
          onLoad={() => setImageLoaded(true)}
        />
      </View>
    </View>
  )
}

export default ExtendedImage