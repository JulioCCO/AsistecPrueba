import {
    View, Text, Image, 
    StyleSheet,TouchableOpacity
} from 'react-native';
import React from 'react';

import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const LoginScreen= () => {
    // Use the useNavigation hook to get the navigation object
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageBackground}
                // Load image from assets folder
                source={require('../../assets/loginImage.png')}
            />

            <View style={{width: "80%"}}>
                <Input
                    type="email"
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Correo electrónico" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name='email' type='material' color='#769ECB' />}
                    style={styles.inputs} 
                />

                <Input
                    type="password" 
                    secureTextEntry={true}
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Contraseña" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name='lock-closed-outline' type='ionicon' color='#769ECB' />} 
                    style={styles.inputs} 
                />
            </View>

            <TouchableOpacity 
                // Navigate to Home screen when login button is pressed
                onPress={() => navigation.navigate("Home")} 
                style={styles.loginButton}>
                <Text 
                    style={styles.loginButtonText}>
                    Iniciar Sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },

    imageBackground: {
        flex: 1,
        resizeMode: 'cover', 
        position: 'absolute',
        width: '100%',
        height: '100%'
    },

    inputs: {
        padding:15,
        color:"#00000066",
        borderBottomWidth: 1,
        borderBottomColor: "#00000066"
    },

    loginButton: {
        width:300, 
        marginLeft:"auto", 
        marginRight:"auto",
        justifyContent:"center", 
        alignItems:"center",
        borderColor:"white",
        borderWidth:2,
        padding:14,
        backgroundColor: "#769ECB",
        borderRadius: 20
        
    },

    loginButtonText: {
        textAlign:"center",
        fontSize:19,
        fontWeight:"700",
        color:"white"
    }
})

export default LoginScreen;