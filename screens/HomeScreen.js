import { Image, SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice'
import * as Location from 'expo-location';
import NavFavorites from '../components/NavFavorites'


const HomeScreen = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Please grant location permissions');
        return
      } else { 
        let currentLocation = await Location.getCurrentPositionAsync({});
        dispatch(setOrigin({location:currentLocation}))
      }
    };
    getPermissions();
  },[])

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
            style={{
                width: 100, height: 100, resizeMode: 'contain',
            }}
            source={{
                url:'https://links.papareact.com/gzs',
            }}
        />

        <GooglePlacesAutocomplete 
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            }
          }}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          debounce={400}
        />

        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'blue',
    }
})