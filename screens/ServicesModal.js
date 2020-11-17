import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TextInput,
  Image,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import Box from './Box'
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/actions/services';
const ModalPop = props => {
  const serv = useSelector(state => state.services.services)
  const loading = useSelector(state => state.services.loading)
  const [services, setservices] = useState([])
  const [filterServices,setfilterServices] = useState([])
 
  const dispatch = useDispatch()
   
  useEffect(() => {
    dispatch(fetchServices())
    setservices(serv)
    setfilterServices(serv)
  }, [])
 
  const ReloadServices = ()=>{
    dispatch(fetchServices())
  }
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
        
          {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#3498DB" /></View> 
          :  <FlatList data={serv}   renderItem={itemData => (
            <Box src={itemData.item} func={props.selectFunc} key={itemData.item.name} />
      )}
      keyExtractor={(item, index) => 'key' + index} numColumns={3} showsVerticalScrollIndicator={false} />}  
     
            
          
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
