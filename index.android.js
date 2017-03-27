/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, ToastAndroid, ToolbarAndroid } from 'react-native'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  popInitialNotification: false,

  onRegister(token) {
    console.log( 'TOKEN:', token );
  },

  onNotification(notif) {
    ToastAndroid.show(`Yey, got this!\n${notif.message}`, ToastAndroid.SHORT)
  }
})

const MINUTE = 60 * 1000
const HOUR = MINUTE * 60

class ReactFood extends Component {

  static alarmOptions = [
    ['2:00', 2],
    ['2:30', 2.5],
    ['3:00', 3],
    ['3:30', 3.5],
  ]

  constructor(props) {
    super(props)
    this.setAlarm = this.setAlarm.bind(this)
  }

  setAlarm(hours) {
    return () => {
      PushNotification.localNotificationSchedule({
        title: 'Food time',
        message: 'It\'s time to stop what you\'re doing and have some food.',
        date: new Date(Date.now() + hours * HOUR)
      })
      ToastAndroid.show(`A notification will buzz in ${hours}h!`, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <View style={s.root}>
        <ToolbarAndroid style={s.toolbar} logo={require('./img/logo.144.png')} title="ReactFood" subtitle="Don't forget to eat, stupid!"/>
        <View style={s.container}>
          <Text style={s.instructions}>I have just eaten.{'\n'}Warn me again in...</Text>
          <View style={s.buttons}>
            {ReactFood.alarmOptions.map(([label, hours]) => (
              <Button style={s.button} key={hours} title={label} onPress={this.setAlarm(hours)}/>
            ))}
          </View>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    height: 56,
    backgroundColor: 'darkgray',
    justifyContent: 'flex-start'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-around'
  },
  button: {
    margin: 5
  }
})

AppRegistry.registerComponent('ReactFood', () => ReactFood)
