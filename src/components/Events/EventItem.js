import React, { useMemo} from "react";

import { 
    View, 
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from "react-native";
import { ProgressBar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import moment from "moment";

import { calculatePercentage } from "../../helpers/CalculatePercentage";

const spanishWeekDays = {
    "Sun": "Dom",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mié",
    "Thu": "Jue",
    "Fri": "Vie",
    "Sat": "Sáb"
}
      
const EventItem = ({itemInfo, selectedDayEvents, changeModalVisible, setSelectedEvent}) => {
    const day = useMemo(() => moment(selectedDayEvents).format("ddd"), [
        selectedDayEvents,
    ]);

    const percentageColorObject = useMemo(() => calculatePercentage(itemInfo.date), [
    itemInfo.date,
    ]);

    const handleEditEvent = () => {
    setSelectedEvent(itemInfo);
    changeModalVisible();
    };
  
    return (
        <>

            <View style={styles.topContainer}>
                <View style={{
                    flex: 1,
                    flexDirection: "row"
                }}>
                    {/* Item date */}
                    <View>
                        <Text style={styles.dateText}>
                            {spanishWeekDays[day]}
                        </Text>        
                        <View style={styles.dateBackground}>
                            <Text style={styles.dateNumber}>
                                {moment(selectedDayEvents).date()}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.progressBarContainer}>
                        <ProgressBar 
                            progress={percentageColorObject.percentage} 
                            color={percentageColorObject.color}
                            style={styles.progressBar} 
                        />
                        <Text style={styles.name}>{itemInfo.name}</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={handleEditEvent}>
                    <Ionicons 
                        name="pencil" size={30} 
                        color="black"/>
                </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 20}}>
                <View style={{marginVertical: 10, gap: 5}}>
                    <Text>Hora inicial: {itemInfo.initialHourText}</Text>
                    <Text>Hora final: {itemInfo.finalHourText}</Text>
                </View>
                <Text style={styles.descriptionText}>Descripción</Text>
                <TextInput
                    editable={false}
                    multiline
                    numberOfLines={4}
                    value={itemInfo.description}
                    style={styles.descriptionInput}
                />
            </View>
        </>
      );
    };

const styles = StyleSheet.create({
    topContainer: {
        paddingHorizontal: 20, 
        marginHorizontal: 5,
        marginVertical: 20,
        borderRadius: 10, 
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
    },

    dateText: {
        fontSize: 15, 
        textAlign: "center",
        color: "#8FC1A9"
    },

    dateBackground: {
        backgroundColor: "#8FC1A9",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",                    
    },

    dateNumber: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },

    progressBarContainer: {
        flex: 1,
        marginLeft: 20,
        gap: 10,
        justifyContent: "center",
        maxWidth: "60%"
    },

    progressBar: { 
        height: 10,
        borderRadius: 10,
        maxWidth: "100%"
    },

    name: {
        fontWeight: "600", 
        fontSize: 15, 
        alignSelf: "flex-start"
    },

    descriptionText: {
        color: "#5B83B0", 
        marginTop: 10, 
        marginBottom: 3
    },

    descriptionInput: {
        borderColor: "#00000066",
        borderRadius: 5,
        padding: 8,
        textAlignVertical: "top",
        backgroundColor: "#FAF3DD"
    }

})

export default EventItem;