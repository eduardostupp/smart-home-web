export interface EstadoDispositivo {
    sala: {
        luzOn: boolean;
        tv: { on: boolean; canal: number };
        arCondicionado: { on: boolean; temperatura: number };
    };
    cozinha: {
        luzOn: boolean;
        geladeira: { temperatura: number; alerta: boolean };
        fogao: { on: boolean; potencia: number };
    };
    quarto: {
        luzOn: boolean;
        ventilador: { on: boolean; velocidade: number };
        cortinas: { abertas: boolean };
    };
}
