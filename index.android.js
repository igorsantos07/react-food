/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, ToastAndroid, ToolbarAndroid } from 'react-native'
import nativeImageSource from 'nativeImageSource'

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
    return () => {
      ToastAndroid.show(`A notification will buzz in ${time}!`, ToastAndroid.SHORT)
    }
  }

  render() {
    return (
      <View style={s.root}>
        <ToolbarAndroid style={s.toolbar} logo={require('./img/logo.png')}
                        title="ReactFood" subtitle="Don't forget to eat, stupid!"/>
        <View style={s.container}>
          <Text style={s.instructions}>I have just eaten. Warn me again in...</Text>
          <View style={s.buttons}>
            {ReactFood.alarmOptions.map(time => (
              <Button style={s.button} key={time} title={time} onPress={this.setAlarm(time)}/>
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
    backgroundColor: 'darkgray'
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
