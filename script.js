const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}
let initialTheme = 'dark';
try { initialTheme = localStorage.getItem('ae-theme') || 'dark'; } catch {}
setTheme(initialTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(theme);
  try { localStorage.setItem('ae-theme', theme); } catch {}
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(item => {
    item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
    if (!item.hidden) count++;
  });
  document.querySelector('.filter-status').textContent = `${count} tools shown`;
}));
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('ahmed.emad.a.e.m@gmail.com'); status.textContent = 'Copied!'; }
  catch { status.textContent = 'Select the email address above to copy it.'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();
function updateClock() {
  document.querySelector('#cairo-time').textContent = new Intl.DateTimeFormat('en-GB', {timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false}).format(new Date()) + ' local time';
}
updateClock();
setInterval(updateClock, 60000);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('nav a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }
  }), {rootMargin: '-20% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Enhanced motion and profile exploration — original, dependency-free interactions.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const typedRole = document.querySelector('#typed-role');
const profileRoles = ['Web Penetration Testing', 'Android Security Analysis', 'Active Directory Security', 'SOC Operations & Threat Analysis', 'Python Security Automation'];
let roleIndex = 0;
let characterIndex = profileRoles[0].length;
let deletingRole = true;
let typingTimer;
function typeRole() {
  if (motionPreference.matches || document.hidden) return;
  const role = profileRoles[roleIndex];
  characterIndex += deletingRole ? -1 : 1;
  typedRole.textContent = role.slice(0, Math.max(characterIndex, 0));
  let delay = deletingRole ? 30 : 60;
  if (characterIndex <= 0) {
    roleIndex = (roleIndex + 1) % profileRoles.length;
    deletingRole = false;
    delay = 280;
  } else if (characterIndex >= role.length) {
    deletingRole = true;
    delay = 2200;
  }
  typingTimer = setTimeout(typeRole, delay);
}
function resumeTyping() {
  clearTimeout(typingTimer);
  if (motionPreference.matches) { typedRole.textContent = profileRoles[0]; characterIndex = profileRoles[0].length; deletingRole = true; return; }
  if (!document.hidden) typingTimer = setTimeout(typeRole, 2200);
}
resumeTyping();
document.addEventListener('visibilitychange', resumeTyping);
motionPreference.addEventListener('change', resumeTyping);

const progressBar = document.querySelector('.scroll-progress');
const siteHeader = document.querySelector('.header');
let scrollPending = false;
function paintScroll() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
  progressBar.style.transform = `scaleX(${progress})`;
  siteHeader.classList.toggle('scrolled', scrollY > 30);
  scrollPending = false;
}
addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(paintScroll); }
}, {passive: true});
paintScroll();

if ('IntersectionObserver' in window && !motionPreference.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -25px 0px'});
  document.querySelectorAll('.section-heading, .about-grid, .expertise-card, .toolkit, .project-feature, .interactive-terminal, .experience, .credential, .credential-row, .contact-grid, .highlight-card').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('revealed'));
  });
}

if (finePointer.matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (motionPreference.matches) return;
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${(0.5 - y / bounds.height) * 4}deg) rotateY(${(x / bounds.width - 0.5) * 4}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

const countElement = document.querySelector('.count-up');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const counterObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    const started = performance.now();
    const goal = Number(countElement.dataset.count);
    const tick = now => {
      const fraction = Math.min((now - started) / 1100, 1);
      countElement.textContent = String(Math.round(goal * (1 - (1 - fraction) ** 3)));
      if (fraction < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.disconnect();
  }, {threshold: 0.6});
  counterObserver.observe(countElement);
}

