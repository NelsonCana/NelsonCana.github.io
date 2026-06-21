// ============================================
// CURSOR PERSONALIZADO
// ============================================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-item, .proyecto-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    follower.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.borderColor = 'var(--accent)';
  });
});

// ============================================
// PARTÍCULAS 3D CON THREE.JS
// ============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 3;

const particleCount = 1200;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

  const tipo = Math.random();
  if (tipo < 0.33) {
    // morado
    colors[i * 3] = 0.75; colors[i * 3 + 1] = 0.15; colors[i * 3 + 2] = 0.83;
  } else if (tipo < 0.66) {
    // rojo
    colors[i * 3] = 0.94; colors[i * 3 + 1] = 0.27; colors[i * 3 + 2] = 0.27;
  } else {
    // violeta
    colors[i * 3] = 0.49; colors[i * 3 + 1] = 0.23; colors[i * 3 + 2] = 0.93;
  }
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.025, vertexColors: true, transparent: true, opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

let mouseNX = 0, mouseNY = 0;
document.addEventListener('mousemove', e => {
  mouseNX = (e.clientX / window.innerWidth - 0.5) * 0.5;
  mouseNY = (e.clientY / window.innerHeight - 0.5) * 0.5;
});

function animate3D() {
  requestAnimationFrame(animate3D);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0003;
  particles.rotation.y += (mouseNX - particles.rotation.y) * 0.001;
  renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// EFECTO ESCRITURA HERO
// ============================================
const frases = [
  "construyendo el futuro con código...",
  "automatizando con IA...",
  "full stack developer...",
  "explorando el cosmos digital...",
  "siempre aprendiendo..."
];
let fraseIndex = 0, charIndex = 0, escribiendo = true;

function typeWriter() {
  const el = document.getElementById('typed');
  const frase = frases[fraseIndex];
  if (escribiendo) {
    el.textContent = frase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === frase.length) { escribiendo = false; setTimeout(typeWriter, 2000); return; }
  } else {
    el.textContent = frase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { escribiendo = true; fraseIndex = (fraseIndex + 1) % frases.length; }
  }
  setTimeout(typeWriter, escribiendo ? 80 : 40);
}
typeWriter();

// ============================================
// TERMINAL INTERACTIVA
// ============================================
const comandos = {
  help: `<span style="color:#c026d3">Comandos disponibles:</span><br>
&nbsp;&nbsp;<span style="color:#a78bfa">whoami</span> &nbsp;&nbsp;&nbsp;— sobre Nelson<br>
&nbsp;&nbsp;<span style="color:#a78bfa">skills</span> &nbsp;&nbsp;&nbsp;— tecnologías<br>
&nbsp;&nbsp;<span style="color:#a78bfa">proyectos</span> — proyectos realizados<br>
&nbsp;&nbsp;<span style="color:#a78bfa">contacto</span> &nbsp;— datos de contacto<br>
&nbsp;&nbsp;<span style="color:#a78bfa">clear</span> &nbsp;&nbsp;&nbsp;&nbsp;— limpiar terminal`,

  whoami: `<span style="color:#22c55e">Nelson Gabriel Caña Cacharuco</span><br>
&nbsp;→ Full Stack Developer<br>
&nbsp;→ Automatización con IA<br>
&nbsp;→ Santiago, Chile 🇨🇱<br>
&nbsp;→ Siempre construyendo algo nuevo`,

  skills: `<span style="color:#22c55e">Stack tecnológico:</span><br>
&nbsp;→ Frontend: HTML, CSS, JS, React, Next.js<br>
&nbsp;→ Backend: Node.js, Python, Django<br>
&nbsp;→ DB: PostgreSQL, MongoDB, Redis<br>
&nbsp;→ IA: TensorFlow, LangChain, APIs`,

  proyectos: `<span style="color:#22c55e">Proyectos:</span><br>
&nbsp;→ Portfolio Personal (este sitio)<br>
&nbsp;→ Bot de Automatización IA<br>
&nbsp;→ Más proyectos en construcción... 🚀`,

  contacto: `<span style="color:#22c55e">Contacto:</span><br>
&nbsp;→ GitHub: github.com/NelsonCana<br>
&nbsp;→ LinkedIn: linkedin.com/in/nelson-caña<br>
&nbsp;→ Email: nelson@tucorreo.com`
};

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

terminalInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';

    const lineCmd = document.createElement('p');
    lineCmd.innerHTML = `<span class="t-green">nelson@cosmos</span><span class="t-white">:</span><span class="t-blue">~</span><span class="t-white">$</span> ${cmd}`;
    terminalOutput.appendChild(lineCmd);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const respuesta = document.createElement('p');
    respuesta.classList.add('t-response');
    respuesta.innerHTML = comandos[cmd] || `<span style="color:#ef4444">Comando no encontrado: ${cmd}. Escribe 'help'</span>`;
    terminalOutput.appendChild(respuesta);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});

// ============================================
// SCROLL REVEAL ANIMACIONES
// ============================================
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-item, .proyecto-card, .contacto-item, .form-group').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ============================================
// FORMULARIO
// ============================================
function enviarFormulario(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✅ Mensaje enviado!';
  setTimeout(() => { btn.textContent = 'Enviar mensaje →'; e.target.reset(); }, 3000);
}

// MENÚ HAMBURGUESA
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});