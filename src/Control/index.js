import { useState, useEffect, useContext } from "react";
import { Button, View, Alert, StyleSheet } from "react-native";
import { GlobalContext } from "../../hooks/globalContext";
const Control = ()=>
{
    const {timeCounting, setTimeCounting, toggleStatusWork} = useContext(GlobalContext);
    const showAlertRestart = () =>
    {
        Alert.alert('REINICIAR CRONÓMETRO', '¿Quiere reiniciarlo en modo de trabajo o descanso?', [
        {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {
            text: 'Modo de descanso', 
            onPress: () =>
            {
                console.log('REINICIAR EN MODO DESCANSO')
                toggleStatusWork("break");
            }
        },
        {
            text: 'Modo de trabajo',
            onPress: () =>
            {
                console.log('REINICIAR EN MODO TRABAJO')
                toggleStatusWork("work");
            }
        }
        ]);
    }
    return(
        <>
            <View style={[styles.marginTnB, styles.boxControl]}>
                <Button style={styles.btnColor} title={timeCounting ? "Pausar" : "Continuar"} onPress={()=>setTimeCounting(!timeCounting)} />
                <Button style={styles.btnColor} title="Reiniciar" onPress={showAlertRestart} />
            </View>
            <View style={[styles.marginTnB, styles.boxControl]}>
                <Button style={styles.btnColor} title="Asignar tiempos" onPress={()=>{}} />
            </View>
        </>
    );
}

export default Control;


const styles = StyleSheet.create({
    marginTnB: {
        marginTop: 15,
        marginBottom: 15,
        gap: 15
    },
    boxControl: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});