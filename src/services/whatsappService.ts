// src/services/whatsappService.ts

import { showMessage } from '../ui/messageHandler';
import { detectPlatform } from '../utils/platformDetect';
import { countryCode, phoneInput } from '../ui/domElements';

/**
 * Função auxiliar privada.
 * Obtém e sanitiza o número de telefone completo dos inputs.
 * @returns {string | null} O número completo (ex: +55119...) ou null se inválido.
 */
function getFullNumber(): string | null {
  if (!phoneInput || !countryCode) return null;
  
  const code = countryCode.value.trim();
  const num = phoneInput.value.trim().replace(/\D/g, ''); // Remove não-dígitos
  if (!num) {
    showMessage('error', 'Digite um número de telefone válido.');
    return null;
  }
  return `${code}${num}`;
}

/**
 * Tenta abrir o WhatsApp Pessoal (Consumer) com o número fornecido.
 * Utiliza "deep links" (Intents/Schemes) específicos para Android/iOS
 * com um fallback para 'wa.me/' (Web).
 */
export function openWhatsappConsumer() {
  const fullNumber = getFullNumber();
  if (!fullNumber) return;
  
  const platform = detectPlatform();
  const cleanNumber = fullNumber.replace('+', ''); // Intents/Schemes não usam o '+'
  
  if (platform.isAndroid) {
    const androidIntent = `intent://send?phone=${cleanNumber}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    window.location.href = androidIntent;
    // Fallback caso o app não abra
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
    }, 1500);
    showMessage('success', 'Abrindo WhatsApp pessoal...');

  } else if (platform.isIOS) {
    const iosScheme = `whatsapp://send?phone=${cleanNumber}`;
    window.location.href = iosScheme;
    // Fallback
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
    }, 1000);
    showMessage('success', 'Abrindo WhatsApp...');

  } else {
    // Desktop ou outros
    window.open(`https://wa.me/${fullNumber}`, '_blank');
    showMessage('success', 'Abrindo WhatsApp Web...');
  }
}

/**
 * Tenta abrir o WhatsApp Business com o número fornecido.
 * Utiliza "deep links" (Intents/Schemes) específicos para Android/iOS
 * com um fallback para 'wa.me/' (Web).
 */
export function openWhatsappBusiness() {
  const fullNumber = getFullNumber();
  if (!fullNumber) return;
  
  const platform = detectPlatform();
  const cleanNumber = fullNumber.replace('+', '');
  
  if (platform.isAndroid) {
    const androidIntent = `intent://send?phone=${cleanNumber}#Intent;scheme=whatsapp;package=com.whatsapp.w4b;end`;
    window.location.href = androidIntent;
    // Fallback
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
    }, 1500);
    showMessage('success', 'Abrindo WhatsApp Business...');

  } else if (platform.isIOS) {
    const iosScheme = `whatsapp-business://send?phone=${cleanNumber}`;
    window.location.href = iosScheme;
    // Fallback
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
    }, 1000);
    showMessage('success', 'Abrindo WhatsApp Business...');

  } else {
    // Desktop ou outros
    window.open(`https://wa.me/${fullNumber}`, '_blank');
    showMessage('success', 'Abrindo WhatsApp Business...');
  }
}