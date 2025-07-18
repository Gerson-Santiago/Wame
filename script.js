document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phoneNumber');
  const countryCode = document.getElementById('countryCode');
  const btnConsumer = document.getElementById('openConsumerBtn');
  const btnBusiness = document.getElementById('openBusinessBtn');
  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');

  // Mostra mensagem ao usuário
  function showMessage(type, text) {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = type === 'error' ? 'error' : 'check_circle';
    messageText.textContent = text;
    clearTimeout(messageBox.dataset.timeoutId);
    messageBox.dataset.timeoutId = setTimeout(() => {
      messageBox.classList.remove('show');
    }, 4000);
  }

  // Obtém número completo (código + telefone) sanitizado
  function getFullNumber() {
    const code = countryCode.value.trim();
    const num = phoneInput.value.trim().replace(/\D/g, '');
    if (!num) {
      showMessage('error', 'Digite um número de telefone válido.');
      return null;
    }
    return `${code}${num}`;
  }

  // Detecta plataforma
  function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return {
      isAndroid: /android/i.test(userAgent),
      isIOS: /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream,
      isMobile: /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    };
  }

  // Abre WhatsApp Consumer (pessoal)
  function openWhatsappConsumer() {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;
    
    const platform = detectPlatform();
    const cleanNumber = fullNumber.replace('+', '');
    
    if (platform.isAndroid) {
      // Intent específico para WhatsApp Android
      const androidIntent = `intent://send?phone=${cleanNumber}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
      
      // Tenta abrir o intent primeiro
      window.location.href = androidIntent;
      
      // Fallback para wa.me após um delay
      setTimeout(() => {
        const waUrl = `https://wa.me/${fullNumber}`;
        window.open(waUrl, '_blank');
      }, 1500);
      
      showMessage('success', 'Abrindo WhatsApp pessoal...');
    } else if (platform.isIOS) {
      // iOS: tenta o scheme do WhatsApp primeiro
      const iosScheme = `whatsapp://send?phone=${cleanNumber}`;
      
      // Tenta abrir o scheme
      window.location.href = iosScheme;
      
      // Fallback para wa.me
      setTimeout(() => {
        const waUrl = `https://wa.me/${fullNumber}`;
        window.open(waUrl, '_blank');
      }, 1000);
      
      showMessage('success', 'Abrindo WhatsApp...');
    } else {
      // Desktop/Web: usa wa.me diretamente
      const waUrl = `https://wa.me/${fullNumber}`;
      window.open(waUrl, '_blank');
      showMessage('success', 'Abrindo WhatsApp Web...');
    }
  }

  // Abre WhatsApp Business
  function openWhatsappBusiness() {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;
    
    const platform = detectPlatform();
    const cleanNumber = fullNumber.replace('+', '');
    
    if (platform.isAndroid) {
      // Intent específico para WhatsApp Business Android
      const androidIntent = `intent://send?phone=${cleanNumber}#Intent;scheme=whatsapp;package=com.whatsapp.w4b;end`;
      
      // Tenta abrir o intent do WhatsApp Business primeiro
      window.location.href = androidIntent;
      
      // Fallback para wa.me após um delay
      setTimeout(() => {
        const waUrl = `https://wa.me/${fullNumber}`;
        window.open(waUrl, '_blank');
      }, 1500);
      
      showMessage('success', 'Abrindo WhatsApp Business...');
    } else if (platform.isIOS) {
      // iOS: tenta o scheme do WhatsApp Business
      const iosScheme = `whatsapp-business://send?phone=${cleanNumber}`;
      
      // Tenta abrir o scheme
      window.location.href = iosScheme;
      
      // Fallback para wa.me
      setTimeout(() => {
        const waUrl = `https://wa.me/${fullNumber}`;
        window.open(waUrl, '_blank');
      }, 1000);
      
      showMessage('success', 'Abrindo WhatsApp Business...');
    } else {
      // Desktop/Web: usa wa.me (não há diferenciação)
      const waUrl = `https://wa.me/${fullNumber}`;
      window.open(waUrl, '_blank');
      showMessage('success', 'Abrindo WhatsApp Business...');
    }
  }

  // Eventos para os botões
  btnConsumer.addEventListener('click', openWhatsappConsumer);
  if (btnBusiness) {
    btnBusiness.addEventListener('click', openWhatsappBusiness);
  }

  // Opcional: enviar ao pressionar Enter no input (abre WhatsApp padrão)
  phoneInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openWhatsappConsumer();
  });

  // Detecta se só há um WhatsApp instalado e ajusta a UI
  function checkWhatsAppAvailability() {
    const platform = detectPlatform();
    
    if (platform.isAndroid) {
      // No Android, mostra sempre as duas opções
      // O usuário pode escolher qual usar
      console.log('Android detectado - mostrando ambas as opções');
    } else if (platform.isIOS) {
      // No iOS, também mostra as duas opções
      console.log('iOS detectado - mostrando ambas as opções');
    } else {
      // Desktop: pode ocultar o botão Business se desejar
      console.log('Desktop detectado');
    }
  }

  // Inicializa a verificação
  checkWhatsAppAvailability();
});