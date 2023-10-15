
import { Dimensions } from "react-native";
import React, { useState } from "react";
import EditActivityModal from "./EditActivityModal";
import EditCourseModal from "./EditCourseModal";

const EditControls = ({
  event,
  listaComponents,
  setListaComponents,
  setTypeExitMessage,
  editRelationComponent,
  changeOpenEditModal,
  openEditModal,
  ultimoId,
  setUltimoId,
}) => {
  const [modalityType, setModalityType] = useState(event.modalityType);
  const WIDTH = Dimensions.get("window").width - 80;
  const HEIGHT = !editRelationComponent
    ? Dimensions.get("window").height - 300
    : Dimensions.get("window").height - 250;

  const DAYS_OF_WEEK = [
    { id: 1, name: "LUN", selected: false },
    { id: 2, name: "MAR", selected: false },
    { id: 3, name: "MIÉ", selected: false },
    { id: 4, name: "JUE", selected: false },
    { id: 5, name: "VIE", selected: false },
    { id: 6, name: "SÁB", selected: false },
    { id: 0, name: "DOM", selected: false },
  ];

  // Possible values for the modality type
  const modalityValues = [
    { key: 1, value: "Presencial" },
    { key: 2, value: "Virtual" },
    { key: 3, value: "Semipresencial" },
  ];
  const fechasrelacionadas = () => {
    if (editRelationComponent) {
      const lista = listaComponents.filter(
        (item) => item.idRelacion == event.idRelacion
      );
      const listaFechas = lista.map((item) => new Date(item.start));
      const fechaMenor = Math.min(...listaFechas);
      const listaFechas2 = lista.map((item) => new Date(item.end));
      const fechaMayor = Math.max(...listaFechas2);

      //obtener una lista de todos los event.day de los componentes con el mismo event.IdRelacion
      const listaDias = lista.map((item) => item.day);
      //eliminar los repetidos de la lista
      const listaDiasSinRepetir = [...new Set(listaDias)];
      event.start = fechaMenor;
      event.end = fechaMayor;
      event.day = listaDiasSinRepetir;
    }
  }
  return (
    fechasrelacionadas(),
    event.type == "Actividad" ? (
      <EditActivityModal
        event={event}
        changeOpenEditModal={changeOpenEditModal}
        modalityValues={modalityValues}
        modalityType={modalityType}
        setModalityType={setModalityType}
        WIDTH={WIDTH}
        HEIGHT={HEIGHT}
        DAYS_OF_WEEK={DAYS_OF_WEEK}
        listaComponents={listaComponents}
        setListaComponents={setListaComponents}
        openEditModal={openEditModal}
        setTypeExitMessage={setTypeExitMessage}
        editRelationComponent={editRelationComponent}
        ultimoId={ultimoId}
        setUltimoId={setUltimoId}
      />
    ) : (
      <EditCourseModal
        event={event}
        changeOpenEditModal={changeOpenEditModal}
        modalityValues={modalityValues}
        modalityType={modalityType}
        setModalityType={setModalityType}
        WIDTH={WIDTH}
        HEIGHT={HEIGHT}
        DAYS_OF_WEEK={DAYS_OF_WEEK}
        listaComponents={listaComponents}
        setListaComponents={setListaComponents}
        openEditModal={openEditModal}
        setTypeExitMessage={setTypeExitMessage}
        editRelationComponent={editRelationComponent}
        ultimoId={ultimoId}
        setUltimoId={setUltimoId}
      />
    )
  );
};

export default EditControls;
