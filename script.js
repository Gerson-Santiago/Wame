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
    }, 3000);
  }

  // Obtem número completo (código + telefone) sanitizado
  function getFullNumber() {
    const code = countryCode.value.trim();
    const num = phoneInput.value.trim().replace(/\D/g, '');
    if (!num) {
      showMessage('error', 'Digite um número de telefone válido.');
      return null;
    }
    return `${code}${num}`;
  }

  // Abre link wa.me em nova aba
  function openWhatsapp() {
    const fullNumber = getFullNumber();
    if (!fullNumber) return;
    const waUrl = `https://wa.me/${fullNumber}`;
    window.open(waUrl, '_blank');
    showMessage('success', 'Abrindo WhatsApp... Escolha o app desejado no navegador.');
  }

  // Eventos para os dois botões, mesmos comportamento
  btnConsumer.addEventListener('click', openWhatsapp);
  btnBusiness.addEventListener('click', openWhatsapp);

  // Opcional: enviar ao pressionar Enter no input
  phoneInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openWhatsapp();
  });
});
