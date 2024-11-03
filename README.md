Aqui está a versão revisada do README, com melhor estruturação e correções para melhorar a compreensão:

---

# Casa Inteligente

Projeto de Programação Orientada a Eventos - Simulação de Casa Inteligente.

## Objetivo
Este projeto visa simular uma casa inteligente, onde dispositivos em diferentes cômodos podem ser controlados remotamente por meio de uma interface web. Os dispositivos são manipulados em tempo real, com o uso de WebSocket para garantir que mudanças de estado sejam refletidas para todos os usuários conectados simultaneamente.

### Grupo
- [@EduardoStupp](#)
- [@LucasEduardo](#)

## Estrutura do Projeto
O projeto está dividido nas seguintes pastas:
- **smart-home-backend**: Gerencia o back-end da aplicação.
- **smart-home-frontend**: Contém o front-end da aplicação.
- **smart-home-shared**: Armazena o arquivo `types.js`, utilizado tanto pelo front-end quanto pelo back-end.

**Nota**: Devido a um problema ao comitar o projeto (alteração de final de linha de 'LF' para 'CRLF'), o projeto completo foi compactado e importado diretamente.

## Configuração e Execução
Siga os passos abaixo para iniciar o projeto:

### 1. Preparação do Ambiente
Abra o Visual Studio Code em duas janelas separadas:
- Em uma janela, abra a pasta **smart-home-frontend**.
- Na outra, abra a pasta **smart-home-backend**.

### 2. Instalação das Dependências

#### Front-end
No terminal da pasta **smart-home-frontend**, execute os comandos:

```bash
npm install -g typescript
npm install express socket.io cors typescript ts-node-dev @types/node @types/express @types/socket.io
npx tsc --init
```

#### Back-end
No terminal da pasta **smart-home-backend**, execute os comandos:

```bash
npm install nodemon
npm install socket.io-client
npm install @types/socket.io-client --save-dev
```

### 3. Inicialização dos Servidores
Após a instalação das dependências, inicialize os servidores:

- Em ambos os terminais (front-end e back-end), execute o comando:

```bash
npm start
```

Isso iniciará os servidores do front-end e do back-end. Uma nova janela do navegador será aberta automaticamente, exibindo a interface do projeto.

---

