import { View } from 'react-native'
import React from 'react'
import AnalogClock from '../../components/AnalogClock'
import styles from './styles'
import useHome from './useHome'

const HomeScreen = () => {

  const { timeZone } = useHome()
  return (
    <View style={styles.container}>
      <AnalogClock timeZone={timeZone} />
    </View>
  )
}

export default HomeScreen