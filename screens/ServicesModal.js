import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Box from './Box'
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/actions/services';
import { ScrollView } from 'react-native-gesture-handler';
import {servicesData} from './services'
const ModalPop = props => {
  const loading = useSelector(state => state.services.loading)
  const [services, setservices] = useState(servicesData)
  const [filterServices,setfilterServices] = useState(servicesData)
 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchServices())
    
  }, [])
 
  

const handleSearch = event =>{
 const filterData = filterServices.filter(item=>{
   return item.name.toLowerCase().includes(event.toLowerCase())
 })

 setservices(filterData)
}
  

  return (
    <Modal
      transparent={true}
      visible={props.visState}
      onRequestClose={props.setvisState}
      animationType="slide">
      <View style={styles.modelContainer}>
        <StatusBar backgroundColor="#2E8FD0" barStyle="light-content" />
        <View style={styles.model}>
          <View
            style={styles.header}>
            <View style={styles.outer}>
            <View style={styles.inner}>
            <Icon
            type="AntDesign"
            name="search1"
            color='#3498DB'
            size={20}
          />
          </View>
            <TextInput
            title='Search'
            placeholder='Type service here ...'
            placeholderTextColor='#3498DB'
            onChangeText={handleSearch}
            style={{width:'85%',paddingHorizontal:2,marginLeft:2}}
          />
        
            </View>
            
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:'100%', flexDirection:'row', flexWrap:'wrap'}}>
          {loading  ? <ActivityIndicator size="large" color="#3498DB"  style={{marginTop:Dimensions.get('window').height/2.6}}/>
          : services.map(item =><Box src={item} func={props.selectFunc} key={item.name}/>)
       }</ScrollView>
     
      
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,
    flexDirection: 'row',
  },
  model: {
    backgroundColor: '#F8F9F9',
    height: Dimensions.get('window').height,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    elevation: 2,
    justifyContent:'center',
    alignItems:'center'
    
  },
  header:{
    width: '100%',
    height: 75,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  img:{
    width: '90%',
    height:'40%',
    borderRadius: 50,
    marginVertical:5
  }, 
  inner:{
    width:'15%'
    ,height:'100%',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  outer:{width:'90%',
   flexDirection:'row',
   justifyContent:'space-around',
   alignItems:'center', 
   backgroundColor:'#ffffff', 
   height:'55%',
   borderRadius:50, 
   marginVertical:2,
   overflow:'hidden'}
  
  
});

export default ModalPop;
