import { Dimensions } from "react-native";
import React, { useState } from "react";

import CourseModal from "../Schedule/CourseModal";
import ActivityModal from "../Schedule/ActivityModal";


const ModalControls = ({ changeModalVisible, listaComponents, setListaComponents, ultimoId, setUltimoId , ultimoIdRelacion, setUltimoIdRelacion, isModalVisible }) => {
    // Define state variables with their initial values
    const [activityType, setActivityType] = useState(1);
    const [modalityType, setModalityType] = useState("Presencial");

    const WIDTH = Dimensions.get("window").width - 80;
    const HEIGHT = Dimensions.get("window").height - 150;
    const DAYS_OF_WEEK = [
        { name: 'LUN', selected: false },
        { name: 'MAR', selected: false },
        { name: 'MIÉ', selected: false },
        { name: 'JUE', selected: false },
        { name: 'VIE', selected: false },
        { name: 'SÁB', selected: false },
        { name: 'DOM', selected: false }
    ];

    // Possible values for the activity type
    const activityTypeValues = [
        { key: 1, value: "Agregar Curso" },
        { key: 2, value: "Agregar Actividad" }
    ];

    // Possible values for the modality type
    const modalityValues = [
        { key: 1, value: "Presencial" },
        { key: 2, value: "Virtual" },
        { key: 3, value: "Semipresencial" }
    ];

    return (
        // Renders a CourseModal if activityType is 1, otherwise an ActivityModal
        activityType === 1
            ? (
                <CourseModal
                    changeModalVisible={changeModalVisible}
                    setActivityType={setActivityType}
                    activityTypeValues={activityTypeValues}
                    activityType={activityType}
                    modalityValues={modalityValues}
                    modalityType={modalityType}
                    setModalityType={setModalityType}
                    WIDTH={WIDTH}
                    HEIGHT={HEIGHT}
                    DAYS_OF_WEEK={DAYS_OF_WEEK}
                    listaComponents={listaComponents}
                    setListaComponents={setListaComponents}
                    ultimoId={ultimoId}
                    setUltimoId={setUltimoId}
                    ultimoIdRelacion={ultimoIdRelacion}
                    setUltimoIdRelacion={setUltimoIdRelacion}
                    isModalVisible={isModalVisible}
                    />
            )
            : (
                <ActivityModal
                    changeModalVisible={changeModalVisible}
                    setActivityType={setActivityType}
                    activityTypeValues={activityTypeValues}
                    activityType={activityType}
                    modalityValues={modalityValues}
                    modalityType={modalityType}
                    setModalityType={setModalityType}
                    WIDTH={WIDTH}
                    HEIGHT={HEIGHT}
                    DAYS_OF_WEEK={DAYS_OF_WEEK}
                    listaComponents={listaComponents} 
                    setListaComponents={setListaComponents}
                    ultimoId={ultimoId}
                    setUltimoId={setUltimoId}
                    ultimoIdRelacion={ultimoIdRelacion}
                    setUltimoIdRelacion={setUltimoIdRelacion}
                    isModalVisible={isModalVisible}
                    />
            )
    );
}

export default ModalControls