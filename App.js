import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as Clipboard from 'expo-clipboard';

import AppCSS from './AppCSS';

export default function App() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const [loaded] = useFonts({
    Nosifer: require('./assets/fonts/Nosifer-Regular.ttf'),
    Nautigal: require('./assets/fonts/TheNautigal-Regular.ttf'),
    Graffiti: require('./assets/fonts/DonGraffiti.otf'),
    Infected: require('./assets/fonts/INFECTED.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const short = async () => {
    Keyboard.dismiss();
    if (url.includes('https://') || url.includes('http://')) {
      await fetch(`https://cutt.ly/api/api.php?key=2f7eb34cf371c5b3013c8539eddb6f37f3279&short=${url}&name=${name}`)
        .then(async response => {
          const data = await response.json();
          if (data.url.status === 3) {
            alert('Esse nome já está em uso!');
            return;
          }
          if (data.url.status === 2) {
            alert('URL inválida!');
            return;
          }

          setUrlFinal(data.url.shortLink);
        })

      return;
    }
    alert('URL inválida!')
  }

  function copyUrl() {
    Clipboard.setString(urlFinal);
    alert("URL copiada com sucesso!")
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={AppCSS.container}>
        <StatusBar style="auto" />

        <Text style={{ color: '#1C1C1C', fontFamily: 'Infected', fontSize: 100 }}>W
        <Text style={{ color: '#0000FF', fontFamily: 'Infected', fontSize: 100 }}>LINKS</Text>
        </Text>

        <TextInput
          style={AppCSS.urlInput}
          onChangeText={(text) => setUrl(text)}
          value={url}
          placeholder='Digite ou cole a URL...'
        />

        <TextInput
          style={AppCSS.urlInput}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder='Nome personalizado'
        />

        <TouchableOpacity style={AppCSS.shortBtn} onPress={() => short()}>
          <Text style={{ color: '#FFF', fontSize: 20,  fontWeight: 'bold' }}>Encurtar</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback>
          <View style={AppCSS.copy}>
            <Text style={AppCSS.finalUrl}>{urlFinal}</Text>
            <MaterialIcons name="content-copy" size={20} color="#0000FF" onPress={urlFinal ? copyUrl() : () => { }} />
          </View>
        </TouchableWithoutFeedback>

      </View>
    </TouchableWithoutFeedback>
  );
}

