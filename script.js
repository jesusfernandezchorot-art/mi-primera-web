let count = 0;
const clickBtn = document.getElementById('click-btn');
const themeBtn = document.getElementById('theme-btn');
const message = document.getElementById('message');

clickBtn.addEventListener('click', () => {
    count++;
    clickBtn.textContent = `¡Haz clic aquí! (${count})`;
    message.classList.remove('hidden');

    if (count === 1) {
        message.textContent = '🎉 ¡Genial! Acabas de ejecutar tu primera acción interactiva.';
    } else if (count < 5) {
        message.textContent = `Llevas ${count} clics. ¡Todo funciona de maravilla!`;
    } else {
        message.textContent = `🔥 ¡${count} clics! Esta web ya está lista para guardarse en GitHub.`;
    }
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? 'Cambiar tema ☀️' : 'Cambiar tema 🌙';
});
