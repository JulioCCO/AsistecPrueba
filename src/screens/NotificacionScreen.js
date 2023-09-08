import React from "react";

import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity ,
    StyleSheet
} from "react-native";
import { ProgressBar } from "react-native-paper";

import moment from "moment";

import { calculatePercentage } from "../helpers/CalculatePercentage";
import useData from "../hooks/useData";


const NotificationScreen = () => {
    
    const { notifications } = useData();

    return (
        <View style={{backgroundColor: "#FFFFFF", height: "100%"}}>
            <FlatList
                data={notifications}
                renderItem={({ item }) => {
                
                // Calculate the percentage of the day that has elapsed since the start of the event
                const {percentage, color} = calculatePercentage(item["date"]);
                
                return <View style={styles.listContainer}>
                    <View>
                        {/* Display the abbreviated weekday name in Spanish */}
                        <Text style={styles.dayText}>
                            {moment(item.date).format("ddd")}
                        </Text>

                        {/* Display the day of the month */}
                        <View style={styles.dayNumber}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 20,
                                color: "white"
                            }}>
                                {moment(item.date).date()}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.NotificationContainer}>
                        <TouchableOpacity 
                            key={item["id"]}
                            style={{
                                marginVertical: 5,
                                width: "70%"
                            }}
                        >
                            {/* Display a progress bar showing the percentage of the day that has elapsed */}
                            <ProgressBar 
                                progress={percentage} 
                                color={color}
                                style={styles.progressBar}
                            />

                            {/* Display the name of the event */}
                            <Text style={{fontSize: 15, marginBottom: 5}}>{item["name"]}</Text>

                            <Text style={{fontSize: 12, color: "#5B83B0"}}>Ver mas</Text>

                        </TouchableOpacity>
                        
                    </View>
                        
                </View>
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

// These are all the styles of this screen
const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: "row"
    },

    dayText: {
        fontSize: 15, 
        textAlign: "center",
        color: "#8FC1A9"
    },

    dayNumber: {
        backgroundColor: "#8FC1A9",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",                    
    },

    NotificationContainer: {
        gap: 10,
        marginLeft: 10,
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1,
    },

    progressBar: { 
        height: 10,
        borderRadius: 10,
        backgroundColor: "#F3F3F3",
        marginBottom: 5
    }
});

export default NotificationScreen;