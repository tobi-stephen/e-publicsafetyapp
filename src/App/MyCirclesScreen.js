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
  Fab,
} from "native-base";
import { StyleSheet, Image, StatusBar,
} from 'react-native';
import authActions from '../redux/auth/actions';
import co6s from '../Config/co6s';
import Utility from '../Services/Utility';

const bursarImg = './../Assets/Images/Bursar.png';

class MyCirclesScreen extends React.Component {
    static navigationOptions = {
      //title: 'Welcome to the app!',
      drawerLabel: 'Home',
      drawerIcon: () => (
        <Image
          source={require(bursarImg)}
          style={[styles.icon]}
        />
      ),
    };

    constructor(props) {
      super(props);

      this.state = {
        action: true,
      }
    }

    componentDidMount() {
      this.props.getCircles(this.props.access_token);
    }
  
    render() {
      const { co6ById } = this.props;
      console.log(co6ById)
      let co6s = [];
      for(let i in co6ById) {
        let co6 = co6ById[i];
        if(Utility.isset(co6)) {
          co6s.push(co6);
        }
      }
      return (
        <Container>
            <StatusBar hidden={true}/>
        <Header info>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Circles of Six</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
            {co6s.length > 0?
                <List>
                    {
                        co6s.map( (item, i) =>
                            <ListItem button key={i} onPress={() => this.props.navigation.navigate('CircleDetail', {name: item.name, id: item.id, co6_instance_id: item.co6_instance_id, members: item.members, geopoints: item.geopoints})}>
                                <Icon success name="ios-people" />
                                <Body><Text>{item.name}</Text></Body>
                                <Right><Icon name="ios-arrow-forward"></Icon></Right>
                            </ListItem>
                        )
                    }
                </List>:
                <Card>
                    <CardItem>
                        <Text>No Circle of Six found!</Text>
                    </CardItem>
                </Card>
            }
            
        </Content>
        <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.props.navigation.navigate('ChooseOrganization')}>
                <Icon name="add" />
              </Fab>
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
    access_token: state.auth.access_token,
    co6ById: state.auth.co6ById,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(authActions.signin({}));
    },
    getCircles: token => {
      dispatch(authActions.getCo6s(token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCirclesScreen);

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
  