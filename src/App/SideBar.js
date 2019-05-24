import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  View,
  H4,
} from "native-base";
import authActions from "../redux/auth/actions";
const routes = [
    { label: "Dashboard", icon: 'md-calendar', route: 'Home'}, 
    { label: "My Location", icon: 'ios-recording', 'route': 'MyLocation'},
    { label: "Circle of Six", icon: 'ios-notifications', route: 'MyCircles'},
    // { label: "CircleGeofence", icon: 'ios-cloud-outline', route: "CircleGeofence"},
    //{ label: "Find a member", icon: 'paper'},
    { label: "Help", icon: 'paper', route: 'Help'},
    { label: "Logout", icon: 'clock', route: 'Logout'}
];
const bursarImg = './../Assets/Images/bursar-white.png';

class SideBar extends React.Component {
  handleLogout = () => {
    this.props.logout();
    this.props.navigation.navigate('SignIn');
  }
  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              height: 100,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute",
              backgroundColor: "#5b696c",
            }}
          />
          <Text style={{color: 'white', fontSize: 20, display: 'flex', margin: 20, textAlign: 'center'}}>E-Public Safety</Text>
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 100 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => {
                    if(data.label === "Logout") {
                      this.handleLogout();
                    } else {
                      this.props.navigation.navigate(data.route)
                    }
                  }
                }
                >
                    <Icon active name={data.icon} />
                    <Text style={{marginLeft: 12,}}>{data.label}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.handleLogout());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);