/**
 * Yıldız Tozu – Animasyonlar
 * Yaprak düşme, yıldız parıltısı, scroll tetikleyici
 */

// ============================================================
// Scroll ile Fade-In Animasyonu (Intersection Observer)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {

  // Tüm .fade-in-up elemanlarını izle
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Gecikme değeri data-delay özelliğinden alınır
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-in-up").forEach((el, index) => {
    // Her elemana sıralı gecikme ekle (özel gecikme yoksa)
    if (!el.dataset.delay) {
      el.dataset.delay = index * 80;
    }
    observer.observe(el);
  });

  // ============================================================
  // Yaprak Düşme Animasyonu
  // ============================================================
  const leavesContainer = document.querySelector(".leaves-container");
  
  if (leavesContainer) {
    const leafEmojis = ["🍃", "🍂", "🍁", "✿", "❀", "🌿"];
    const leafCount = 10;

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("span");
      leaf.classList.add("leaf");
      leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      
      // CSS değişkenleriyle randomize
      const leftPos = Math.random() * 100;
      const duration = 7 + Math.random() * 8; // 7-15 saniye
      const delay = -Math.random() * 15; // Başlangıç gecikmesi
      const sway = (Math.random() * 160 - 80); // Sol-sağ sallantı
      const rotate = Math.random() * 360;
      
      leaf.style.cssText = `
        --left: ${leftPos}%;
        --fall-duration: ${duration}s;
        --delay: ${delay}s;
        --sway: ${sway}px;
        --rotate: ${rotate}deg;
      `;
      
      leavesContainer.appendChild(leaf);
    }
  }

  // ============================================================
  // Yıldız Parıltısı (Canvas)
  // ============================================================
  const canvas = document.getElementById("starfield-canvas");
  
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    let animFrame;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.8 + 0.3,
          opacity: Math.random(),
          speed: 0.003 + Math.random() * 0.008,
          phase: Math.random() * Math.PI * 2,
          // Renk: lavanta veya altın
          color: Math.random() > 0.5 
            ? `rgba(184, 169, 217, ` 
            : `rgba(201, 168, 76, `,
        });
      }
    }

    function drawStars(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        const opacity = (Math.sin(time * star.speed + star.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color + opacity * 0.95 + ")";
        ctx.fill();
      });
      
      animFrame = requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    drawStars(0);

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
    });

    // Dark mode değiştiğinde yeniden çiz
    document.addEventListener("themeChanged", () => {
      cancelAnimationFrame(animFrame);
      drawStars(performance.now() / 1000);
    });
  }

  // ============================================================
  // Hamburger Menü (Mobil)
  // ============================================================
  const hamburger = document.querySelector(".navbar-hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      
      // Hamburger animasyonu
      const spans = hamburger.querySelectorAll("span");
      if (isOpen) {
        spans[0].style.transform = "translateY(7px) rotate(45deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
      } else {
        spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
      }
    });

    // Menü dışına tıklayınca kapat
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("open");
        const spans = hamburger.querySelectorAll("span");
        spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
      }
    });
  }

  // ============================================================
  // Aktif Sayfa Link Vurgulama
  // ============================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll(".navbar-links a, .mobile-menu a").forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath || 
        (currentPath !== "/" && linkPath !== "/" && currentPath.startsWith(linkPath))) {
      link.classList.add("active");
    }
  });

  // ============================================================
  // Sayfa Yükleme Ekranı
  // ============================================================
  const loader = document.querySelector(".page-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 600);
  }

});
