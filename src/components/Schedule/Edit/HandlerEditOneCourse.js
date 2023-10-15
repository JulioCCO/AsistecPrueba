
import moment from "moment";
import { format, set } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

function convertirFechas(
    fechaIncio,
    fechaFinal,
    fechaInicioComponent,
    fechaFinalComponent
) {
    var dateFechaIncioArreglo = new Date(fechaIncio);
    var año1 = dateFechaIncioArreglo.getFullYear();
    var mes1 = dateFechaIncioArreglo.getMonth();
    var dia1 = dateFechaIncioArreglo.getDate();
    var hora1 = dateFechaIncioArreglo.getHours();
    var minuto1 = dateFechaIncioArreglo.getMinutes();

    var dateFechaFinalArreglo = new Date(fechaFinal);
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

const verificarFechas = (initialDate, finalDate, listaComponents) => {
    var validacion = true;
    if (listaComponents.length == 0) {
        return validacion;
    } else {

        listaComponents.forEach((componet) => {

            var lista = convertirFechas(
                initialDate,
                finalDate,
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
        });

        return validacion;
    }
};

const agregarComponente = (
    initialDate, 
    courseName, 
    professorName, 
    classroom, 
    modalityType,
    initialHour, 
    finalHour, 
    Day, 
    listaComponents, 
    setListaComponents,
    id,
    color
    ) => {

    var formato = format(initialDate, "yyyy-MM-dd");
    var dateTimeI = formato + " " + moment(initialHour, "HH:mm").format("HH:mm");
    var dateTimeF = formato + " " + moment(finalHour, "HH:mm").format("HH:mm");

    var dateObject1 = new Date(dateTimeI).toISOString();
    var dateObject2 = new Date(dateTimeF).toISOString();
    // Buscar el componente a editar en la lista de componentes
    var componente = listaComponents.find((item) => item.id == id);

    var dayC = Day[0];
    //editar el componente
    componente.title = courseName;
    componente.professorName = professorName;
    componente.location = classroom;
    componente.modalityType = modalityType;
    componente.start = dateObject1;
    componente.end = dateObject2;
    componente.day = dayC;
    componente.color = color;
    
    

    // Obtenemos la lista de componentes sin el componente a editar
    var listaComponentsTemp = listaComponents.filter((item) => item.id != id);
    listaComponentsTemp.push(componente);

    // Ordenar la lista de componentes por id
    listaComponentsTemp = listaComponentsTemp.sort((a, b) => a.id - b.id);

    //
    setListaComponents([]);
    setListaComponents(listaComponentsTemp);
    AsyncStorage.setItem("listaComponents", JSON.stringify(listaComponentsTemp));

    return;

}


export const HandlerEditOneCourse = ({
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
    color,
}) => {

    // Obtener lista de componentes sin el componente a editar
    var listaComponentsTemp = listaComponents.filter((item) => item.id != event.id);


    // Validar coche de horarios
    var validacion = verificarFechas(initialDate, finalDate, listaComponentsTemp);
    if (validacion) {
        agregarComponente(
            initialDate, 
            courseName, 
            professorName, 
            classroom, 
            modalityType,
            initialHour, 
            finalHour, 
            Days, 
            listaComponents, 
            setListaComponents, 
            event.id,
            color
            );
    }
    else {
        alert("El horario ingresado se cruza con otro evento");
    }
    return;

};