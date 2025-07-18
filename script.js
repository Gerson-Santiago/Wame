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

    if (type === 'consumer') {
      appUrl = `whatsapp://send?phone=${fullNumber}`;
    } else if (type === 'business') {
      // WhatsApp Business app nem sempre aceita whatsapp-business://
      // Usar whatsapp:// com parâmetro business
      appUrl = `whatsapp://send?phone=${fullNumber}&app=business`;
    } else {
      showMessage('error', 'Tipo inválido para WhatsApp.');
      return;
    }

    // Tenta abrir app WhatsApp
    window.location.assign(appUrl);

    // Após 1 segundo abre fallback no WhatsApp Web
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
      showMessage('success', `Tentando abrir no WhatsApp ${type === 'consumer' ? 'pessoal' : 'Business'}...`);
    }, 1000);
  }

  // Eventos dos botões
  btnConsumer.addEventListener('click', () => openWhatsapp('consumer'));
  btnBusiness.addEventListener('click', () => openWhatsapp('business'));
});
