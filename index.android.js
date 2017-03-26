/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

class ReactFood extends Component {

  static alarmOptions = [
    '2:00',
    '2:30',
    '3:00',
    '3:30'
  ]

  constructor(props) {
    super(props)
    this.setAlarm = this.setAlarm.bind(this)
  }

  setAlarm(time) {
    return () => time
  }

  render() {
    return (
      <View style={s.container}>
        <Text style={s.title}>React Food</Text>
        <Text style={s.instructions}>I have just eaten. Warn me again in...</Text>
        <View style={s.buttons}>
          {ReactFood.alarmOptions.map(time => (
            <Button style={s.button} key={time} title={time} onPress={this.setAlarm(time)}/>
          ))}
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
