import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { EstadoDispositivo } from '../../smart-home-shared/types';

const app = express();
app.use(cors());

// Criar servidor http
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL do Front-End React
        methods: ["GET", "POST"],
    }
});

// Estado inicial dos dispositivos
let dispositivos: EstadoDispositivo = {
    sala: { luzOn: false, tv: { on: false, canal: 1 }, arCondicionado: { on: false, temperatura: 24 } },
    cozinha: { luzOn: false, geladeira: { temperatura: 4, alerta: false }, fogao: { on: false, potencia: 1 } },
    quarto: { luzOn: false, ventilador: { on: false, velocidade: 1 }, cortinas: { abertas: false } },
};

// Escuta os eventos de conexão do socket
io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    // Enviando o estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicial', dispositivos);

    // Manipulando eventos e mudanças do estado dos dispositivos
    socket.on('ligarLuz', (comodo: keyof EstadoDispositivo) => {
        dispositivos[comodo].luzOn = !dispositivos[comodo].luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarTv', () => {
        dispositivos.sala.tv.on = !dispositivos.sala.tv.on;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('mudarCanal', (canal: number) => {
        dispositivos.sala.tv.canal = canal;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarArCondicionado', () => {
        dispositivos.sala.arCondicionado.on = !dispositivos.sala.arCondicionado.on;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('mudarTemperatura', (temperatura: number) => {
        dispositivos.sala.arCondicionado.temperatura = temperatura;
        io.emit('estadoAltera', dispositivos); 
    });

    // Adicionando eventos para a cozinha
    socket.on('ligarLuzCozinha', () => {
        dispositivos.cozinha.luzOn = !dispositivos.cozinha.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('mudarTemperaturaGeladeira', (temperatura: number) => {
        dispositivos.cozinha.geladeira.temperatura = temperatura;
        dispositivos.cozinha.geladeira.alerta = temperatura > 5; // Alerta se temperatura acima de 5°C
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarFogao', () => {
        dispositivos.cozinha.fogao.on = !dispositivos.cozinha.fogao.on;
        io.emit('estadoAltera', dispositivos);
    });

    // Adicionando eventos para o quarto
    socket.on('ligarLuzQuarto', () => {
        dispositivos.quarto.luzOn = !dispositivos.quarto.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('toggleVentilador', () => {
        dispositivos.quarto.ventilador.on = !dispositivos.quarto.ventilador.on;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('mudarVelocidadeVentilador', (velocidade: number) => {
        dispositivos.quarto.ventilador.velocidade = velocidade;
        io.emit('estadoAltera', dispositivos); 
    });

    socket.on('abrirCortinas', () => {
        dispositivos.quarto.cortinas.abertas = !dispositivos.quarto.cortinas.abertas;
        io.emit('estadoAltera', dispositivos);
    });
});

// Iniciar Servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
