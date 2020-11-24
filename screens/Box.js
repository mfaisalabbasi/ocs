import React from 'react'
import {Text,Image,View,TouchableNativeFeedback, StyleSheet,Dimensions} from 'react-native'
const Box = ({src,func}) => {
    return (
       
        <TouchableNativeFeedback
      onPress={() => func(src.name)}
      >
      
      <View style={styles.item}>
        <View style={styles.icon2}>
        <Image
    source={src.icon}
    
    style={styles.img}
  />
        </View>
        <View style={styles.title}>
           <Text style={styles.titTxt}>{src.name}</Text>
         
          
           <Text style={styles.smTxt}>
          {src.name}'s just click away
          </Text> 
        </View>
      
      </View>
    </TouchableNativeFeedback>
 
   
    )
}

const styles = StyleSheet.create({
    
    
    item: {
        width: Dimensions.get('screen').width/3.4,
        height: 115,
        margin: 5,
        elevation: 1.2,
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
      },
      img:{ flex: 1,
        resizeMode: 'cover',
        width: '90%',
        height: 100,
        borderRadius: 5},
      icon2: {
        width: '100%',
        height:'50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:2
        
      },
      title: {
        width: '100%',
        height:'50%',
        alignItems: 'center',
     
       },
      titTxt: {
        fontFamily: 'ebrima',
        fontWeight: 'bold',
        color: '#2257A9',
        fontSize:12,
        padding:2
       },
      smTxt: {
        fontFamily: 'ebrima',
        fontSize: 10,
        paddingHorizontal: 3,
        color: 'gray',
      },
})
export default Box
