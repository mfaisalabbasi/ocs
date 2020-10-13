import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TextInput,
  Image,
  StatusBar,
  FlatList
} from 'react-native';
import Box from './Box'
import Icon from 'react-native-vector-icons/AntDesign';
const ModalPop = props => {
  const [services, setservices] = useState([])
  const [filterServices,setfilterServices] = useState([])
  const fetchServices =  async () => {
    const req = await fetch(`https://on-click-s.firebaseio.com/services.json`)
    const res = await req.json()
    let loaded = [];
    const vl = Object.keys(res);
    vl.map(item => loaded.push(res[item]));
    setservices(loaded)
    setfilterServices(loaded)
  }
  useEffect(() => {
   
    fetchServices()
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
        <StatusBar backgroundColor="#34495E" barStyle="light-content" />
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
        
            <FlatList data={services}   renderItem={itemData => (
            <Box src={itemData.item} func={props.selectFunc} key={itemData.item.name} />
      )}
      keyExtractor={(item, index) => 'key' + index} numColumns={3} showsVerticalScrollIndicator={false} />
     
            
          
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
  outer:{width:'80%',
   flexDirection:'row',
   justifyContent:'space-around',
   alignItems:'center', 
   backgroundColor:'#FFFFFF', 
   height:'50%',
   borderRadius:20, 
   marginVertical:2,
   overflow:'hidden'}
  
  
});

export default ModalPop;
