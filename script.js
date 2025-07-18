document.addEventListener('DOMContentLoaded', () => {
  const btnMain = document.getElementById('openWhatsappBtn');
  const btnConsumer = document.getElementById('openConsumerBtn');
  const btnBusiness = document.getElementById('openBusinessBtn');
  const countryCode = document.getElementById('countryCode');
  const phoneInput = document.getElementById('phoneNumber');
  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');
  const loading = document.getElementById('loading');

  // Função para mostrar mensagens na interface
  function showMessage(type, text) {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = type === 'error' ? 'error' : 'check_circle';
    messageText.textContent = text;
    setTimeout(() => {
      messageBox.classList.remove('show');
    }, 3000);
  }

  // Validação do número
  function getFullNumber() {
    const code = countryCode.value;
    const number = phoneInput.value.trim();
    if (!number) {
      showMessage('error', 'Por favor, insira um número de telefone.');
      return null;
    }
    return code + number;
  }

  // Ação padrão (tentar ambos, não garante chooser)
  btnMain.addEventListener('click', () => {
    const full = getFullNumber();
    if (!full) return;

    loading.style.display = 'inline-block';
    btnMain.disabled = true;

    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = `intent://send/?phone=${full}#Intent;scheme=smsto;end`;
    } else {
      window.location.href = `whatsapp://send?phone=${full}`;
    }

    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      loading.style.display = 'none';
      btnMain.disabled = false;
      showMessage('success', 'Abrindo no WhatsApp Web…');
    }, 1000);
  });

  // Botão *WhatsApp normal*
  btnConsumer.addEventListener('click', () => {
    const full = getFullNumber();
    if (!full) return;

    window.location.href = `whatsapp-consumer://send?phone=${full}`;
    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      showMessage('success', 'Tentando abrir no WhatsApp…');
    }, 800);
  });

  // Botão *WhatsApp Business*
  btnBusiness.addEventListener('click', () => {
    const full = getFullNumber();
    if (!full) return;

    window.location.href = `whatsapp://send?phone=${full}`;
    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      showMessage('success', 'Tentando abrir no WhatsApp Business…');
    }, 800);
  });
});
