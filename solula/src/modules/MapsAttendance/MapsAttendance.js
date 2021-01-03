import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -6.2450692;
const LONGITUDE = 106.8593;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class MapsAttendance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {},
      markers: [],
      datalabel : '',
      isLoading : true
    };

  }

  componentDidMount(){
    const { params } = this.props.navigation.state
      
    this.state.region.latitude = parseFloat(params.latitude)
    this.state.region.longitude = parseFloat(params.longitude)
    this.state.region.latitudeDelta = LATITUDE_DELTA
    this.state.region.longitudeDelta = LONGITUDE_DELTA

    console.log(this.state.region)
    let dataMarker =  {
        color: params.type == 'hadir' ? 'green' : 'red',
        coordinate: {
            latitude : parseFloat(params.latitude),
            longitude : parseFloat(params.longitude)
        },
        key: 0,
    }

    this.state.markers.push(dataMarker)

    console.log(this.state.markers)

    this.setState({
        datalabel : params.type == 'hadir' ? 'Your check in location' : 'Your check out location',
        isLoading : false
    })
  }

  render() {
    if(this.state.isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
        
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          // onPress={e => this.onMapPress(e)}

        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <View
            // onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>{this.state.datalabel}</Text>
          </View>
        </View>
      </View>
    );
  }
}

MapsAttendance.navigationOptions = ({navigation}) => ({
  title : 'Maps Attendance',
  headerBackTitle: null,
  header : (props) => {
    return(
      <View style={{height:50, flexDirection:'row'}} >
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity style={{justifyContent:'center'}} onPress={() => navigation.goBack()}>
          <View style={{justifyContent:'center', marginLeft:10}}>
            <MaterialIcons 
              style={{backgroundColor : 'transparent'}} 
              name={"close"}
              color={"#898A8F"}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{justifyContent:'center', marginLeft:10}}>
        <Text style={{color:'#2180D9', fontSize:18, fontWeight:'bold'}}>{props.scene.descriptor.options.title}</Text>
      </View>
    </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default MapsAttendance;