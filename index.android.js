/** @flow */

import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, ToastAndroid, ToolbarAndroid } from 'react-native'
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  requestPermissions: true,
  onNotification(notif) {
    ToastAndroid.show(`Yey, you got this!\n${notif.message}`, ToastAndroid.SHORT)
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
      const title = 'Food time'
      const message = "It's time to stop what you're doing and have some food."
      if (hours) {
        const date = new Date(Date.now() + hours * HOUR)
        const notif = "A notification will buzz " + (__DEV__? `at ${date}` : `in ${hours} hours!`)
        PushNotification.localNotificationSchedule({ title, message, date })
        ToastAndroid.show(notif, ToastAndroid.SHORT)
      } else {
        PushNotification.localNotification({ title, message })
        ToastAndroid.show(`You should be notified... now!`, ToastAndroid.SHORT)
      }
    }
  }

  render() {
    const debugButtons = __DEV__?
      <View style={s.buttons}>
        <Button style={s.button} color="red" title="-= Now =-" onPress={this.setAlarm(0)}/>
        <Button style={s.button} color="red" title="-= Soon =-" onPress={this.setAlarm(0.001)}/>
      </View> : null

    return (
      <View style={s.root}>
        <ToolbarAndroid style={s.toolbar} logo={require('./img/logo.144.png')}
                        title="ReactFood" subtitle="Don't forget to eat!"/>
        <View style={s.container}>
          <Text style={s.instructions}>I have just eaten.{'\n'}Warn me again in...</Text>
          {debugButtons}

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
