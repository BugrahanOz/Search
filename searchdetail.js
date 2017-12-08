import React,{Component} from 'react';
import {TouchableOpacity,View,Text,StyleSheet,TextInput,ListView,ActivityIndicator,Dimensions,Alert,Image,ScrollView} from 'react-native';
import axios from 'axios';
var ls = require('react-native-local-storage');
const search=require('Project/images/search.png');
const icon = require('Project/images/icon.png');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
export default class searchdetail extends Component
{

  static navigationOptions = {
      headerTitle:<Image source={icon} style={{alignSelf:'center'}}/>
  }
  constructor(props) {
	    super(props);
			this.state = {
				isLoading: true,
        search:'',
			};
			  }

  componentDidMount(){
    var url = 'url=';
      axios.get(url)
      .then(response =>this.onResponse(response.data));
  }

  onResponse(rdata){
    this.setState({
      isLoading:false,
      veri:rdata.gelen
    });
  }


  searchData(search) {
    this.setState({search});
    var url = 'url='+search;
    axios.get(url).then(response => this.onResponse(response.data));
}


kontrol(){
  const{navigate}=this.props.navigation;
try{
  if(this.state.search.length <= 3)
  {
    return null;
  }
  else {
    return  this.state.veri.map((userData,val,val2,val3,val4) => {
      return <TouchableOpacity key={val} onPress={()=>ls.save('recipe_id',userData.recipe_id) .then(()=>{navigate('Detail',{'sdetail': userData.recipe_id})})}>
        <View key={val2} style={{width:width,height:height/2}}>
        <Image key={val3} source={{uri:userData.Image}} style={{width:width,height:height/2-30}}/>
        <Text key={val4} style={{textAlign:'center',fontWeight:'bold',backgroundColor:'#b30000',color:'white'}}>{userData.title}</Text>
        </View>
      </TouchableOpacity>
      });
  }
}
  catch(err)
  {
    Alert.alert( 'HATA', 'Wrong Search !', [
    {text: 'Close', style: 'cancel'},
    {text: 'OK', onPress: () => this.textInput.clear()}, ], { cancelable: false } )
  }

}


  render()
  {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return(
        <View style={styles.container}>
<View>
        <View style={{alignItems:'center',marginTop:5,}}>
        <TextInput
          style={{height: 40,borderWidth: 1,width:width-40,borderRadius:5,borderColor:'white',backgroundColor:'white',paddingLeft:40}}
          onChangeText = {(search) => this.searchData(search)}
          placeholder="SEARCH!"
          underlineColorAndroid='transparent'
          ref={input=>{this.textInput=input}}>
        </TextInput>
        </View>
        <Image source={search} style={{height:20,width:20,marginLeft:30,marginTop:-30}}/>
</View>

        <ScrollView style={{marginTop:15}}>{this.kontrol()}</ScrollView>
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
  }
});
