import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ProductItem = ({item}) => {
  return (
    <Pressable style ={{marginHorizontal:20,marginVertical:25}}>
        <Image style={{width:150,height:150,resizeMode:"contain"}} source={{uri:item?.image}}/>

        <Text numberOfLines={1}style={{width:150,marginal:10}}>{item?.title}</Text>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})