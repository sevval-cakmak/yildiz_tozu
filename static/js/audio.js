/**
 * Yıldız Tozu – Ses Oynatıcı ve Dark/Light Mode Toggle
 */

document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // Dark / Light Mode Toggle
  // ============================================================
  const themeBtn = document.getElementById("btn-theme");
  const htmlEl = document.documentElement;

  // Kaydedilmiş temayı yükle
  const savedTheme = localStorage.getItem("yildizTozu_theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      
      htmlEl.setAttribute("data-theme", next);
      localStorage.setItem("yildizTozu_theme", next);
      updateThemeIcon(next);
      
      // Animasyon olayı fırlat
      document.dispatchEvent(new CustomEvent("themeChanged", { detail: next }));
    });
  }

  function updateThemeIcon(theme) {
    if (!themeBtn) return;
    themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    themeBtn.title = theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç";
  }

  // ============================================================
  // Ambient Ses Oynatıcı (𝄞 Sol Anahtarı Butonu)
  // ============================================================
  const soundBtn = document.getElementById("btn-sound");
  
  if (soundBtn) {
    // Creative Commons piyano müziği – Musopen'den ücretsiz
    const AUDIO_SRC = "https://musopen.org/music/mp3/48";
    // Yedek: kısa synthesized tone kullan
    
    let audio = null;
    let isPlaying = false;
    let audioContext = null;
    let gainNode = null;
    
    // Web Audio API ile yumuşak ambient ton oluştur
    function createAmbientTone() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.connect(audioContext.destination);
      
      // 3 adet osillatör – yumuşak piyano benzeri chord
      const frequencies = [261.63, 329.63, 392.00]; // C4, E4, G4 (C major chord)
      const oscillators = [];
      
      frequencies.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        
        const oscGain = audioContext.createGain();
        oscGain.gain.setValueAtTime(0.15 / (i + 1), audioContext.currentTime);
        
        osc.connect(oscGain);
        oscGain.connect(gainNode);
        osc.start();
        oscillators.push({ osc, gain: oscGain });
      });

      // Hafif titreşim için vibrato
      const lfo = audioContext.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.5, audioContext.currentTime);
      
      const lfoGain = audioContext.createGain();
      lfoGain.gain.setValueAtTime(2, audioContext.currentTime);
      lfo.connect(lfoGain);
      oscillators.forEach(({ osc }) => lfoGain.connect(osc.frequency));
      lfo.start();
      
      return { oscillators, lfo, gainNode };
    }
    
    let ambientNodes = null;
    
    soundBtn.addEventListener("click", () => {
      if (!isPlaying) {
        // Çalmaya başla
        try {
          ambientNodes = createAmbientTone();
          
          // Fade-in (1 saniye)
          ambientNodes.gainNode.gain.linearRampToValueAtTime(
            0.3, 
            audioContext.currentTime + 1
          );
          
          // 7 saniye sonra fade-out ve durdur
          ambientNodes.gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 5);
          ambientNodes.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 7);
          
          setTimeout(() => {
            stopAmbient();
          }, 7500);
          
          isPlaying = true;
          soundBtn.classList.add("playing");
          soundBtn.title = "Melodiyi durdurmak için tıklayın";
        } catch (err) {
          console.warn("Web Audio API desteklenmiyor:", err);
        }
      } else {
        stopAmbient();
      }
    });
    
    function stopAmbient() {
      if (ambientNodes) {
        try {
          if (audioContext) {
            ambientNodes.gainNode.gain.linearRampToValueAtTime(
              0, 
              audioContext.currentTime + 0.5
            );
            setTimeout(() => {
              ambientNodes.oscillators.forEach(({ osc }) => {
                try { osc.stop(); } catch(e) {}
              });
              try { ambientNodes.lfo.stop(); } catch(e) {}
            }, 600);
          }
        } catch(e) {}
        ambientNodes = null;
      }
      isPlaying = false;
      soundBtn.classList.remove("playing");
      soundBtn.title = "Melodiyi dinlemek için tıklayın";
    }
    
    soundBtn.title = "Melodiyi dinlemek için tıklayın";
  }

});
