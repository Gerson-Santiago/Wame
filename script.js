document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('openWhatsappBtn');
  const countryCode = document.getElementById('countryCode');
  const phoneInput = document.getElementById('phoneNumber');
  const messageBox = document.getElementById('messageBox');
  const messageIcon = document.getElementById('messageIcon');
  const messageText = document.getElementById('messageText');
  const loading = document.getElementById('loading');

  btn.addEventListener('click', () => {
    const code = countryCode.value;
    const number = phoneInput.value.trim();

    if (!number) {
      showMessage('error', 'Por favor, insira um número de telefone.');
      return;
    }

    const fullNumber = code + number;

    // Mostrar loading
    loading.style.display = 'inline-block';
    btn.disabled = true;

    // Tentar abrir no app nativo (vai disparar seletor de apps instalados no SO)
    window.location.href = `whatsapp://send?phone=${fullNumber}`;

    // Fallback: após 1s, abrir no WhatsApp Web
    setTimeout(() => {
      window.open(`https://web.whatsapp.com/send?phone=${fullNumber}`, '_blank');
      loading.style.display = 'none';
      btn.disabled = false;
      showMessage('success', 'Abrindo no WhatsApp Web…');
    }, 1000);
  });

  function showMessage(type, text) {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = type === 'error' ? 'error' : 'check_circle';
    messageText.textContent = text;
    setTimeout(() => {
      messageBox.classList.remove('show');
    }, 3000);
  }
});
