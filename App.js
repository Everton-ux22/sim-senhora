import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [aceitou, setAceitou] = useState(false);
  const [tentativas, setTentativas] = useState(0);

  
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const TOPICO_NTFY = 'c0nv1t3-m4h-p3-7492x'; 

const notificarSim = async (qtdTentativas) => {
  try {
    await fetch(`https://ntfy.sh/${TOPICO_NTFY}`, {
      method: 'POST',
      headers: {
        Title: 'Ela clicou em SIM!',
        Priority: 'high',
        Tags: 'heart,sparkles',
      },
      body: `O convite foi aceito! Tentativas de fugir do "Não": ${qtdTentativas}`,
    });
  } catch (error) {
    
    console.log('Não foi possível enviar a notificação:', error);
  }
};

  const mensagensFuga = [
    'Não',
    'Tem certeza?',
    'Errou o botão!',
    'KKKKKKKKKKKK',
    'Quase lá...',
    'Acho que o Sim é melhor 👀',
  ];

  const fugir = () => {
    
    const limiteX = Math.max(30, (width / 2) - 60);
    const limiteY = Math.max(60, (height / 2) - 150);

    
    const sorteioX = (Math.random() * 2 - 1) * limiteX;
    const sorteioY = (Math.random() * 2 - 1) * limiteY;

    const novoX = Math.round(sorteioX);
    const novoY = Math.round(sorteioY);
    
    pan.setValue({x: novoX, y: novoY});
    setTentativas((prev) => prev + 1);

  };

  if (aceitou) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🫶🏻</Text>
        <Text style={styles.titulo}>Sabia que ia sair um "Sim"!</Text>
        <Text style={styles.subtitulo}>
          Já se preapre pra ir viu?
        </Text>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => {
            setAceitou(false);
            setTentativas(0);
            pan.setValue({ x: 0, y: 0 });
          }}
        >
          <Text style={styles.textoVoltar}>Ver convite de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const textoBotaoNao = mensagensFuga[Math.min(tentativas, mensagensFuga.length - 1)];

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💐</Text>
      <Text style={styles.titulo}>Bora sair?</Text>
      <Text style={styles.subtitulo}>
        ir no Tacaruna. O que acha?
      </Text>

      <View style={styles.arenaBotoes}>
        <TouchableOpacity
          style={styles.botaoSim}
          activeOpacity={0.8}
          onPress={() => {setAceitou(true)
          notificarSim(tentativas);  
          }}
        >
          <Text style={styles.textoBotaoSim}>Sim, bora!</Text>
        </TouchableOpacity>

        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
        >
          <TouchableOpacity
            style={styles.botaoNao}
            activeOpacity={1}
            delaypressIn={0}
            onPressIn={fugir}
            onPress={fugir}
            onMouseEnter={fugir}
          >
            <Text style={styles.textoBotaoNao}>{textoBotaoNao}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {tentativas > 0 && (
        <Text style={styles.contadorFuga}>
          Tentativas de fugir: {tentativas}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8A2C8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 14,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 36,
    maxWidth: 380,
    lineHeight: 22,
  },
  arenaBotoes: {
    width: '100%',
    minHeight: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 10,
  },
  botaoSim: {
    backgroundColor: '#F50057',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 999,
    zIndex: 20,
  },
  textoBotaoSim: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoNao: {
    backgroundColor: '#880E4F',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#444444',
  },
  textoBotaoNao: {
    color: '#D4D4D4',
    fontSize: 15,
    fontWeight: '500',
  },
  contadorFuga: {
    marginTop: 20,
    fontSize: 13,
    color: '#C8A2C8',
  },
  botaoVoltar: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  textoVoltar: {
    color: '#000000',
    fontSize: 14,
  },
});