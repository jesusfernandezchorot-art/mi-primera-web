// Configuración de las 2 asignaturas: Estadística (c=1) y Estadística Avanzada (c=2)
const COURSES = {
    '1': {
        name: 'Estadística',
        hookTitle: '¿Atascado con ESTADÍSTICA?',
        degrees: 'Grados: Turismo • ADE • Finanzas y Contabilidad • Criminología • Sociología • Análisis Económico',
        intHeading: 'Intensivo para el Examen de Estadística',
        indHeading: 'Clase Individual de Estadística',
        grpHeading: 'Clase en Grupo de Estadística',
        bulletsInt: [
            '✔️ <strong>18 horas el curso completo</strong>, dividido en <strong>2 o 3 horas semanales</strong> desde diciembre hasta la primera semana de enero.',
            '✔️ <strong>Ejercicios resueltos del boletín</strong> de Estadística paso a paso.',
            '✔️ <strong>Apuntes completos, formularios y documentos</strong> enfocados al examen de enero.',
            '✔️ Adaptado a Turismo, ADE, Finanzas y Contabilidad, Criminología, Sociología y Análisis Económico.'
        ],
        bulletsInd: [
            '✔️ Clases particulares 1 a 1 (tú solo con la profesora Elena) de <strong>Estadística</strong>.',
            '✔️ Resolución personalizada de los <strong>ejercicios del boletín</strong> de tu grado.',
            '✔️ <strong>Apuntes, documentos de apoyo</strong> y preparación intensiva de tus dudas.',
            '✔️ Opción de clase suelta (18 €/h) o <strong>Bono de 5 clases por 80 € (16 €/clase)</strong>.'
        ],
        bulletsGrp: [
            '✔️ Grupo reducido de <strong>3 a 4 personas</strong> de <strong>Estadística</strong>.',
            '✔️ Explicación práctica del temario y resolución conjunta de <strong>ejercicios del boletín</strong>.',
            '✔️ Incluye <strong>apuntes, documentos</strong> y práctica de exámenes reales.',
            '✔️ Tarifa de grupo completo: <strong>40 €</strong> (entre 3 y 4 compañeros).'
        ]
    },
    '2': {
        name: 'Estadística Avanzada',
        hookTitle: 'Aprueba ESTADÍSTICA AVANZADA',
        degrees: 'Estadística Avanzada • Estadística para Finanzas',
        intHeading: 'Intensivo para el Examen de Estadística Avanzada',
        indHeading: 'Clase Individual de Estadística Avanzada',
        grpHeading: 'Clase en Grupo de Estadística Avanzada',
        bulletsInt: [
            '✔️ <strong>18 horas el curso completo</strong>, dividido en <strong>2 o 3 horas semanales</strong> desde diciembre hasta la primera semana de enero.',
            '✔️ <strong>Ejercicios resueltos del boletín</strong> de Estadística Avanzada paso a paso.',
            '✔️ <strong>Apuntes completos, documentos</strong> y modelos de examen resueltos de cara a enero.',
            '✔️ Especializado en Estadística Avanzada y Estadística para Finanzas.'
        ],
        bulletsInd: [
            '✔️ Clases particulares 1 a 1 (tú solo con la profesora Elena) de <strong>Estadística Avanzada</strong>.',
            '✔️ Resolución paso a paso de los <strong>ejercicios del boletín</strong> y prácticas de tu asignatura.',
            '✔️ <strong>Apuntes, documentos</strong> y preparación a medida de tus exámenes.',
            '✔️ Opción de clase suelta (18 €/h) o <strong>Bono de 5 clases por 80 € (16 €/clase)</strong>.'
        ],
        bulletsGrp: [
            '✔️ Grupo reducido de <strong>3 a 4 personas</strong> de <strong>Estadística Avanzada</strong>.',
            '✔️ Explicación detallada del temario y resolución de <strong>ejercicios del boletín</strong>.',
            '✔️ Incluye <strong>apuntes, documentos</strong> y preparación de exámenes.',
            '✔️ Tarifa de grupo completo: <strong>40 €</strong> (entre 3 y 4 compañeros).'
        ]
    }
};

// Detectar asignatura por parámetro (?c=1 o ?c=2) o por variable global
const urlParams = new URLSearchParams(window.location.search);
const courseKey = window.FORCED_COURSE || urlParams.get('c') || '1';
const activeCourse = COURSES[courseKey] || COURSES['1'];

