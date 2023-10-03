import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Agenda } from 'react-native-calendars';

const HorarioScreen = () => {

    const eventos = {
        '2023-09-12': [{ name: 'Reunión de trabajo' }],
        '2023-09-15': [{ name: 'Entrevista de trabajo' }],
        '2023-09-18': [{ name: 'Cita médica' }],
    };

    const renderEvento = (evento) => {
        return (
          <View style={styles.eventoContainer}>
            <Text>{evento.name}</Text>
          </View>
        );
      };

    return (
        <View style={{ flex: 1 }}>
        <Agenda
          items={eventos}
          renderItem={(item) => renderEvento(item)}
          // Personaliza más la apariencia de la agenda según tus necesidades
          // Consulta la documentación para opciones adicionales
        />
      </View>
    );
}

const styles = StyleSheet.create({
    eventoContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    // Agrega más estilos según sea necesario
  });
  
export default HorarioScreen;

