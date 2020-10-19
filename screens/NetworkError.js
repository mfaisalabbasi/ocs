import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
const NetworkError = () => {
    return (
        <View style={styles.screen}>
           <Text style={styles.txt}>Check Your Internet Connection</Text> 
        </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        width:'100%',
        height:30,
        backgroundColor:'#C90000',
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        color:'#FFFFFF',
        fontFamily:'ebrima',
        fontSize:12
       
    }
})
export default NetworkError