// Comprobación automática de fecha límite del descuento: 20 de noviembre de 2026 a las 23:59:59
const DISCOUNT_DEADLINE = new Date('2026-11-20T23:59:59+01:00');
function isPromoValid() {
    return new Date() <= DISCOUNT_DEADLINE;
}

let selectedModalityTitle = '';
let selectedModalityPrice = '';
let selectedChannel = 'whatsapp';

function initPage() {
    document.title = 'Clases Particulares - ' + activeCourse.name;
    document.getElementById('course-hook-title').textContent = activeCourse.hookTitle;
    document.getElementById('course-degrees-subtitle').textContent = activeCourse.degrees;
    document.getElementById('tag-exam-label').textContent = '🎯 Especial Exámenes de Enero • ' + activeCourse.name;
    document.getElementById('card-int-heading').textContent = activeCourse.intHeading;
    document.getElementById('card-ind-heading').textContent = activeCourse.indHeading;
    document.getElementById('card-grp-heading').textContent = activeCourse.grpHeading;
    document.getElementById('footer-course-text').textContent = '🎓 Clases Particulares de ' + activeCourse.name + ' • Curso 2026 / 2027';

    // Actualizar enlaces generales de contacto con el nombre de la asignatura
    const defaultMsg = encodeURIComponent('Hola Elena, he escaneado el código QR de ' + activeCourse.name + ' y me gustaría recibir información sobre las clases.');
    document.getElementById('main-wa-btn').href = 'https://wa.me/34664731022?text=' + defaultMsg;
    document.getElementById('main-gm-btn').href = 'mailto:elenagomezfernandez28@gmail.com?subject=' + encodeURIComponent('Información Clases de ' + activeCourse.name) + '&body=' + defaultMsg;

    // Aplicar estado del descuento del 10% según si estamos antes o después del 20 de noviembre a las 23:59
    if (isPromoValid()) {
        document.getElementById('promo-ribbon-banner').classList.remove('hidden');
        document.getElementById('int-price-label').textContent = 'Con 10% Dto. (hasta 20 nov)';
        document.getElementById('int-price-box').innerHTML = '<span class="old-price">120 €</span><span class="new-price">108 €</span>';
        document.getElementById('int-price-sub').textContent = 'Precio sin dto.: 120 €';
    } else {
        document.getElementById('promo-ribbon-banner').classList.add('hidden');
        document.getElementById('int-price-label').textContent = 'Precio Curso Completo';
        document.getElementById('int-price-box').innerHTML = '<span class="new-price">120 €</span>';
        document.getElementById('int-price-sub').textContent = '18 horas en total';
    }
}

