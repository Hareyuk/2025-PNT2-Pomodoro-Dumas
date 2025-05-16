import { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { GlobalContext } from "../../hooks/globalContext";
const Cronometro = ()=>
{
    const {timeCounting, statusWork, setStatusWork, resetTimer, setResetTimer} = useContext(GlobalContext);
    const fiveMinutes = 5 * 60;
    const twentyFiveMinutes = 25 * 60;
    const [timer, setTimer] = useState(twentyFiveMinutes);
    let interval = null;
    
    //Se ejecuta según el estado de timeCounting
    useEffect(() =>
        {
        if (timeCounting)
        {
            interval = setInterval(() =>
            {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        else if (!timeCounting && timer !== 0)
        {
            clearInterval(interval);
        }
        else
        {
            if(statusWork == "work")
            {
                setResetTimer(true);
                setStatusWork("break");
            }
            else if(statusWork == "break")
            {
                setResetTimer(true);
                setStatusWork("work");
            }
        }
        return () => clearInterval(interval);
    }, [timeCounting]);
    
    //Se ejecuta al reiniciar el cronómetro
    useEffect(() => {
        if(resetTimer)
        {
            if(statusWork === "work")
            {
                setTimer(twentyFiveMinutes);
            }
            else if(statusWork === "break")
            {
                setTimer(fiveMinutes);
            }
            setResetTimer(false);
        }
    }, [resetTimer]);

    return(
        <>
            <View style={styles.centered}>
                <View style={styles.insideCircle}>
                    <Text style={styles.whiteText}>Cronómetro</Text>
                    <Text style={[styles.whiteText, styles.bigNumbers]}>{Math.floor(timer > 60 ? `0${timer / 60}` : "00")}:{timer % 60 > 9 ? timer % 60 : `0${timer % 60}`}</Text>
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