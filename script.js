document.addEventListener('DOMContentLoaded', () => {
  const btnConsumer = document.getElementById('openConsumerBtn');
  const btnBusiness = document.getElementById('openBusinessBtn');
  const countryCode = document.getElementById('countryCode');
  const phoneInput = document.getElementById('phoneNumber');
  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');

  // Função para mostrar mensagens para o usuário
  function showMessage(type, text) {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = (type === 'error') ? 'error' : 'check_circle';
    messageText.textContent = text;
    setTimeout(() => messageBox.classList.remove('show'), 3000);
  }

  // Sanitiza e obtém o número completo
  function getFullNumber() {
    const code = countryCode.value.trim();
    const num = phoneInput.value.trim().replace(/\D/g, ''); // só números
    if (!num) {
      showMessage('error', 'Digite um número de telefone válido.');
      return null;
    }
    return code + num;
  }

  // Abre link com fallback para WhatsApp Web
  function openWhatsapp(type) {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;

    let appUrl;
    if (type === 'consumer') {
      appUrl = `whatsapp://send?phone=${fullNumber}`;
    } else if (type === 'business') {
      appUrl = `whatsapp-business://send?phone=${fullNumber}`;
    } else {
      showMessage('error', 'Tipo inválido para WhatsApp.');
      return;
    }

    // Tenta abrir o app WhatsApp (pessoal ou business)
    window.location.href = appUrl;

    // Após 1 segundo, abre fallback no WhatsApp Web
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
      showMessage('success', `Tentando abrir no WhatsApp ${type === 'consumer' ? 'pessoal' : 'Business'}...`);
    }, 1000);
  }

  // Eventos dos botões
  btnConsumer.addEventListener('click', () => openWhatsapp('consumer'));
  btnBusiness.addEventListener('click', () => openWhatsapp('business'));
});
