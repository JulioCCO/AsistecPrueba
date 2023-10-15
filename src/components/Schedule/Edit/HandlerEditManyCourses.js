import moment from "moment";
import { addDays, format } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage';

const obtenerFechas = (startDate, lastDate, horaInicio, horaFin, Days) => {
    var ListaFechas = []; // Array para almacenar la lista fechas

    var fechaActual = startDate; // Fecha actual
    while (fechaActual <= lastDate) {
        if (Days.includes(fechaActual.getDay())) {
            var fechas = []; // Array para almacenar las fechas
            var formato = format(fechaActual, "yyyy-MM-dd");
            var dateTimeI = formato + " " + moment(horaInicio, "HH:mm").format("HH:mm");
            var dateTimeF = formato + " " + moment(horaFin, "HH:mm").format("HH:mm");

            var dateObject1 = new Date(dateTimeI).toISOString();
            var dateObject2 = new Date(dateTimeF).toISOString();
            fechas.push(dateObject1); // Agregar la fecha al array
            fechas.push(dateObject2); // Agregar la fecha al array
            //
            ListaFechas.push(fechas);
        }
        fechaActual = addDays(fechaActual, 1);
    }

    return ListaFechas;
};

function convertirFechas(
    fechaIncioArreglo,
    fechaFinalArreglo,
    fechaInicioComponent,
    fechaFinalComponent
) {
    var dateFechaIncioArreglo = new Date(fechaIncioArreglo);
    var año1 = dateFechaIncioArreglo.getFullYear();
    var mes1 = dateFechaIncioArreglo.getMonth();
    var dia1 = dateFechaIncioArreglo.getDate();
    var hora1 = dateFechaIncioArreglo.getHours();
    var minuto1 = dateFechaIncioArreglo.getMinutes();

    var dateFechaFinalArreglo = new Date(fechaFinalArreglo);
    var año2 = dateFechaFinalArreglo.getFullYear();
    var mes2 = dateFechaFinalArreglo.getMonth();
    var dia2 = dateFechaFinalArreglo.getDate();
    var hora2 = dateFechaFinalArreglo.getHours();
    var minuto2 = dateFechaFinalArreglo.getMinutes();

    var dateFechaInicioComponent = new Date(fechaInicioComponent);
    var año3 = dateFechaInicioComponent.getFullYear();
    var mes3 = dateFechaInicioComponent.getMonth();
    var dia3 = dateFechaInicioComponent.getDate();
    var hora3 = dateFechaInicioComponent.getHours();
    var minuto3 = dateFechaInicioComponent.getMinutes();

    var dateFechaFinalComponent = new Date(fechaFinalComponent);
    var año4 = dateFechaFinalComponent.getFullYear();
    var mes4 = dateFechaFinalComponent.getMonth();
    var dia4 = dateFechaInicioComponent.getDate();
    var hora4 = dateFechaFinalComponent.getHours();
    var minuto4 = dateFechaFinalComponent.getMinutes();

    lista = [
        [hora1, minuto1, año1, mes1, dia1],
        [hora2, minuto2, año2, mes2, dia2],
        [hora3, minuto3, año3, mes3, dia3],
        [hora4, minuto4, año4, mes4, dia4],
    ];

    return lista;
}

