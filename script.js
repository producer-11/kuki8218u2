document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  const czas = document.getElementById('czas');

  btn.addEventListener('click', () => {
    const now = new Date().toLocaleString('pl-PL');
    czas.textContent = `Ostatnie kliknięcie: ${now}`;
  });
});
