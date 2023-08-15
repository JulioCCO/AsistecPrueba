import { 
    View, 
    Text,
    TouchableOpacity,
    TextInput
  } from "react-native";
  import React,{ useState, useEffect } from "react";
  import { ProgressBar } from 'react-native-paper';
  import Ionicons from "react-native-vector-icons/Ionicons";
  import moment from 'moment';
  import { calculatePercentage } from '../../helpers/CalculatePercentage';
  
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
      const [progress, setProgress] = useState(0);
      const [color, setColor] = useState("#64B149");
      const [itemName, setItemName] = useState(itemInfo.name);
      const [itemDescription, setItemDescription] = useState(itemInfo.description);
      const [itemInitialHourText, setItemInitialHourText] = useState(itemInfo.initialHourText);
      const [itemFinalHourText, setItemFinalHourText] = useState(itemInfo.finalHourText);
      
  
      const calculatePercentageColor = () => {
          const percentageColorObject = calculatePercentage(itemInfo.date);
          setProgress(percentageColorObject.percentage);
          setColor(percentageColorObject.color)
      }
  
      useEffect(() => {
          calculatePercentageColor()
          setItemName(itemInfo.name);
          setItemDescription(itemInfo.description);
          setItemInitialHourText(itemInfo.initialHourText);
          setItemFinalHourText(itemInfo.finalHourText);
      }, [itemInfo])
  
      const day = moment(selectedDayEvents).format('ddd')
  
  
      const handleEditEvent = () => {
          setSelectedEvent(itemInfo);
          changeModalVisible();
      }
  
      return (
          <>
              <View style={{
                  paddingHorizontal: 20, 
                  marginHorizontal: 5,
                  marginVertical: 20,
                  borderRadius: 10, 
                  flexDirection: "row", 
                  justifyContent: "space-between",
                  alignItems: "center"
              }}>
                  <View style={{
                      flex: 1,
                      flexDirection: 'row'
                  }}>
                      <View>
                          <Text style={{
                              fontSize: 15, 
                              textAlign: "center",
                              color: "#8FC1A9"
                          }}>
                              {spanishWeekDays[day]}
                          </Text>        
                          <View style={{
                              backgroundColor: "#8FC1A9",
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              justifyContent: "center",
                              alignItems: "center",                    
                          }}>
                              <Text style={{
                                  textAlign: "center",
                                  fontSize: 20,
                                  color: "white"
                              }}>
                                  {moment(selectedDayEvents).date()}
                              </Text>
                          </View>
          
                      </View>
  
                      <View style={{
                          flex: 1,
                          marginLeft: 20,
                          gap: 10,
                          justifyContent: "center",
                          maxWidth: "60%"
                      }}>
                          <ProgressBar 
                              progress={progress} 
                              color={color}
                              style={{ 
                                  height: 10,
                                  borderRadius: 10,
                                  maxWidth: "100%"
                          }} 
                          />
                          <Text style={{fontWeight: "600", fontSize: 15, alignSelf: "flex-start"}}>{itemName}</Text>
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
                      <Text>Hora inicial: {itemInitialHourText}</Text>
                      <Text>Hora final: {itemFinalHourText}</Text>
                  </View>
                          <Text style={{color: "#5B83B0", marginTop: 10, marginBottom: 3}}>Descripción</Text>
                          <TextInput
                              editable={false}
                              multiline
                              numberOfLines={4}
                              value={itemDescription}
                              style={{
                                  borderColor: "#00000066",
                                  borderRadius: 5,
                                  padding: 8,
                                  textAlignVertical: "top",
                                  backgroundColor: "#FAF3DD"
                              }}
                          />
              </View>
          </>
      );
    };
  export default EventItem;