const verificarFechas = (ListaFechas, listaComponents) => {
    var validacion = true;
    if (listaComponents.length == 0) {
        return validacion;
    } else {
        listaComponents.forEach((componet) => {
            for (let index = 0; index < ListaFechas.length; index++) {
                const element = ListaFechas[index]; // [fechaInicio, fechaFinal] [hora, minuto]

                var lista = convertirFechas(
                    element[0],
                    element[1],
                    componet.start,
                    componet.end
                );
                if (
                    lista[0][2] == lista[2][2] &&
                    lista[0][3] == lista[2][3] &&
                    lista[0][4] == lista[2][4]
                ) {
                    // [inicalA=[hora1,minuto1], finalA=[hora2,minuto2], inicialC=[hora3,minuto3], finalC=[hora4,minuto4]]
                    if (
                        (lista[0][0] > lista[2][0] && lista[0][0] < lista[3][0]) ||
                        (lista[1][0] > lista[2][0] && lista[1][0] < lista[3][0])
                    ) {
                        validacion = false;

                        return validacion;
                    } else {
                        // Valida si las horas iniciales son iguales
                        if (lista[0][0] === lista[2][0]) {
                            validacion = false;

                            return validacion;
                        }

                        // Valida si la hora inicial es igual a la hora final
                        if (lista[0][0] === lista[3][0]) {
                            if (lista[0][1] <= lista[3][1]) {
                                validacion = false;

                                return validacion;
                            }
                        }

                        // Valida si la hora final es igual a la hora inicial
                        if (lista[1][0] === lista[2][0]) {
                            if (lista[1][1] >= lista[2][1]) {
                                validacion = false;

                                return validacion;
                            }
                        }

                        // Valida si la hora final es igual a la hora final
                        if (lista[1][0] === lista[3][0]) {
                            validacion = false;

                            return validacion;
                        }
                    }
                }
            }
        });

        return validacion;
    }
};

// Funcion para agregar el componente
const agregarComponente = (
    ListaFechas,
    listaComponents,
    setListaComponents,
    courseName,
    professorName,
    classroom,
    modalityType,
    ultimoId,
    setUltimoId,
    IdRelacion,
    color
) => {

    var listaComponentsCopia = listaComponents.filter(
        (component) => component.idRelacion != IdRelacion
    );
  
    // Obtener el ultimo id de la lista de componentes
    var ultimoIdTemp = ultimoId;

    lista = [];

    // Agregar el componente
    for (let index = 0; index < ListaFechas.length; index++) {
        const element = ListaFechas[index]; // [fechaInicio, fechaFinal] [fechaInicio, fechaFinal]
        var daySpecific = new Date(element[0]).getDay();
        // de tipo clase
        var componente = {
            id: ultimoIdTemp + 1,
            idRelacion: IdRelacion,
            start: element[0],
            end: element[1],
            title: courseName,
            professorName: professorName,
            location: classroom,
            modalityType: modalityType,
            color: color,
            type: "Clase",
            day: daySpecific,
        };
        ultimoIdTemp = ultimoIdTemp + 1;
        lista.push(componente);
    }

    // Actualizar el ultimo id de la lista de componentes
    setListaComponents([]);
    setUltimoId(ultimoIdTemp);
    setListaComponents(listaComponentsCopia.concat(lista));
    AsyncStorage.setItem("listaComponents", JSON.stringify(listaComponentsCopia.concat(lista)));
};




export const HandlerEditManyCourses = ({
    event,
    initialDate,
    finalDate,
    courseName,
    professorName,
    classroom,
    modalityType,
    initialHour,
    finalHour,
    Days,
    listaComponents,
    setListaComponents,
    ultimoId,
    setUltimoId,
    color,
}) => {

    // Variables para obtener las fechas
    ListaFechas = obtenerFechas(
        initialDate,
        finalDate,
        initialHour,
        finalHour,
        Days
    );
    // copia de la lista de componentes sin el componente a editar
    var listaComponentsCopia = listaComponents.filter(
        (component) => component.idRelacion !== event.idRelacion
    );

    // Variable para verificar si ya existe la fecha en la lista de componentes
    var validacion = verificarFechas(ListaFechas, listaComponentsCopia);

    if (validacion) {

        agregarComponente(
            ListaFechas,
            listaComponents,
            setListaComponents,
            courseName,
            professorName,
            classroom,
            modalityType,
            ultimoId,
            setUltimoId,
            event.idRelacion,
            color
        );

    } else {
        alert("Ya existe una actividad en ese horario");
    }

}