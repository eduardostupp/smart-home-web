import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import { EstadoDispositivo } from '../../smart-home-shared/types';

const socket = io('http://localhost:4000');

const App: React.FC = () => {
  const [dispositivo, setDispositivo] = useState<EstadoDispositivo>({
    cozinha: { luzOn: false, geladeira: { temperatura: 4, alerta: false }, fogao: { on: false, potencia: 1 } },
    quarto: { luzOn: false, ventilador: { on: false, velocidade: 1 }, cortinas: { abertas: false } },
    sala: { luzOn: false, tv: { on: false, canal: 1 }, arCondicionado: { on: false, temperatura: 24 } },
  });

  useEffect(() => {
    socket.on('estadoInicial', (estadoDispositivos: EstadoDispositivo) => {
      setDispositivo(estadoDispositivos);
    });

    socket.on('estadoAltera', (novoEstado: EstadoDispositivo) => {
      setDispositivo(novoEstado);
    });

    return () => {
      socket.off('estadoInicial');
      socket.off('estadoAltera');
    };
  }, []);

  const ligarLuz = (comodo: string) => {
    socket.emit('ligarLuz', comodo);
  };

  const ligarTv = () => {
    socket.emit('ligarTv');
    setDispositivo((prev) => ({
      ...prev,
      sala: {
        ...prev.sala,
        tv: {
          ...prev.sala.tv,
          on: !prev.sala.tv.on,
        },
      },
    }));
  };

  const mudarCanal = (canal: number) => {
    socket.emit('mudarCanal', canal);
  };

  const ligarArCondicionado = () => {
    socket.emit('ligarArCondicionado');
    setDispositivo((prev) => ({
      ...prev,
      sala: {
        ...prev.sala,
        arCondicionado: {
          ...prev.sala.arCondicionado,
          on: !prev.sala.arCondicionado.on,
        },
      },
    }));
  };

  const mudarTemperatura = (temperatura: number) => {
    socket.emit('mudarTemperatura', temperatura);
  };

  const ligarLuzCozinha = () => {
    socket.emit('ligarLuzCozinha');
  };

  const mudarTemperaturaGeladeira = (temperatura: number) => {
    socket.emit('mudarTemperaturaGeladeira', temperatura);
  };

  const ligarFogao = () => {
    socket.emit('ligarFogao');
    setDispositivo((prev) => ({
      ...prev,
      cozinha: {
        ...prev.cozinha,
        fogao: {
          ...prev.cozinha.fogao,
          on: !prev.cozinha.fogao.on,
        },
      },
    }));
  };

  const ligarLuzQuarto = () => {
    socket.emit('ligarLuzQuarto');
  };

  const ligarVentilador = () => {
    socket.emit('ligarVentilador');
    setDispositivo((prev) => ({
      ...prev,
      quarto: {
        ...prev.quarto,
        ventilador: {
          ...prev.quarto.ventilador,
          on: !prev.quarto.ventilador.on,
        },
      },
    }));
  };

  const mudarVelocidadeVentilador = (velocidade: number) => {
    socket.emit('mudarVelocidadeVentilador', velocidade);
  };

  const abrirFecharCortinas = () => {
    socket.emit('abrirFecharCortinas');
    setDispositivo((prev) => ({
      ...prev,
      quarto: {
        ...prev.quarto,
        cortinas: {
          ...prev.quarto.cortinas,
          abertas: !prev.quarto.cortinas.abertas,
        },
      },
    }));
  };

  return (
    <div className='casa'>
      <h1>Casa Inteligente</h1>

      <div className='comodos'>
        {/* Cozinha */}
        <div className='comodo cozinha'>
          <h2>Cozinha</h2>
          <div className='dispositivo'>
            <p>Luz: {dispositivo.cozinha.luzOn ? 'Ligada' : 'Desligada'}</p>
            <button onClick={ligarLuzCozinha}>
              {dispositivo.cozinha.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
            </button>
            <img src={dispositivo.cozinha.luzOn ? `${process.env.PUBLIC_URL}/luz_ligada.png` : `${process.env.PUBLIC_URL}/luz_desligada.png`} alt="Luz" className={`status ${dispositivo.cozinha.luzOn ? 'on' : 'off'}`} />
          </div>
          <div className='dispositivo'>
            <p>Geladeira Temperatura: {dispositivo.cozinha.geladeira.temperatura}°C</p>
            <div className="botao-duplo">
              <button onClick={() => mudarTemperaturaGeladeira(dispositivo.cozinha.geladeira.temperatura + 1)}>Aumentar Temperatura</button>
              <button onClick={() => mudarTemperaturaGeladeira(dispositivo.cozinha.geladeira.temperatura - 1)}>Diminuir Temperatura</button>
            </div>
            <p>{dispositivo.cozinha.geladeira.alerta ? 'Alerta: Temperatura Alta!' : ''}</p>
            <img src={`${process.env.PUBLIC_URL}/geladeira.png`} alt="Geladeira" />
          </div>
          <div className='dispositivo'>
            <p>Fogão: {dispositivo.cozinha.fogao.on ? 'Ligado' : 'Desligado'}</p>
            <button onClick={ligarFogao}>
              {dispositivo.cozinha.fogao.on ? 'Desligar Fogão' : 'Ligar Fogão'}
            </button>
            <img src={dispositivo.cozinha.fogao.on ? `${process.env.PUBLIC_URL}/fogao_ligado.png` : `${process.env.PUBLIC_URL}/fogao_desligado.png`} alt="Fogão" className={`status ${dispositivo.cozinha.fogao.on ? 'on' : 'off'}`} />
          </div>
        </div>

        {/* Quarto */}
        <div className='comodo quarto'>
          <h2>Quarto</h2>
          <div className='dispositivo'>
            <p>Luz: {dispositivo.quarto.luzOn ? 'Ligada' : 'Desligada'}</p>
            <button onClick={ligarLuzQuarto}>
              {dispositivo.quarto.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
            </button>
            <img src={dispositivo.quarto.luzOn ? `${process.env.PUBLIC_URL}/luz_ligada.png` : `${process.env.PUBLIC_URL}/luz_desligada.png`} alt="Luz" className={`status ${dispositivo.quarto.luzOn ? 'on' : 'off'}`} />
          </div>
          <div className='dispositivo'>
            <p>Ventilador: {dispositivo.quarto.ventilador.on ? 'Ligado' : 'Desligado'}</p>
            <button onClick={ligarVentilador}>
              {dispositivo.quarto.ventilador.on ? 'Desligar Ventilador' : 'Ligar Ventilador'}
            </button>
            <img src={dispositivo.quarto.ventilador.on ? `${process.env.PUBLIC_URL}/ventilador_ligado.gif` : `${process.env.PUBLIC_URL}/ventilador_desligado.png`} alt="Ventilador" className={`status ${dispositivo.quarto.ventilador.on ? 'on' : 'off'}`} />
            <p>Velocidade: {dispositivo.quarto.ventilador.velocidade}</p>
            <div className="botao-duplo">
              <button onClick={() => mudarVelocidadeVentilador(dispositivo.quarto.ventilador.velocidade + 1)}>Aumentar Velocidade</button>
              <button onClick={() => mudarVelocidadeVentilador(dispositivo.quarto.ventilador.velocidade - 1)}>Diminuir Velocidade</button>
            </div>
          </div>
          <div className='dispositivo'>
            <p>Cortinas: {dispositivo.quarto.cortinas.abertas ? 'Abertas' : 'Fechadas'}</p>
            <button onClick={abrirFecharCortinas}>
              {dispositivo.quarto.cortinas.abertas ? 'Fechar Cortinas' : 'Abrir Cortinas'}
            </button>
            <img src={dispositivo.quarto.cortinas.abertas ? `${process.env.PUBLIC_URL}/cortina_aberta.png` : `${process.env.PUBLIC_URL}/cortina_fechada.png`} alt="Cortinas" className={`status ${dispositivo.quarto.cortinas.abertas ? 'on' : 'off'}`} />
          </div>
        </div>

        {/* Sala de Estar */}
        <div className='comodo sala'>
          <h2>Sala de Estar</h2>
          <div className='dispositivo'>
            <p>Luz: {dispositivo.sala.luzOn ? 'Ligada' : 'Desligada'}</p>
            <button onClick={() => ligarLuz('sala')}>
              {dispositivo.sala.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
            </button>
            <img src={dispositivo.sala.luzOn ? `${process.env.PUBLIC_URL}/luz_ligada.png` : `${process.env.PUBLIC_URL}/luz_desligada.png`} alt="Luz" className={`status ${dispositivo.sala.luzOn ? 'on' : 'off'}`} />
          </div>
          <div className='dispositivo'>
            <p>TV: {dispositivo.sala.tv.on ? 'Ligada' : 'Desligada'}</p>
            <button onClick={ligarTv}>
              {dispositivo.sala.tv.on ? 'Desligar TV' : 'Ligar TV'}
            </button>
            <img src={dispositivo.sala.tv.on ? `${process.env.PUBLIC_URL}/tv_ligada.gif` : `${process.env.PUBLIC_URL}/tv_desligada.png`} alt="TV" className={`status ${dispositivo.sala.tv.on ? 'on' : 'off'}`} />
            <p>Canal da TV: {dispositivo.sala.tv.canal}</p>
            <div className="botao-duplo">
              <button onClick={() => mudarCanal(dispositivo.sala.tv.canal + 1)}>Aumentar Canal</button>
              <button onClick={() => mudarCanal(dispositivo.sala.tv.canal - 1)}>Diminuir Canal</button>
            </div>
          </div>
          <div className='dispositivo'>
            <p>Ar Condicionado: {dispositivo.sala.arCondicionado.on ? 'Ligado' : 'Desligado'}</p>
            <button onClick={ligarArCondicionado}>
              {dispositivo.sala.arCondicionado.on ? 'Desligar Ar Condicionado' : 'Ligar Ar Condicionado'}
            </button>
            <img src={dispositivo.sala.arCondicionado.on ? `${process.env.PUBLIC_URL}/ar_ligado.gif` : `${process.env.PUBLIC_URL}/ar_desligado.png`} alt="Ar Condicionado" className={`status ${dispositivo.sala.arCondicionado.on ? 'on' : 'off'}`} />
            <p>Temperatura: {dispositivo.sala.arCondicionado.temperatura}°C</p>
            <div className="botao-duplo">
              <button onClick={() => mudarTemperatura(dispositivo.sala.arCondicionado.temperatura + 1)}>Aumentar Temperatura</button>
              <button onClick={() => mudarTemperatura(dispositivo.sala.arCondicionado.temperatura - 1)}>Diminuir Temperatura</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
  