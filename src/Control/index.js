import { useState, useEffect, useContext } from "react";
import { Button, View, Alert } from "react-native";
import { GlobalContext } from "../../hooks/globalContext";
const Control = ()=>
{
    const {timeCounting, setTimeCounting, statusWork, setStatusWork, setResetTimer} = useContext(GlobalContext);
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
                setStatusWork("break");
                setResetTimer(true);
            }
        },
        {
            text: 'Modo de trabajo',
            onPress: () =>
            {
                console.log('REINICIAR EN MODO TRABAJO')
                setStatusWork("work");
                setResetTimer(true);
            }
        }
        ]);
    }
    return(
        <>
            <View>
                <Button title={timeCounting ? "Pausar" : "Continuar"} onPress={()=>setTimeCounting(!timeCounting)} />
                <Button title="Reiniciar" onPress={showAlertRestart} />
            </View>
        </>
    );
}

export default Control;