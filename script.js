let currentModality = '';
let currentDetails = '';
let currentPrice = '';
let selectedChannel = 'whatsapp';

function openReservationStep(title, details, price) {
    currentModality = title;
    currentDetails = details;
    currentPrice = price;

    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-desc').textContent = details;
    document.getElementById('confirm-price').textContent = '💶 Tarifa: ' + price;

    document.getElementById('main-view').classList.add('hidden');
    document.getElementById('success-view').classList.add('hidden');
    document.getElementById('confirm-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectChannel(channel) {
    selectedChannel = channel;
    document.getElementById('ch-whatsapp').classList.toggle('active', channel === 'whatsapp');
    document.getElementById('ch-gmail').classList.toggle('active', channel === 'gmail');
}

function completeReservation() {
    const msgText = 'Hola Elena, quiero reservar plaza para: ' + currentModality + ' (' + currentPrice + '). Por favor, ponte en contacto conmigo.';
    const encodedMsg = encodeURIComponent(msgText);
    const encodedSubj = encodeURIComponent('Reserva de Clase: ' + currentModality);

    const waUrl = 'https://wa.me/34664731022?text=' + encodedMsg;
    const mailtoUrl = 'mailto:elenagomezfernandez28@gmail.com?subject=' + encodedSubj + '&body=' + encodedMsg;

    document.getElementById('success-modality-name').textContent = currentModality;
    document.getElementById('direct-wa-final').href = waUrl;
    document.getElementById('direct-gm-final').href = mailtoUrl;

    // Mostrar pantalla de Clase Reservada
    document.getElementById('confirm-view').classList.add('hidden');
    document.getElementById('success-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Lanzar automáticamente el mensaje hacia el teléfono o correo de Elena
    if (selectedChannel === 'whatsapp') {
        window.open(waUrl, '_blank');
    } else {
        triggerEmailCrossDevice(mailtoUrl, encodedSubj, encodedMsg);
    }
}

function openEmailFallback(event, mailtoHref) {
    // Permite que en móviles se abra la app de correo y en ordenadores sin gestor de correo abra Gmail Web si es necesario
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
        event.preventDefault();
        const urlParts = mailtoHref.split('?');
        const params = new URLSearchParams(urlParts[1] || '');
        const su = params.get('subject') || 'Reserva de Clases Particulares';
        const body = params.get('body') || 'Hola Elena, me gustaría recibir información sobre las clases.';
        const gmailWebUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=elenagomezfernandez28@gmail.com&su=' + encodeURIComponent(su) + '&body=' + encodeURIComponent(body);
        window.open(gmailWebUrl, '_blank');
    }
}

function triggerEmailCrossDevice(mailtoUrl, encodedSubj, encodedMsg) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = mailtoUrl;
    } else {
        const gmailWebUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=elenagomezfernandez28@gmail.com&su=' + encodedSubj + '&body=' + encodedMsg;
        window.open(gmailWebUrl, '_blank');
    }
}

function goBackToMain() {
    document.getElementById('confirm-view').classList.add('hidden');
    document.getElementById('success-view').classList.add('hidden');
    document.getElementById('main-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
