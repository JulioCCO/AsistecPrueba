import React, { useState } from "react";

import {
    View, Text, Image, 
    StyleSheet,TouchableOpacity
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


import axios from "axios";
const API = `http://192.168.50.13:4000/api/users`
const LoginScreen= () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Use the useNavigation hook to get the navigation object
    const navigation = useNavigation();

    const handleClick = async() => {
        try {
            const response = await axios.post(API, {name, email, password});
            
            alert(response.data.msg);
            setName("");
            setEmail("");
            setPassword("");
            navigation.navigate("Login");
        } catch (error) {
            alert(error.response?.data.msg);
        }
    }

    return (
        <View style={styles.container}>
            {/* This image shows "Asistec" ans figures */}
            <Image
                style={styles.imageBackground}
                source={require("../../assets/loginImage.png")}
            />

            {/* This view contains all inputs */}
            <View style={{width: "80%", marginTop: "20%"}}>
                <Input
                    type="text"
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Nombre Completo" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name="perm-identity" type="material" color="#769ECB" />}
                    style={styles.inputs} 
                    value={name}
                    onChange={(text) => setName(text.nativeEvent.text)}
                />

                <Input
                    type="email"
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Correo electrónico" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name="email" type="material" color="#769ECB" />}
                    style={styles.inputs} 
                    value={email}
                    onChange={(text) => setEmail(text.nativeEvent.text)}
                />

                <Input
                    type="password" 
                    secureTextEntry={true}
                    inputContainerStyle={{borderBottomWidth:0}} 
                    placeholder="Contraseña" 
                    placeholderTextColor={"#00000066"}
                    leftIcon={<Icon name="lock-closed-outline" type="ionicon" color="#769ECB" />} 
                    style={styles.inputs}
                    value={password}
                    onChange={(text) => setPassword(text.nativeEvent.text)} 
                />
            </View>

            <TouchableOpacity 
                // Navigate to CreateAccountScreen screen when login button is pressed
                onPress={handleClick} 
                style={styles.loginButton}>
                <Text 
                    style={styles.loginButtonText}>
                    Crear Cuenta
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // Navigate to Login screen when login button is pressed
                onPress={() => navigation.navigate("Login")}>
                <Text 
                    style={styles.createAccountButton}>
                    ¿Ya tienes una cuenta? {""}
                    <Text style={{color: "black"}}>Inicia sesión</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

// These are all the styles of this screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    imageBackground: {
        flex: 1,
        resizeMode: "cover", 
        position: "absolute",
        width: "100%",
        height: "100%"
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
    },

    createAccountButton: {
        marginTop: 20,
        color:"#00000066",
        fontSize: 14,
    }
})

export default LoginScreen;