// These commands show static profile information; no shell execution or network requests.
const terminalOutput = document.querySelector('#terminal-output');
const terminalInput = document.querySelector('#terminal-input');
const terminalResponses = {
  help: 'Available commands:\n  whoami      Profile summary\n  skills      Security & development toolkit\n  experience  Current roles & training\n  projects    Featured public project\n  education   Academic background\n  contact     Get in touch\n  clear       Clear this terminal',
  whoami: 'Ahmed Emad | Cybersecurity Engineer\nWeb, mobile & Active Directory penetration testing.\nSOC experience + a background in software development.\nBased in Cairo, Egypt.',
  skills: 'OFFENSIVE  Burp Suite · Nmap · BloodHound · Impacket · ffuf\nMOBILE     Frida · JADX · Drozer\nANALYSIS   Wireshark · SIEM workflows · CVSS reporting\nBUILD      Python · Kotlin · Java · KMP · Jetpack Compose\nWORKSPACE  Linux · Docker · Git · Bash',
  experience: 'CURRENT  Cyber Security Analyst Intern — Telecom Egypt\nCURRENT  IT Operations Specialist — Samco\nTRAINING Penetration Testing — We Innovate / ZeroSploit\nPREVIOUS Mobile Development & IT Support\n\nFull dates and responsibilities are in the Experience section.',
  projects: 'ReconX — scoped reconnaissance orchestration\nGo CLI + local web dashboard + resumable checkpoints.\nHTML / JSON reports; candidate signals need validation.\n\nRepository: github.com/unsocialz2/reconx',
  education: 'Bachelor of Computer Science | Benha University\n2018–2022 · Grade: Excellent (H)\n\nHTB Web Penetration Tester Path: 100% completed\nGoogle Cybersecurity & IT Support Certificates\nMeta Android Developer Certificate',
  contact: 'Email: ahmed.emad.a.e.m@gmail.com\nLinkedIn: linkedin.com/in/a-e-m2024\nGitHub profile: github.com/WinchesterxZ'
};
function runProfileCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command) return;
  if (command === 'clear') { terminalOutput.replaceChildren(); terminalInput.value = ''; return; }
  const prompt = document.createElement('p');
  prompt.className = 'terminal-command';
  prompt.textContent = `~ $ ${raw.trim()}`;
  const response = document.createElement('p');
  response.className = 'terminal-response';
  response.textContent = terminalResponses[command] || `Unknown command: ${raw.trim()}\nType help for available profile commands.`;
  terminalOutput.append(prompt, response);
  while (terminalOutput.children.length > 24) terminalOutput.firstElementChild.remove();
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  terminalInput.value = '';
}
document.querySelector('#terminal-form').addEventListener('submit', event => { event.preventDefault(); runProfileCommand(terminalInput.value); });
document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => runProfileCommand(button.dataset.command)));

// Lightweight ambient network: pauses off-screen, in background tabs, and for reduced motion.
const networkCanvas = document.querySelector('#network-canvas');
const networkContext = networkCanvas.getContext('2d');
let networkFrame = 0;
let networkPoints = [];
let lastNetworkFrame = 0;
function sizeNetwork() {
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  networkCanvas.width = Math.round(innerWidth * ratio);
  networkCanvas.height = Math.round(innerHeight * ratio);
  networkContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  const total = innerWidth < 760 ? 18 : 38;
  networkPoints = Array.from({length: total}, () => ({x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16}));
}
function drawNetwork(now) {
  if (document.hidden || motionPreference.matches) { networkFrame = 0; return; }
  networkFrame = requestAnimationFrame(drawNetwork);
  if (now - lastNetworkFrame < 40) return;
  lastNetworkFrame = now;
  networkContext.clearRect(0, 0, innerWidth, innerHeight);
  const light = document.documentElement.dataset.theme === 'light';
  networkPoints.forEach(point => {
    point.x += point.vx; point.y += point.vy;
    if (point.x < 0 || point.x > innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > innerHeight) point.vy *= -1;
    networkContext.fillStyle = light ? 'rgba(8,121,107,.3)' : 'rgba(82,229,206,.3)';
    networkContext.beginPath(); networkContext.arc(point.x, point.y, 1.2, 0, Math.PI * 2); networkContext.fill();
  });
  for (let i = 0; i < networkPoints.length; i++) for (let j = i + 1; j < networkPoints.length; j++) {
    const a = networkPoints[i], b = networkPoints[j];
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (distance > 145) continue;
    networkContext.strokeStyle = `rgba(${light ? '8,121,107' : '82,229,206'},${(1 - distance / 145) * .13})`;
    networkContext.beginPath(); networkContext.moveTo(a.x, a.y); networkContext.lineTo(b.x, b.y); networkContext.stroke();
  }
}
function resumeNetwork() {
  cancelAnimationFrame(networkFrame); networkFrame = 0;
  if (!document.hidden && !motionPreference.matches) networkFrame = requestAnimationFrame(drawNetwork);
}
if (networkContext) {
  sizeNetwork(); resumeNetwork();
  addEventListener('resize', sizeNetwork, {passive: true});
  document.addEventListener('visibilitychange', resumeNetwork);
  motionPreference.addEventListener('change', resumeNetwork);
}
