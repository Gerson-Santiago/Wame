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

  function showMessage(type, text) {
    messageBox.className = `message-box show ${type}`;
    messageIcon.textContent = (type === 'error') ? 'error' : 'check_circle';
    messageText.textContent = text;
    setTimeout(() => messageBox.classList.remove('show'), 3000);
  }

  function getFullNumber() {
    const code = countryCode.value;
    const num = phoneInput.value.trim();
    if (!num) { showMessage('error', 'Digite um número de telefone.'); return null; }
    return code + num;
  }

  btnMain.addEventListener('click', () => {
    const full = getFullNumber(); if (!full) return;
    loading.style.display = 'inline-block'; btnMain.disabled = true;

    if (/Android/i.test(navigator.userAgent)) {
      window.location.href = `intent://send/?phone=${full}#Intent;scheme=smsto;end`;
    } else {
      window.location.href = `whatsapp://send?phone=${full}`;
    }

    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      loading.style.display = 'none'; btnMain.disabled = false;
      showMessage('success', 'Abrindo no WhatsApp Web…');
    }, 1000);
  });

  btnConsumer.addEventListener('click', () => {
    const full = getFullNumber(); if (!full) return;
    window.location.href = `whatsapp://send?phone=${full}`;
    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      showMessage('success', 'Tentando abrir no WhatsApp pessoal…');
    }, 800);
  });

  btnBusiness.addEventListener('click', () => {
    const full = getFullNumber(); if (!full) return;
    window.location.href = `whatsapp-business://send?phone=${full}`;
    setTimeout(() => {
      window.open(`https://wa.me/${full}`, '_blank');
      showMessage('success', 'Tentando abrir no WhatsApp Business…');
    }, 800);
  });

});
