import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  const data = [
    { label: 'Ingeniería en Computación', value: '1' },
    { label: 'Administración de Empresas', value: '2' },
    { label: 'Gestión Turismo Rural Sostenible', value: '3' },
    { label: 'Ingeniería Electrónica', value: '4' },
    { label: 'Ingeniería en Agronomía', value: '5' },
    { label: 'Ingeniería en Producción Industrial', value: '6' },
    { label: 'Enseñanza de la Matemática', value: '7' },
    { label: 'Ingeniería en Biotecnología', value: '8' },
    { label: 'Administración de Tecnología de Información', value: '9' },
    { label: 'Ingeniería Agrícola', value: '10' },
    { label: 'Ingeniería Ambiental', value: '11' },
    { label: 'Ingeniería en Agronegocios', value: '12' },
    { label: 'Ingeniería en Computadores', value: '13' },
    { label: 'Ingeniería en Construcción', value: '14' },
    { label: 'Ingeniería en Diseño Industrial', value: '15' },
    { label: 'Ingeniería en Materiales', value: '16' },
    { label: 'Ingeniería en Seguriad Laboral e Higiene Ambiental', value: '17' },
    { label: 'Ingeniería Física', value: '18' },
    { label: 'Ingeniería Forestal', value: '19' },
    { label: 'Ingeniería Mecatrónica', value: '20' },
    { label: 'Ingeniería en Mantenimiento Industrial', value: '21' },
    { label: 'Gestión Sostenibilidad Turística', value: '22' },
    { label: 'Arquitectura', value: '23' },
    { label: 'Gestión Turismo Sostenible', value: '24' },

];

  const DropdownComponent = ({
    handleOnValueChange,
  }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const handleValueChanged = (value) => {
        setValue(value.value);
        handleOnValueChange(value.value);
        setIsFocus(false);
    }


    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#769ECB' }]}>
            Carrera perteneciente
          </Text>
        );
      }
      return null;
    };


    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#769ECB' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={190}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Selecciona una carrera...' : '...'}
          searchPlaceholder="Buscar..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => handleValueChanged(item)}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? '#769ECB' : '#769ECB'}
              name="book"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      padding: 14,
      marginBottom: 10,
      
    },
    dropdown: {
      marginStart: "2%",
      height: 50,
      borderColor: '#00000066',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'transparent',
      color: '#00000066',
      left: 22,
      top: -4,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: { 
      fontSize: 18,
      color: '#00000066',
    },
    selectedTextStyle: {
      color: '#00000066',
      textAlign: 'left',
      textAlignVertical: 'center',
      fontSize: 16,
      height:44,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });