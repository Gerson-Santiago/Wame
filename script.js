document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phoneNumber');
  const countryCode = document.getElementById('countryCode');

  const buttons = {
    consumer: document.getElementById('openConsumerBtn'),
    business: document.getElementById('openBusinessBtn'),
  };

  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');

  // --- Funções utilitárias ---

  const showMessage = (type, text) => {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = type === 'error' ? 'error' : 'check_circle';
    messageText.textContent = text;
    clearTimeout(messageBox.dataset.timeoutId);
    messageBox.dataset.timeoutId = setTimeout(() => {
      messageBox.classList.remove('show');
    }, 3000);
  };

  const getFullNumber = () => {
    const code = countryCode.value;
    const num = phoneInput.value.replace(/\D/g, '');

    if (!num) {
      showMessage('error', 'Digite um número de telefone.');
      return null;
    }

    return `${code}${num}`;
  };

  const openWhatsappLink = (type = 'consumer') => {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;

    let protocol = 'whatsapp';
    if (type === 'business') protocol = 'whatsapp-business';

    // Tenta abrir no app
    window.location.href = `${protocol}://send?phone=${fullNumber}`;

    // Fallback: WhatsApp Web
    setTimeout(() => {
      window.open(`https://wa.me/${fullNumber}`, '_blank');
      showMessage('success', `Tentando abrir no WhatsApp ${type === 'business' ? 'Business' : 'pessoal'}…`);
    }, 800);
  };

  // --- Eventos ---

  buttons.consumer.addEventListener('click', () => openWhatsappLink('consumer'));
  buttons.business.addEventListener('click', () => openWhatsappLink('business'));

  // Opcional: Enter no input envia
  phoneInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') openWhatsappLink('consumer');
  });
});
