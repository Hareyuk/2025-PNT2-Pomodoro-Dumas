import { useState, useEffect, useContext } from "react";
import { Button, View, Alert, StyleSheet, TextInput, Text } from "react-native";
import { GlobalContext } from "../../hooks/globalContext";
const Control = ()=>
{
    const {timeCounting, setTimeCounting, toggleStatusWork, userWorkTime, setUserWorkTime, userBreakTime, setUserBreakTime, setResetTimer} = useContext(GlobalContext);
    const [editTimes, setEditTimes] = useState(null);
    const [showMsg, setShowMsg] = useState(null);
    const [txtMsg, setTxtMsg] = useState(null);
    let setTimeoutMsg = null;
    const msgRestart = "Los tiempos de trabajo y descanso han sido reiniciados a 25 y 5 minutos con éxito.";
    const msgSaved = "Los tiempos de trabajo y descanso han sido guardados con éxito.";
    const resetDefaultTimes = () =>
    {
        setUserWorkTime(0);
        setUserBreakTime(0);
        setEditTimes(false);
        setResetTimer(true);
        setTxtMsg(msgRestart);
        setShowMsg(true);
        
    }
    const showInputs = ()=>
    {
        return(
            <View style={styles.inputsContainer}>
                <View style={styles.inputLine}>
                    <TextInput 
                        style={styles.textInput}
                        keyboardType = 'numeric'
                        onChangeText={text => setUserWorkTime(text)}
                        value={userWorkTime}
                        numberOfLines={1}
                        maxLength={3}
                    /> 
                    <Text style={styles.whiteText}> minutos de trabajo.</Text>
                </View>
                <View style={styles.inputLine}>
                    <TextInput 
                        style={styles.textInput}
                        keyboardType = 'numeric'
                        onChangeText={text => setUserBreakTime(text)}
                        value={userBreakTime}
                        numberOfLines={1}
                        maxLength={3}
                    /> 
                    <Text style={styles.whiteText}> minutos de descanso.</Text>
                </View>
            </View>
        )
    }
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
    //Mensaje temproal
    useEffect(() =>
    {
        if(showMsg)
        {
            setTimeoutMsg = setTimeout(() => {
                setShowMsg(false);
            }, 3000);
        }
    }, [showMsg]);
    useEffect(() =>
    {
        if(!editTimes && editTimes != null) //Saving
        {
            setUserBreakTime(userBreakTime.toString().replace(/[^0-9]/g, ''));
            setUserWorkTime(userWorkTime.toString().replace(/[^0-9]/g, ''));
            if(userBreakTime < 1)
                setUserBreakTime(0);
            if(userWorkTime < 1)
                setUserWorkTime(0);
            setResetTimer(true);
            setTxtMsg(msgSaved);
            setShowMsg(true);
        }
    }, [editTimes]);
    return(
        <>
            <View style={[styles.marginTnB, styles.boxControl]}>
                <Button style={styles.btnColor} disabled={editTimes} title={timeCounting ? "Pausar" : "Continuar"} onPress={()=>setTimeCounting(!timeCounting)} />
                <Button style={styles.btnColor} disabled={editTimes} title="Reiniciar" onPress={showAlertRestart} />
            </View>
            <View style={[styles.marginTnB, styles.boxControl]}>
                <Button style={styles.btnColor} title={editTimes ? "Guardar tiempos" : "Asignar tiempos"} onPress={()=>setEditTimes(!editTimes)} />
                <Button style={styles.btnColor} disabled={userBreakTime < 1 && userWorkTime < 1 ? true : false} title="Restaurar tiempos" onPress={resetDefaultTimes} />
            </View>
            {editTimes ? showInputs() : ""}
            {showMsg ? <Text style={styles.cyanText}>{txtMsg}</Text> : ""}
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
    },
    inputsContainer:
    {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 15,
        marginTop: 15,
        marginBottom: 15
    },
    textInput:
    {
        borderBottomColor: "#5CD1CF",
        borderBottomWidth: 1,
        minWidth: 45,
        color: "#fff",
        textAlign: "center",
    },
    inputLine:
    {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "baseline"
    },
    whiteText: {
    color: "#fff"
    },
    cyanText: {
        color: "#5CD1CF",
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
        width: "80%",
    },
});