import React, {useEffect, useState} from "react";
import {Alert } from "react-native";
import { useSchedule } from "../../../hooks/useSchedule";
const DeleteMessageSchedule = ({open, close, setSucessAlert}) => {
    const { deleteSchedule, currentSchedule } = useSchedule();
    const mostrarAlerta = () => {
        Alert.alert(
            "Confirmación",
            "¿Desea eliminar el horario?",
            [
                {
                    text: "SI",
                    onPress: () => {
                        deleteSchedule(currentSchedule);
                        setSucessAlert("eliminado");
                        close(!open);
                    },
                },
                {
                    text: "NO",
                    onPress: () => {
                        close(!open);
                    },
                },
            ]
        );
    };
useEffect(() => {
    if (open) {
        mostrarAlerta();
    }
}, [open]);

};
export default DeleteMessageSchedule;