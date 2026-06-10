// ===== ANIMAÇÃO DE ENTRADA =====
document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.icone, .foto-card, .musica-item, .timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.classList.contains('timeline-item')
          ? 'translateX(0)' : 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transform = el.classList.contains('timeline-item') ? 'translateX(-20px)' : 'translateY(20px)';
    observer.observe(el);
  });

  // ===== CHUVA DE ESTRELAS E CORAÇÕES =====
  const canvas = document.getElementById('particulas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const simbolos = ['★', '✦', '♡', '❤', '✧', '⋆', '♥'];
  const cores = ['#D4A0A0', '#F0E6D3', '#ffffff', '#e8c4c4', '#ffb6c1'];

  const particulas = [];

  for (let i = 0; i < 60; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      simbolo: simbolos[Math.floor(Math.random() * simbolos.length)],
      cor: cores[Math.floor(Math.random() * cores.length)],
      tamanho: Math.random() * 16 + 8,
      velocidade: Math.random() * 1.2 + 0.4,
      opacidade: Math.random() * 0.6 + 0.2,
      oscilacao: Math.random() * 2 - 1,
      angulo: Math.random() * Math.PI * 2,
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach(p => {
      p.y += p.velocidade;
      p.angulo += 0.01;
      p.x += Math.sin(p.angulo) * p.oscilacao;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.globalAlpha = p.opacidade;
      ctx.fillStyle = p.cor;
      ctx.font = `${p.tamanho}px serif`;
      ctx.fillText(p.simbolo, p.x, p.y);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animar);
  }

  animar();
});