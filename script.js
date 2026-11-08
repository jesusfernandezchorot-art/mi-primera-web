function chooseModality(modalityName, cardElement) {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected-card'));
    if (cardElement) {
        cardElement.classList.add('selected-card');
    }

    const label = document.getElementById('selected-modality-text');
    label.innerHTML = 'Opción seleccionada: <strong style="color:#fde68a">' + modalityName + '</strong>.<br>Pulsa WhatsApp o Gmail para enviar tu reserva:';

    const whatsappBtn = document.getElementById('whatsapp-btn');
    const encodedMsg = encodeURIComponent('Hola, he escaneado el código QR y me gustaría reservar/consultar sobre: ' + modalityName);
    whatsappBtn.href = 'https://wa.me/34664731022?text=' + encodedMsg;

    const gmailBtn = document.getElementById('gmail-btn');
    const encodedSubject = encodeURIComponent('Reserva Clases Universitarias: ' + modalityName);
    gmailBtn.href = 'mailto:elenagomezfernandez28@gmail.com?subject=' + encodedSubject + '&body=' + encodedMsg;

    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
}
