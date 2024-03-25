import React, {useState} from 'react';
import { Input } from "react-native-elements";
import {useSchedule} from "../../../hooks/useSchedule";
import { useAuth } from '../../../hooks/useAuth';
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
const CreateEditScheduleModal = ({ modalVisible, setModalVisible }) => {
    const WIDTH = Dimensions.get("window").width - 80;
    const HEIGHT = Dimensions.get("window").height - 660;
    const { addSchedule } = useSchedule();
    const { auth } = useAuth();
    const [name, setName] = useState("");
    const handleCreateSchedule = () => {
        const schedule = {
            name: name,
            userId: auth.userId,
        };
        addSchedule(schedule);
        setName("");
        setModalVisible(!modalVisible);
    };
    return (
        <TouchableOpacity
          disabled={true}
          style={{
            ...styles.containerModal,
            backgroundColor: modalVisible ? "rgba(0,0,0,0.4)" : "transparent", // Cambia el fondo a oscuro cuando el modal está abierto
          }}
        >
          <View style={{  ...styles.modal, width: WIDTH,  height: HEIGHT}}>
            <View style={styles.modalHeader}>
            <Text style={{fontSize: 20, color: "white"}}>Crear Horario</Text>
            <TouchableOpacity onPress={()=> {setModalVisible(!modalVisible)}} style={styles.closeModal}>
            <Icon name="close" size={25} color="white" style={{}} />
          </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
            <Input
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={(event) => setName(event.nativeEvent.text)}
              placeholderTextColor={"black"}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{
                color: "black",
                borderBottomWidth: 2,
                borderBottomColor: "#00000066",
              }}
            />
            <TouchableOpacity
              onPress={handleCreateSchedule}
              style={{
               //alinear el boton a la derecha 
                alignSelf: "flex-end",
               
              }}
            >
              <Text
                style={{
                  color: "#8FC1A9",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginRight: 20,
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
            </ScrollView>
            
          </View>
        </TouchableOpacity>
    );
}
export default CreateEditScheduleModal;
const styles = StyleSheet.create({
    containerModal: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      paddingTop: 0,
      backgroundColor: "white",
      borderRadius: 24,
    },
    modalHeader: {
      alignItems: "flex-start",
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: "#769ECB",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    modalBody: {
      width: "100%",
      flexDirection: "column",
      padding: 15,
      flex: 1,
    },
    closeModal: {
      position: "absolute",
      top: 10,
      right: 15,
    },
  });
  