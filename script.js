document.addEventListener("DOMContentLoaded", () => {
  const target = new Date(WEDDING_DATE).getTime();
  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };
  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      Object.values(els).forEach(el => el.textContent = "0");
      return;
    }
    els.days.textContent = Math.floor(diff / 86400000);
    els.hours.textContent = Math.floor((diff / 3600000) % 24);
    els.minutes.textContent = Math.floor((diff / 60000) % 60);
    els.seconds.textContent = Math.floor((diff / 1000) % 60);
  }
  tick(); setInterval(tick,1000);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("visible"); });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const form = document.getElementById("rsvpForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const attendance = document.getElementById("attendance").value;
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`RSVP — Ana & Daniel — ${name}`);
    const body = encodeURIComponent(`Nome(s): ${name}\nPresença: ${attendance}\nMensagem: ${message}`);
    const notice = document.getElementById("rsvpNotice");
    if(RSVP_EMAIL.includes("COLOCA_AQUI")){
      notice.textContent = "O formulário está pronto. Falta apenas colocar o vosso email no ficheiro config.js.";
      return;
    }
    window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
  });
});
