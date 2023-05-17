import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState(); 
  return (
    <View style={styles.container}>
      <Text>Välkommstmeddlande här!</Text>
      <TextInput style={styles.input} onChangeText={setInput} value={input} placeholder='Sök efter bok eller författare...'></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 25,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
