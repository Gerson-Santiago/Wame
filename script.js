document.addEventListener('DOMContentLoaded', () => {
  const btnConsumer = document.getElementById('openConsumerBtn');
  const btnBusiness = document.getElementById('openBusinessBtn');
  const countryCode = document.getElementById('countryCode');
  const phoneInput = document.getElementById('phoneNumber');
  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');
  let messageTimeout;

  // Função para mostrar mensagens ao usuário com timeout e limpeza correta
  function showMessage(type, text) {
    clearTimeout(messageTimeout);
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = (type === 'error') ? 'error' : 'check_circle';
    messageText.textContent = text;
    messageTimeout = setTimeout(() => {
      messageBox.classList.remove('show');
    }, 3000);
  }

  // Sanitiza e obtém número completo com código do país
  function getFullNumber() {
    const code = countryCode.value.trim();
    const num = phoneInput.value.trim().replace(/\D/g, ''); // só números

    if (!code) {
      showMessage('error', 'Selecione o código do país.');
      return null;
    }
    if (!num) {
      showMessage('error', 'Digite um número de telefone válido.');
      return null;
    }
    return code + num;
  }

  // Abre link para WhatsApp app ou web com fallback
  function openWhatsapp(type) {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;

    let appUrl;
    let fallbackUrl = `https://wa.me/${fullNumber}`;

    if (type === 'consumer') {
      appUrl = `whatsapp://send?phone=${fullNumber}`;
    } else if (type === 'business') {
      // Abrir direto o link web, que abre app Business se disponível
      appUrl = fallbackUrl;
      fallbackUrl = null; // Sem fallback extra
    } else {
      showMessage('error', 'Tipo inválido para WhatsApp.');
      return;
    }

    // Se appUrl e fallbackUrl forem iguais, só abre uma vez
    if (appUrl === fallbackUrl || !fallbackUrl) {
      window.location.assign(appUrl);
      showMessage('success', `Tentando abrir WhatsApp ${type === 'consumer' ? 'pessoal' : 'Business'}...`);
    } else {
      // Tenta abrir app e depois fallback na web
      window.location.assign(appUrl);
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
        showMessage('success', `Tentando abrir WhatsApp ${type === 'consumer' ? 'pessoal' : 'Business'}...`);
      }, 1000);
    }
  }



  // Eventos dos botões
  btnConsumer.addEventListener('click', () => openWhatsapp('consumer'));
  btnBusiness.addEventListener('click', () => openWhatsapp('business'));
});
