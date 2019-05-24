import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  H6,
  View,
  List,
  ListItem,
} from "native-base";
import { StyleSheet, Image } from 'react-native';
import authActions from '../redux/auth/actions';
import co6s from '../Config/co6s';
import Utility from '../Services/Utility';

const bursarImg = './../Assets/Images/Bursar.png';

class CircleDetailScreen extends React.Component {
    /*static navigationOptions = {
      //title: 'Welcome to the app!',
      drawerLabel: 'Home',
      drawerIcon: () => (
        <Image
          source={require(bursarImg)}
          style={[styles.icon]}
        />
      ),
    };*/
    constructor(props) {
      super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="ios-arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Circle Detail</Title>
            </Body>
            <Right />
          </Header>
        )
      });

    componentDidMount() {
      //this.props.getCircleMembers();
    }
  
    render() {
      const members = this.props.navigation.getParam('members', []);
      const geopoints = this.props.navigation.getParam('geopoints');
      const name = this.props.navigation.getParam('name')
      return (
        <Container>
        <Header info>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MyCircles')}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{name}</Title>
          </Body>
          <Right>
            <Icon color="#fff" onPress={() => this.props.navigation.navigate('CircleGeofence', {geopoints, name})} name="eye" />
            </Right>
        </Header>
        <Content padder>
            
            {members.length > 0?
            <View>
                <Card>
                    <CardItem header>
                        <Text style={{ color: 'grey' }}>Members</Text>
                    </CardItem>
                    <List>
                    {
                        members.map( (item, i) =>
                            <ListItem button onPress={() => {}} key={i}>
                                <Icon name="ios-person" />
                                <Body><Text>{Utility.isset(item.member)? item.member.firstname: ''}</Text></Body>
                                <Right><Icon name="ios-arrow-forward"></Icon></Right>
                            </ListItem>
                        )
                    }
                    </List>
                </Card>
                <Card>
                    <CardItem header>
                        <Text style={{ color: 'grey' }}>Action</Text>
                    </CardItem>
                    <CardItem>
                        <Button
                            onPress={() => this.props.navigation.navigate('CircleGeofence', {geopoints, name})}
                            >
                            <Icon color="#fff" name="eye"/>
                            <Text>View map</Text>
                        </Button>
                    </CardItem>
                    <CardItem>
                     <Button
                            onPress={() => alert("Coming soon")}
                            >
                            <Icon color="#fff" name="eye"/>
                            <Text>Central user Lat/Lng</Text>
                        </Button>
                    </CardItem>
                </Card>
            </View>
            :
                <Card>
                    <CardItem>
                        <Text>No Circle Members found!</Text>
                    </CardItem>
                </Card>
            }
        </Content>
      </Container>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.signin({}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircleDetailScreen);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    flexGrow: 1,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
  