import React from 'react'
import { View, Text } from 'react-native'

const WeekView = ({event}) => {
  return (
    <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }}>
        <Text style={{
            textAlign: "center"
        }}>
            {event.title.charAt(0)}
        </Text>
    </View>
  )
}

export default WeekView