import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'


const Map = () => {
    
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
  
    return (
    <MapView 
        style={tw`flex-1`}
        mapType='mutedStandard'
        initialRegion={{
            latitude: origin.location.coords.latitude,
            longitude: origin.location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >

        {origin && destination && (
            <MapViewDirections 
                origin={origin.description}
                destination={destination.description}
            />
        )}

        {origin.location &&
        <Marker 
            coordinate={{
                latitude: origin.location.coords.latitude,
                longitude: origin.location.coords.longitude
            }}
            title='Home'
            description='This is my home'
            identifier='origin'
        />
        }


    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})