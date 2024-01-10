import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import { Button, Icon, Input } from 'react-native-elements'
import NavFavorites from './NavFavorites'


const NavigateCard = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const destination = useSelector(selectDestination)

    const [currentDestination, setCurrentDestination] = useState({location:null})

    const DimissKeyboard = ({ children }) => {
        <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    }

    const setLocation = (newText) => {

        const currentInput = newText.split(',')

        if (currentInput.length == 2) {
            setCurrentDestination({
                location: {
                    latitude: parseFloat(currentInput[0]),
                    longtitude: parseFloat(currentInput[1])
                }
            })
        }
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, Javokhirbek!</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
            {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
                <View>
                    <TextInput
                        placeholder='Where to?'
                        style={tw`bg-white p-3 border-2 border-gray-200 mx-5 rounded-full mt-2`}
                        onChangeText={newText => setLocation(newText)}
                    />
                    <TouchableOpacity
                    disabled={!currentDestination.location}
                        style={tw`${currentDestination.location ? 'bg-green-500': 'bg-gray-500'} pt-2 mx-5 rounded-full mt-3`}
                        onPress={() => {
                            dispatch(setDestination({
                                longtitude: currentDestination.longtitude,
                                latitude: currentDestination.latitude
                            }))
                            navigation.navigate('RideOptionsCard')
                        }}
                        >
                        <Text style={tw`text-center text-gray-100 font-extrabold pb-3`}>Ride</Text>
                    </TouchableOpacity>
                    {/* <GooglePlacesAutocomplete 
                        placeholder='Where to?'
                        styles={toInputBoxStyles}
                        enablePoweredByContainer={false}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            
                            navigation.navigate('RideOptionsCard');
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                    /> */}
                </View>


            {/* </TouchableWithoutFeedback> */}
            <NavFavorites />
        </View>

        <View style={tw`flex-row bg-white  justify-evenly py-2 mt-auto border-t border-gray-100`}>
            
            <TouchableOpacity 
                style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                onPress={() => navigation.navigate('RideOptionsCard')}
            >
                <Icon name='car' type='font-awesome' color='white' size={16} />
                <Text style={tw`text-white text-center`}>Rides</Text>
            </TouchableOpacity>

            <TouchableOpacity style={tw`flex flex-row justify-between border border-gray-200 w-24 px-4 py-3 rounded-full`}>
                <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
                <Text style={tw`text-center`}>Eats</Text>
            </TouchableOpacity>

        </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})