import React, { useEffect, useState } from "react";

import { 
  View, 
  Text,
  StyleSheet
} from "react-native";
import { ProgressBar } from "react-native-paper";

import { calculatePercentage } from "../../helpers/CalculatePercentage";
    
const EventListItem = ({item}) => {
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState("#64B149");
    
    const calculatePercentageColor = () => {
        const percentageColorObject = calculatePercentage(item.date);
        setProgress(percentageColorObject.percentage);
        setColor(percentageColorObject.color)
    }

    useEffect(() => {
        calculatePercentageColor()
    }, [])

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                gap: 10
            }}>
                <ProgressBar 
                    progress={progress} 
                    color={color}
                    style={{ 
                    height: 10,
                    borderRadius: 10
                    }} />
                <Text style={{fontSize: 15}}>{item.name}</Text>
            </View>
            
            <Text style={{
                flex: 1, 
                textAlign: "center",
                fontSize: 13
                }}>
                {item.initialHourText} - {item.finalHourText}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAF3DD", 
        padding: 20, 
        margin: 10,
        borderRadius: 10, 
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5
    }
})

export default EventListItem;