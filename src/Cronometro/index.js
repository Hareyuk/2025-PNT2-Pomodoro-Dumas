import { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { GlobalContext } from "../../hooks/globalContext";
import { vibrate, vibrateLong } from "../../utils";
const Cronometro = ()=>
{
    const {timeCounting, setTimeCounting, statusWork, toggleStatusWork, resetTimer, setResetTimer} = useContext(GlobalContext);
    const fiveMinutes = 5 * 60;
    const twentyFiveMinutes = 25 * 60;
    const [userWorkTime, setUserWorkTime] = useState(0);
    const [userBreakTime, setUserBreakTime] = useState(0);
    const [timer, setTimer] = useState(0);
    let interval = null;
    const getTxtAlarm = () =>
    {
        let txt = "Su tiempo de ";
        if(statusWork == "work") txt += "trabajo";
        if(statusWork == "break") txt += "descanso";
        txt += " ha finalizado, ahora empieza su tiempo de ";
        if(statusWork == "work") txt += "descanso";
        if(statusWork == "break") txt += "trabajo";
        return txt;
    }
    const notifyAlarm = () =>
    {
        vibrateLong();
        Alert.alert('ALARMA', getTxtAlarm(), [
        {
            text: 'Aceptar',
            onPress: () => {
                toggleStatusWork();
            },
        }
        ]);
    }

    //Se ejecuta al iniciar el cronómetro
    useEffect(() => {
        if(statusWork === "work")
        {
            setTimer(twentyFiveMinutes);
        }
        else
        {
            setTimer(fiveMinutes);
        }
    }, []);

    //Se ejecuta según el estado de timeCounting
    useEffect(() =>
    {
        if (timeCounting)
        {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        else if (timer > 0)
        {
            clearInterval(interval);
        }
        else
        {
            notifyAlarm();
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timeCounting]);

    useEffect(()=>{
        if(timer <= 0)
        {
            setTimeCounting(false);
        }
    }, [timer]);
    
    //Se ejecuta al reiniciar el cronómetro
    useEffect(() => {
        if(resetTimer)
        {
            if(statusWork === "work")
            {
                setTimer(twentyFiveMinutes);
            }
            else
            {
                setTimer(fiveMinutes);
            }
            setTimeCounting(true);
            setResetTimer(false);
        }
    }, [resetTimer]);

    return(
        <>
            <View style={styles.centered}>
                <View style={styles.insideCircle}>
                    <Text style={styles.whiteText}>Cronómetro</Text>
                    <Text style={[styles.whiteText, styles.bigNumbers]}>{timer < 600 ? "0" : ""}{Math.floor(timer / 60)}:{timer % 60 > 9 ? timer % 60 : `0${timer % 60}`}</Text>
                    <Text style={styles.whiteText}>Modo {statusWork === "work" ? "trabajo" : "descanso"}</Text>
                </View>
            </View>
        </>
    );
}

export default Cronometro;

const styles = StyleSheet.create({
    whiteText: {
    color: "#fff"
    },
    bigNumbers: {
        fontSize: 30    
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 8,
        borderColor: '#5CD1CF',
        backgroundColor: '#00000000',
    }, 
    insideCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 165,
        height: 165,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#5CD1CF',
        backgroundColor: '#25333299',
    },
});