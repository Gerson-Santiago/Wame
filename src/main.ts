// src/main.ts
import { App } from './App';

/**
 * Ponto de entrada (entrypoint) da aplicação.
 * * Este arquivo tem a responsabilidade ÚNICA de:
 * 1. Instanciar a classe principal da Aplicação.
 * 2. Chamar o método de inicialização.
 */

// Cria uma nova instância da aplicação
const app = new App();

// Inicia a aplicação
app.init();