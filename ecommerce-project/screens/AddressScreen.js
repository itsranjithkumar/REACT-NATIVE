import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native'
import React from 'react'

const AddressScreen = () => {
  return (
    <ScrollView style={{marginTop:50}}>
        <View style={{height:50,backgroundColor:"#00CED1"}}/>


     <View style = {{padding:10}}>

        <Text style={{fontSize:17,fontWeight:"bold"}}>Add a new Address</Text>


        <TextInput placeholderTextColor={"Black "} placeholder='India' style={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5,}}/>

        <View style= {{marginVertical:10 }}>

         <Text style={{fontSize:15,fontWeight:"bold"}}>Full name (First and last name)</Text>

         <TextInput style ={{padding:10,borderColor:"#D0D0D0",borderWidth:1,marginTop:10,borderRadius:5,}}
         placeholder="enter your name"/>

        </View>
     </View>


    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})