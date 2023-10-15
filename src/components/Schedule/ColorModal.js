
import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native'

import ColorPicker from 'react-native-wheel-color-picker';

const { width, height } = Dimensions.get('window');

export const ColorModal = ({ color, setColor, modalColorState, changeModalColorVisible }) => {

    return (
        <TouchableOpacity
        
            disabled={true}
            style={{
                flex: 1,
                backgroundColor: modalColorState ? "rgba(0,0,0,0.4)" : "transparent",
            }}
        >
            <View style={styles.container}>
                <ColorPicker
                    style={{ ...styles.colorPickerContainer, width: width - 80, height: height - 200 }}
                    color={color}
                    onColorChange={color => setColor(color)}
                    thumbSize={40}
                    sliderSize={40}
                    noSnap={true}
                    row={false}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {changeModalColorVisible()}}
                    >
                    <Text style={styles.textButton}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        top: height / 4,
        alignSelf: 'center',
        flex: 1 / 2,
        backgroundColor: 'white',
        margin: 20,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#769ECB",
        padding: 10,
        borderRadius: 10,
        margin: 20
    },
    colorPickerContainer: {
        padding: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 20,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})
