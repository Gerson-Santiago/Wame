// Função para adicionar dígitos no display
function addDigit(digit) {
    const display = document.getElementById("display");
    display.textContent += digit;
}

// Função para limpar o display
function clearDisplay() {
    const display = document.getElementById("display");
    display.textContent = "+55";
}

// Função para apagar o último dígito
function backspace() {
    const display = document.getElementById("display");
    if (display.textContent.length > 3) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

// Função para abrir o WhatsApp
function abrirWhatsApp() {
    const display = document.getElementById("display").textContent;
    const numero = display.replace('+55', '');

    if (numero.length >= 10) {
        const link = `https://wa.me/+55${numero}`;
        window.open(link, '_blank');
    } else {
        alert("Por favor, insira um número válido.");
    }
}

// Event listener para capturar teclas do teclado físico
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (!isNaN(key)) {
        // Se for um número (0-9)
        addDigit(key);
    } else if (key === 'Backspace') {
        // Se for a tecla de backspace
        backspace();
    } else if (key === 'Enter') {
        // Se for a tecla Enter
        abrirWhatsApp();
    }
});
