
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import GeoFencing from 'react-native-geo-fencing';
import MapView, { Polygon, Marker, ProviderPropType } from 'react-native-maps';
import { Container, Header, Icon, Button, Left, Body, Right, Title, Subtitle } from 'native-base';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

class CircleGeofence extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <Button transparent onPress={() => navigation.navigate('Home')}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>My GeoFence</Title>
            </Body>
            <Right />
          </Header>
        )
      });
    constructor(props) {
        super(props);

        this.state = {
            geofence: false,
            track: {
                latitude: 3.1336599385978805,
                longitude: 6.31866455078125,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
                latitude: 3.1336599385978805, longitude: 6.31866455078125,
            },
            polygon: [
                { lat: 3.1336599385978805, lng: 6.31866455078125 },
                { lat: 3.3091633559540123, lng: 6.66198730468757 },
                { lat: 3.091150714460597,  lng: 6.92977905273438 },
                { lat: 2.7222113428196213, lng: 6.74850463867188 },
                { lat: 2.7153526167685347, lng: 6.47933959960938 },
                { lat: 3.1336599385978805, lng: 6.31866455078125 }
            ],
            coordinates: [
                { latitude: 3.1336599385978805, longitude: 6.31866455078125 },
                { latitude: 3.3091633559540123, longitude: 6.66198730468757 },
                { latitude: 3.091150714460597,  longitude: 6.92977905273438 },
                { latitude: 3.1336599385978805, longitude: 6.31866455078125 }
            ]
        };
    }

    checkUser = async () => {
        
        // let track = {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //     latitudeDelta: LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA,
        // }

        // let point = {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // };

        // let coordinate = {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude
        // }
        let point = this.state.point
        let polygon = this.state.polygon
        
        // this.setState({coordinate})
        
        GeoFencing.containsLocation(point, polygon)
        .then(() => alert('user is within geofence'))
        .catch(() => alert('user is NOT within geofence')) 
    }


    showGeofence = async () => {
        const geopoints = this.props.navigation.getParam('geopoints');
        console.log(geopoints);

        const coordinates = []
        for (var x = 0; x < geopoints.length; x++){
            let lat = geopoints[x]['latitude']
            let lng = geopoints[x]['longitude']
            coordinates.push({latitude: lat, longitude: lng})
        }

        let lat = geopoints[0]['latitude']
        let lng = geopoints[0]['longitude']
        coordinates.push({latitude: lat, longitude: lng})

        const track = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        const point = {
            lat: lat, lng: lng
        }

        this.setState({coordinates, track, point})
    }

    async componentDidMount() {
        const geopoints = this.props.navigation.getParam('geopoints');
        console.log(geopoints);

        const coordinates = []
        const polygon = []
        for (var x = 0; x < geopoints.length; x++){
            let lat = geopoints[x]['latitude']
            let lng = geopoints[x]['longitude']
            coordinates.push({latitude: lat, longitude: lng})
            polygon.push({lat: lat, lng: lng})
        }
        let lat = geopoints[0]['latitude']
        let lng = geopoints[0]['longitude']
        coordinates.push({latitude: lat, longitude: lng})
        polygon.push({lat: lat, lng: lng})

        const track = {
            latitude: geopoints[0]['latitude'],
            longitude: geopoints[0]['longitude'],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }

        this.setState({coordinates, track, lng, polygon})
    }

    render() {
        const name = this.props.navigation.getParam('name', "Unknown")
        const {navigation} = this.props
        return (
            
            <Container >
                <Header transparent hasSubtitle>
                    <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    </Left>
                    <Body>
                        <Title>{name}</Title>
                        <Subtitle style={{color: "white"}}>GeoFence and Position</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View styles={styles.container}>
                <MapView
                    provider={'google'}
                    style={styles.map}
                    region={this.state.track}
                    showsMyLocationButton={true}
                    onPress={(e) => {
                        let position = e.nativeEvent.coordinate
                        let point = {
                            lat: position.latitude,
                            lng: position.longitude
                        };
                        this.setState({point, coordinate: position, track: {...position, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}})
                    }}
                >
                    <Polygon
                        coordinates={this.state.coordinates}
                        strokeColor="#000"
                        strokeWidth={6}
                    />
                    <Marker
                        coordinate={this.state.coordinate}
                        pinColor={randomColor()}
                        title={'user0'}
                    />
                </MapView>
                </View>
                <View style={styles.buttonContainer}>
                
                    <Button
                        onPress={() => this.showGeofence()}
                        style={styles.bubble}
                    >
                        <Text style={styles.button}>Show Geofence</Text>
                    </Button>

                    <Button
                        onPress={() => this.checkUser()}
                        style={styles.bubble}
                    >
                        <Text style={styles.button}>Check if user in Geofence</Text>
                    </Button>
                </View>


            </Container>
        )
    }
}

CircleGeofence.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: height
    },
    mapView: {
        borderBottomColor: 'red',
        borderRadius: 50,
    },
    bubble: {
        backgroundColor: '#5b696c',
        marginVertical: 5,
    },
    button: {
        color: 'white',
        paddingHorizontal: 12,
        marginHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: 'white'
    },
});

export default CircleGeofence;