function openModalityDetail(type) {
    const badge = document.getElementById('detail-badge');
    const title = document.getElementById('detail-title');
    const desc = document.getElementById('detail-description');
    const bullets = document.getElementById('detail-bullets');
    const priceBox = document.getElementById('detail-price-box');
    const indBtns = document.getElementById('detail-ind-buttons');
    const singleBtn = document.getElementById('detail-single-btn');

    let bulletList = [];

    if (type === 'intensivo') {
        badge.textContent = '🎯 Intensivo Exámenes de Enero • ' + activeCourse.name;
        title.textContent = activeCourse.intHeading;
        desc.textContent = 'Intensivo enfocado a superar los exámenes de enero de ' + activeCourse.name + '. Consta de 2 o 3 horas semanales desde diciembre hasta la primera semana de enero (18 horas el curso completo).';
        bulletList = activeCourse.bulletsInt;
        indBtns.classList.add('hidden');
        singleBtn.classList.remove('hidden');

        if (isPromoValid()) {
            priceBox.innerHTML = '💶 Precio: <s>120 €</s> <strong>108 €</strong> (10% de descuento reservando antes del 20 de noviembre).';
            selectedModalityTitle = activeCourse.intHeading + ' (18h curso completo)';
            selectedModalityPrice = '108 € con el 10% de descuento';
        } else {
            priceBox.innerHTML = '💶 Precio del curso completo (18 horas): <strong>120 €</strong>.';
            selectedModalityTitle = activeCourse.intHeading + ' (18h curso completo)';
            selectedModalityPrice = '120 €';
        }
    } else if (type === 'individual') {
        badge.textContent = '👤 Modalidad Individual (Tú solo) • ' + activeCourse.name;
        title.textContent = activeCourse.indHeading;
        desc.textContent = 'Clases particulares individuales adaptadas al 100% a tus necesidades en ' + activeCourse.name + ', con ejercicios resueltos del boletín, apuntes y documentos.';
        bulletList = activeCourse.bulletsInd;
        priceBox.innerHTML = '💶 Precio: <strong>18 € / hora</strong> suelta • ⭐ <strong>Bono de 5 clases por 80 €</strong> (sale a <strong>16 € la clase</strong>).';
        indBtns.classList.remove('hidden');
        singleBtn.classList.add('hidden');
    } else {
        badge.textContent = '👥 Modalidad en Grupo (3 a 4 personas) • ' + activeCourse.name;
        title.textContent = activeCourse.grpHeading;
        desc.textContent = 'Clases en grupo reducido de 3 a 4 personas para ' + activeCourse.name + ', con resolución de ejercicios del boletín, apuntes y preparación de exámenes.';
        bulletList = activeCourse.bulletsGrp;
        priceBox.innerHTML = '💶 Precio del grupo (3 a 4 personas): <strong>40 €</strong>.';
        indBtns.classList.add('hidden');
        singleBtn.classList.remove('hidden');
        selectedModalityTitle = activeCourse.grpHeading + ' (Grupo de 3 a 4 personas)';
        selectedModalityPrice = '40 €';
    }

    bullets.innerHTML = bulletList.map(item => '<li>' + item + '</li>').join('');
    showStep('view-detail');
}

function proceedToElenaNotice(indOption) {
    if (indOption === 'individual-1h') {
        selectedModalityTitle = activeCourse.indHeading + ' (Clase Individual)';
        selectedModalityPrice = '18 € / hora';
    } else if (indOption === 'individual-bono') {
        selectedModalityTitle = 'Bono 5 Clases Individuales de ' + activeCourse.name;
        selectedModalityPrice = '80 € (5 clases • 16 €/clase)';
    }

    document.getElementById('confirm-modality-title').textContent = selectedModalityTitle;
    document.getElementById('confirm-modality-price').textContent = '💶 Tarifa: ' + selectedModalityPrice;
    showStep('view-confirm');
}

function selectChannel(ch) {
    selectedChannel = ch;
    document.getElementById('ch-whatsapp').classList.toggle('active', ch === 'whatsapp');
    document.getElementById('ch-gmail').classList.toggle('active', ch === 'gmail');
}

function finalizeBooking() {
    const msgText = 'Hola Elena, quiero reservar plaza para: ' + selectedModalityTitle + ' (' + selectedModalityPrice + '). Por favor, ponte en contacto conmigo.';
    const encodedMsg = encodeURIComponent(msgText);
    const encodedSubj = encodeURIComponent('Reserva de Clase: ' + selectedModalityTitle);

    const waUrl = 'https://wa.me/34664731022?text=' + encodedMsg;
    const mailtoUrl = 'mailto:elenagomezfernandez28@gmail.com?subject=' + encodedSubj + '&body=' + encodedMsg;

    document.getElementById('booked-modality-label').textContent = selectedModalityTitle + ' (' + selectedModalityPrice + ')';
    document.getElementById('final-wa-link').href = waUrl;
    document.getElementById('final-gm-link').href = mailtoUrl;

    showStep('view-booked');

    if (selectedChannel === 'whatsapp') {
        window.open(waUrl, '_blank');
    } else {
        triggerEmailCrossDevice(mailtoUrl, encodedSubj, encodedMsg);
    }
}

function openEmailFallback(event, mailtoHref) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
        event.preventDefault();
        const urlParts = mailtoHref.split('?');
        const params = new URLSearchParams(urlParts[1] || '');
        const su = params.get('subject') || ('Reserva de Clases de ' + activeCourse.name);
        const body = params.get('body') || ('Hola Elena, me gustaría recibir información sobre las clases de ' + activeCourse.name + '.');
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

function showStep(stepId) {
    ['view-list', 'view-detail', 'view-confirm', 'view-booked'].forEach(id => {
        document.getElementById(id).classList.toggle('hidden', id !== stepId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

initPage();
