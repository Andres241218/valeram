// ===== SISTEMA DE MÚSICA =====
let backgroundMusic = null;

// Función para inicializar música
function initMusic() {
    backgroundMusic = new Audio("Runnin' Home to You.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.preload = 'auto';
    
    console.log('Música inicializada');
}

// Función para iniciar música
function startMusic() {
    if (backgroundMusic) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().then(() => {
            console.log('Música reproduciéndose');
        }).catch(e => {
            console.log('Error al reproducir música:', e);
        });
    }
}

// ===== SISTEMA PRINCIPAL =====
document.addEventListener('DOMContentLoaded', function() {
    const backgroundImage = document.querySelector('.background-image');
    const romanticMessage = document.getElementById('romanticMessage');
    const particlesContainer = document.getElementById('particles');
    const romanticVideo = document.querySelector('.romantic-video');
    
    // Inicializar música
    initMusic();
    
    // Intentar iniciar música inmediatamente
    startMusic();
    
    // Si no funciona, iniciar con click
    let musicStarted = false;
    const startMusicOnClick = () => {
        if (!musicStarted) {
            startMusic();
            musicStarted = true;
            // Remover listeners
            document.removeEventListener('click', startMusicOnClick);
            document.removeEventListener('touchstart', startMusicOnClick);
        }
    };
    
    document.addEventListener('click', startMusicOnClick);
    document.addEventListener('touchstart', startMusicOnClick);
    
    // Crear mensaje de instrucción
    const instructionMessage = document.createElement('div');
    instructionMessage.innerHTML = 'Presiona muchas veces la pantalla';
    instructionMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, rgba(255, 20, 147, 0.9), rgba(255, 165, 0, 0.9));
        color: white;
        padding: 12px 18px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        z-index: 1000;
        cursor: pointer;
        animation: bounce 2s infinite;
        box-shadow: 0 4px 15px rgba(255, 20, 147, 0.4);
        font-family: 'Georgia', serif;
        text-align: center;
    `;
    document.body.appendChild(instructionMessage);
    
    // Agregar animación de rebote
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(bounceStyle);
    
    // Función para crear partículas doradas
    function createParticle() {
        if (!particlesContainer) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }
    
    // Crear partículas continuamente
    function startParticleEffect() {
        setInterval(createParticle, 300);
    }
    
    // Función para crear efecto de corazones rojos y girasoles
    function createRandomHearts() {
        const totalCount = Math.floor(Math.random() * 6) + 4; // Entre 4 y 9 elementos
        const heartCount = Math.floor(totalCount / 2); // Mitad corazones
        const sunflowerCount = totalCount - heartCount; // Mitad girasoles
        
        // Crear corazones rojos
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * (window.innerWidth - 50) + 'px';
                heart.style.top = Math.random() * (window.innerHeight - 50) + 'px';
                heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
                heart.style.animation = 'heartFloat 4s ease-out forwards';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '15';
                heart.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 4000);
            }, i * 150);
        }
        
        // Crear girasoles
        for (let i = 0; i < sunflowerCount; i++) {
            setTimeout(() => {
                const sunflower = document.createElement('div');
                sunflower.innerHTML = '🌻';
                sunflower.style.position = 'fixed';
                sunflower.style.left = Math.random() * (window.innerWidth - 50) + 'px';
                sunflower.style.top = Math.random() * (window.innerHeight - 50) + 'px';
                sunflower.style.fontSize = (Math.random() * 15 + 20) + 'px';
                sunflower.style.animation = 'sunflowerFloat 5s ease-out forwards';
                sunflower.style.pointerEvents = 'none';
                sunflower.style.zIndex = '15';
                sunflower.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(sunflower);
                
                setTimeout(() => {
                    if (sunflower.parentNode) {
                        sunflower.parentNode.removeChild(sunflower);
                    }
                }, 5000);
            }, (i + heartCount) * 150);
        }
    }
    
    // Efecto de click en toda la pantalla
    document.addEventListener('click', function(e) {
        // Crear corazones aleatorios
        createRandomHearts();
        
        // Crear efecto de ondas de luz en la posición del click
        const wave = document.createElement('div');
        wave.style.position = 'fixed';
        wave.style.left = e.clientX + 'px';
        wave.style.top = e.clientY + 'px';
        wave.style.width = '0px';
        wave.style.height = '0px';
        wave.style.border = '2px solid rgba(255, 20, 147, 0.8)';
        wave.style.borderRadius = '50%';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.animation = 'waveExpand 2s ease-out forwards';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '10';
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 2000);
    });
    
    // Efecto especial en el mensaje romántico
    if (romanticMessage) {
        romanticMessage.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createRandomHearts();
                }, i * 200);
            }
        });
        
        romanticMessage.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    // Configurar video romántico
    if (romanticVideo) {
        romanticVideo.loop = true;
        romanticVideo.muted = true;
        romanticVideo.playsInline = true;
        romanticVideo.preload = 'auto';
    }
    
    // Inicializar efectos
    startParticleEffect();
    
    // Función para cambiar mensaje después de 15 segundos
    function cambiarMensaje() {
        setTimeout(() => {
            console.log('Cambiando mensaje después de 15 segundos...');
            
            // Quitar el video
            const videoContainer = document.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.remove();
                console.log('Video removido');
            }
            
            // Cambiar el mensaje
            if (romanticMessage) {
                const title = romanticMessage.querySelector('.message-title');
                const text = romanticMessage.querySelector('.message-text');
                const subtitle = romanticMessage.querySelector('.message-subtitle');
                
                if (title) {
                    title.textContent = 'Te amo con todo mi ser, mi Pricesita hermosa';
                    title.style.color = '#FF69B4';
                }
                
                if (text) {
                    text.textContent = 'Quiero que sepas que te amo con todo mi corazon, que jamas te dejare sola y quiero que me aceptes de nuevo como tu novio';
                }
                
                if (subtitle) {
                    subtitle.textContent = 'perdoname por ser tan grosero contigo';
                    subtitle.style.color = '#FF1493';
                }
                
                // Agregar animación de cambio
                romanticMessage.style.animation = 'messageFadeIn 2s ease-out';
                
                console.log('Mensaje cambiado exitosamente');
            }
        }, 15000); // 15 segundos
    }
    
    // Iniciar temporizador de cambio de mensaje
    cambiarMensaje();
});

// Reiniciar música al recargar la página
window.addEventListener('beforeunload', function() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
});

// Animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes waveExpand {
        0% { width: 0px; height: 0px; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes heartFloat {
        0% { 
            transform: translateY(0px) scale(0.3) rotate(0deg); 
            opacity: 1; 
        }
        25% { 
            transform: translateY(-30px) scale(0.8) rotate(90deg); 
            opacity: 0.9; 
        }
        50% { 
            transform: translateY(-60px) scale(1.2) rotate(180deg); 
            opacity: 0.8; 
        }
        75% { 
            transform: translateY(-90px) scale(0.9) rotate(270deg); 
            opacity: 0.6; 
        }
        100% { 
            transform: translateY(-120px) scale(0.4) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes sunflowerFloat {
        0% { 
            transform: translateY(0px) scale(0.2) rotate(0deg); 
            opacity: 1; 
        }
        20% { 
            transform: translateY(-20px) scale(0.6) rotate(72deg); 
            opacity: 0.9; 
        }
        40% { 
            transform: translateY(-40px) scale(1.0) rotate(144deg); 
            opacity: 0.8; 
        }
        60% { 
            transform: translateY(-60px) scale(1.1) rotate(216deg); 
            opacity: 0.7; 
        }
        80% { 
            transform: translateY(-80px) scale(0.8) rotate(288deg); 
            opacity: 0.5; 
        }
        100% { 
            transform: translateY(-100px) scale(0.3) rotate(360deg); 
            opacity: 0; 
        }
    }
`;
document.head.appendChild(style);