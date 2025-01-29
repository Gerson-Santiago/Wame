// Configura o display para ser focalizável via JavaScript
const display = document.getElementById("display");
display.setAttribute('tabindex', '0');

// Função para adicionar dígitos no display
function addDigit(digit) {
    if (display.textContent.length < 15) { // Limite de 11 dígitos (+55 incluído)
        display.textContent += digit;
    }
}

// Função para limpar o display
function clearDisplay() {
    display.textContent = "+55";
}

// Função para apagar o último dígito
function backspace() {
    if (display.textContent.length > 3) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

// Função para abrir o WhatsApp
function abrirWhatsApp() {
    const numero = display.textContent.replace('+55', '');
    
    if (numero.length === 11) {
        window.open(`https://wa.me/+55${numero}`, '_blank');
    } else {
        alert("Número inválido! Deve ter 11 dígitos (DDD + número)");
    }
}

// Teclado físico
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/\d/.test(key)) { // Aceita apenas teclas numéricas
        addDigit(key);
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Enter') {
        abrirWhatsApp();
    }
});

// Sistema de colar
display.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData)
        .getData('text')
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/^55/, '') // Remove 55 inicial se existir
        .slice(0, 11); // Mantém apenas os primeiros 11 dígitos

    // Adiciona os dígitos válidos
    for (const digit of text) {
        addDigit(digit);
    }
});

// Validação em tempo real
display.addEventListener('input', () => {
    display.textContent = '+55' + display.textContent
        .replace('+55', '')
        .replace(/\D/g, '')
        .slice(0, 11);
});