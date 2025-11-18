// src/ui/messageHandler.ts
import { messageBox, messageIcon, messageText } from './domElements';

/**
 * Controla o timer do-pop-up de mensagem para evitar múltiplos timers.
 */
let messageTimeout: number;

/**
 * Exibe um pop-up de feedback (snackbar/toast) para o usuário.
 * @param type O tipo de mensagem ('success' ou 'error'), usado para estilização CSS.
 * @param text O texto a ser exibido na mensagem.
 */
export function showMessage(type: string, text: string) {
  // Checagem de segurança caso os elementos não sejam encontrados
  if (!messageBox || !messageIcon || !messageText) return;

  messageBox.className = `message-box show ${type}`;
  messageIcon.textContent = type === 'error' ? 'error' : 'check_circle';
  messageText.textContent = text;

  // Limpa o timer anterior e define um novo
  clearTimeout(messageTimeout);
  messageTimeout = window.setTimeout(() => {
    messageBox.classList.remove('show');
  }, 4000);
}