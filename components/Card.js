import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppLoading from 'expo-app-loading';

import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import Styles from './Style';

const localstyles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 15,
    shadowOpacity: .2,
    shadowRadius: 5,
    shadowOffset: { height: 6, width: 3 },
    marginRight: 10
  },
  cardinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 40,
    fontFamily: 'WorkSans_500Medium'
  },
  label: {
    fontSize: 17
  }
})

import { SimpleLineIcons } from '@expo/vector-icons';

const Square = (props) => {
  let [fontsLoaded] = useFonts({
    WorkSans_500Medium
  });

  const [ valueSize, setValueSize ] = useState(40);
  const [ value, setValue ] = useState(props.value);

  useEffect(() => {
    if(props.value.toString().length > 1 && props.value.toString().length <= 3) {
      setValueSize(31);
      setValue(props.value)
    } else if(props.value.toString().length > 3 && props.value.toString().length <= 6) {
      setValue((props.value / 1000).toFixed(1) + "k")
      setValueSize(31);
    } else if(props.value.toString().length > 6) {
      setValue((props.value / 1_000_000).toFixed(1) + "m")
      setValueSize(31);
    }
  }, [props.value])

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{...localstyles.card, backgroundColor: props.backgroundColor, shadowColor: props.backgroundColor}}>
        <TouchableOpacity>
          <View style={localstyles.cardinner}>
            <Text style={{...localstyles.value, fontSize: valueSize}}>{value}</Text>
            <Text style={localstyles.label}>{props.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports.Square = Square;