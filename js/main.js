/* ============================================================
   Andi Lau — Portofolio
   Interaksi: navigasi, animasi reveal, typing, counter
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Tahun footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header saat scroll ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  function closeMenu() {
    if (!links) return;
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Link aktif sesuai posisi scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  function updateActiveLink() {
    var pos = window.scrollY + 120;
    var current = sections.length ? sections[0].id : '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ---------- Animasi reveal saat masuk viewport ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () { el.classList.add('visible'); }, i * 90);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Efek mengetik ---------- */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var words = ['Fullstack Developer', 'Network Engineer', 'IT Support', 'Designer'];
    var wIndex = 0, cIndex = 0, deleting = false;

    function type() {
      var word = words[wIndex];
      typedEl.textContent = word.substring(0, cIndex);

      if (!deleting && cIndex < word.length) {
        cIndex++;
        setTimeout(type, 90);
      } else if (deleting && cIndex > 0) {
        cIndex--;
        setTimeout(type, 45);
      } else {
        if (!deleting) {
          deleting = true;
          setTimeout(type, 1600);
        } else {
          deleting = false;
          wIndex = (wIndex + 1) % words.length;
          setTimeout(type, 350);
        }
      }
    }
    setTimeout(type, 500);
  }

  /* ---------- Animasi angka statistik ---------- */
  var statEls = document.querySelectorAll('.stat-num');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + (target >= 2 ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + '+';
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && statEls.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  onScroll();
})();


(function(){
  var EN={n1:'Home',n2:'About',n3:'Education',n4:'Experience',n5:'Skills',n6:'Contact',
  hello:'Hello!',hi:"I'm",hdesc:'Bachelor of Computer Science graduate (Information Systems) with a good sense of humor, comfortable working in a team or independently.',
  slabel:'Years of Experience',cta1:'Experience',cta2:'Contact me',
  ta:'About',tt:'Get to know <span class="or">me</span>',ts:'A quick look at who I am and how I work.',
  quote:'\u201cHello, my name is <strong>Andi Lau</strong>. I have a humorous personality and can work with teams as well as individually. My most recent education is a Bachelor of Computer Science at ISB Atma Luhur Pangkalpinang, majoring in Information Systems.\u201d',
  f1h:'Background',f1p:"Bachelor of Computer Science, majoring in Information Systems.",
  f2h:'Teamwork',f2p:'Comfortable collaborating in a team or working independently.',
  f3h:'Solution-oriented &amp; Technical',f3p:'Skilled in application development, networking, and design.',
  ea:'Education',et:'Education <span class="or">history</span>',es:'The academic foundation behind my skills.',
  c1:"Bachelor of Computer Science",c2:'Information Systems Program',
  xa:'Experience',xt:'Work <span class="or">experience</span>',xs:'My professional career journey.',
  x1:'Providing technical device support, system troubleshooting, and network maintenance, ensuring IT operations run smoothly with minimal disruption.',
  x2:"Carrying out marketing and sales activities, building good customer relationships, and achieving the company's sales targets.",
  ka:'Skills',kt:'Skills &amp; <span class="or">competencies</span>',ks:'Areas I master and pursue.',
  k1:'Building web applications from front-end to back-end.',k2:'Configuring, maintaining, and troubleshooting computer networks.',
  k3:'Creating engaging graphic design materials, content, and presentations.',k4:'Vector design and professional layouts for branding needs.',
  k5:'Managing documents, data, and work presentations efficiently.',
  ca:'Contact',ct:"Let's connect",cs:'Open to job opportunities, project collaboration, or just a chat.',call:'Call',rights:'All rights reserved.'};
  var els=Array.prototype.slice.call(document.querySelectorAll('[data-i]')),ID={};
  els.forEach(function(e){ID[e.getAttribute('data-i')]=e.innerHTML;});
  var btns=Array.prototype.slice.call(document.querySelectorAll('.lang button'));
  function setLang(l){
    var d=l==='en'?EN:ID;
    els.forEach(function(e){var v=d[e.getAttribute('data-i')];if(v!=null)e.innerHTML=v;});
    document.documentElement.lang=l;
    btns.forEach(function(b){var on=b.getAttribute('data-lang')===l;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});
    try{localStorage.setItem('lang',l);}catch(e){}
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));});});
  var saved='id';try{saved=localStorage.getItem('lang')||'id';}catch(e){}
  if(saved==='en')setLang('en');
})();

