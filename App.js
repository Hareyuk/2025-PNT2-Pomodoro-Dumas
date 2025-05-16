import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { vibrate, vibrateLong } from "./utils";
import Cronometro from './src/Cronometro';
import Control from './src/Control';
import { GlobalProvider } from './hooks/globalContext';

export default function App() {
  return (
    <GlobalProvider>
      <ImageBackground source={require('./assets/patternbackground.webp')} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Cronometro />
          <Control />
          <View>
            <Button title="Vibrar celular" onPress={vibrate} />
            <Button title="Vibrar Largo" onPress={vibrateLong} />
            <StatusBar style="auto" />
          </View>
        </View>
      </ImageBackground>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  View:{
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#002a5266',
    position: 'relative',
    color: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
