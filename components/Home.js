import React, { useEffect, useState } from 'react';
import {
  ScrollView, ActivityIndicator, RefreshControl, View, StyleSheet, Text
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import AppLoading from 'expo-app-loading';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { SimpleLineIcons } from '@expo/vector-icons';

import Styles from './Style';
import Header from './Header';
import FeedManager from './FeedManager'
import {Square} from './Card';

const localstyles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  taf: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex:1,
    paddingBottom: 500
  }
})

const HomeScreen = (props) => {
  let [fontsLoaded] = useFonts({
    WorkSans_500Medium,
  });
  
  const [ scrollPos, setScrollPos ] = useState(0);
  
  const HandleScroll = (event) => {
    setScrollPos(event.nativeEvent.contentOffset.y);
  }
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false); 
      (async () => {
        try {
          const res = await fetch('http://localhost:3000/posts');
          const json = await res.json();
          setData(json.posts);
          setDataReady(true);
        } catch (error) {
          console.log(error)
        }
      })()
    }, 1000)
  }, [refreshing]);
    
  const [ data, setData ] = useState([]);
  const [ dataReady, setDataReady ] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://f82f-8-6-144-183.ngrok.io/posts');
      const json = await res.json();
      setData(json.posts);
      setDataReady(true);
    })()
  }, [])

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={Styles.container}>
        <StatusBar style="dark" />
        <View>
          <Header nav={props.navigation} title="Feed" scrollPos={scrollPos}/>
          <KeyboardAwareScrollView onScroll={HandleScroll} scrollEventThrottle={5} refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            <View>
              <ScrollView horizontal alwaysBounceHorizontal={false} style={localstyles.cardContainer}>
                <Square value={30} label="Followers" backgroundColor={'#00E8FC'} />
                <Square value={44} label="Following" backgroundColor={'#F9C80E'} />
                <Square value={8} label="Notifications" backgroundColor={'#F71735'} />
              </ScrollView>
              {dataReady ? <FeedManager data={data} /> : <ActivityIndicator />}
            </View>
            <View style={localstyles.taf}>
              <View>
                <SimpleLineIcons name="check" size={65} color="green" />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
};

export default HomeScreen;