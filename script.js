// متغيرات عامة
let currentPage = 'mainPage';
let musicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

// إنشاء جسيمات رومانسية
function createRomanticParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'romantic-particles';
    document.body.appendChild(particlesContainer);
    
    const particles = ['🌸', '💜', '🦋', '🌺', '💝', '🌷', '💕', '🌻', '🦄', '✨'];
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particle.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            particle.style.color = `hsl(${Math.random() * 60 + 260}, 70%, ${Math.random() * 30 + 60}%)`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 10000);
        }
    }, 400);
}

// إعداد الموسيقى عند تحميل الصفحة
window.addEventListener('load', () => {
    // إعداد الصوت
    backgroundMusic.volume = 0.5;
    
    // التحقق من تحميل الملف الصوتي
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('الملف الصوتي جاهز للتشغيل');
        document.getElementById('musicStatus').textContent = 'اضغط لتشغيل الموسيقى';
    });
    
    backgroundMusic.addEventListener('error', (e) => {
        console.log('خطأ في تحميل الملف الصوتي:', e);
        document.getElementById('musicStatus').textContent = 'لم يتم العثور على الملف الصوتي';
    });
    
    // بدء الجسيمات الرومانسية
    createRomanticParticles();
    
    // إضافة تأثيرات إضافية
    addMagicalEffects();
});

// تأثيرات سحرية إضافية
function addMagicalEffects() {
    // تأثير الضوء المتحرك
    const lightEffect = document.createElement('div');
    lightEffect.style.cssText = `
        position: fixed;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(lightEffect);
    
    // تتبع حركة الماوس
    document.addEventListener('mousemove', (e) => {
        lightEffect.style.left = (e.clientX - 100) + 'px';
        lightEffect.style.top = (e.clientY - 100) + 'px';
    });
}

// وظيفة تشغيل/إيقاف الموسيقى
function toggleMusic() {
    const musicStatus = document.getElementById('musicStatus');
    
    if (musicPlaying) {
        backgroundMusic.pause();
        musicStatus.textContent = 'تشغيل الموسيقى';
        musicPlaying = false;
    } else {
        // محاولة تشغيل الموسيقى
        backgroundMusic.play().then(() => {
            musicStatus.textContent = 'إيقاف الموسيقى';
            musicPlaying = true;
            console.log('تم تشغيل الموسيقى بنجاح');
        }).catch((error) => {
            console.log('خطأ في تشغيل الموسيقى:', error);
            musicStatus.textContent = 'خطأ في تشغيل الموسيقى';
            
            // محاولة تشغيل من رابط خارجي كبديل
            tryAlternativeMusic();
        });
    }
}

// وظيفة بديلة لتشغيل موسيقى من رابط خارجي
function tryAlternativeMusic() {
    const musicStatus = document.getElementById('musicStatus');
    
    // إنشاء عنصر صوتي جديد مع رابط خارجي
    const alternativeAudio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
    alternativeAudio.loop = true;
    alternativeAudio.volume = 0.3;
    
    alternativeAudio.play().then(() => {
        musicStatus.textContent = 'إيقاف الموسيقى (بديل)';
        musicPlaying = true;
        
        // استبدال الصوت الأصلي بالبديل
        backgroundMusic.pause();
        backgroundMusic.src = '';
        
        // تحديث زر الإيقاف للصوت البديل
        document.querySelector('.music-toggle').onclick = () => {
            if (musicPlaying) {
                alternativeAudio.pause();
                musicStatus.textContent = 'تشغيل الموسيقى';
                musicPlaying = false;
            } else {
                alternativeAudio.play();
                musicStatus.textContent = 'إيقاف الموسيقى (بديل)';
                musicPlaying = true;
            }
        };
        
    }).catch(() => {
        musicStatus.textContent = 'ضع ملف you-are-my-sunshine.mp3';
    });
}

// وظيفة فتح صفحة الهدية
function openGift() {
    switchPage('giftPage');
    
    // إضافة الفيديو إذا كان موجود
    loadVideo();
    
    // إضافة تأثيرات بصرية
    createConfetti();
}

// وظيفة فتح صفحة الرسالة
function openMessage() {
    switchPage('messagePage');
    
    // إضافة تأثير القلوب المتطايرة
    createHearts();
}

// وظيفة تحميل الفيديو
function loadVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    // التحقق من وجود ملف الفيديو
    const video = document.createElement('video');
    video.src = 'birthday-video.mp4'; // ضع ملف الفيديو هنا
    video.controls = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.borderRadius = '20px';
    video.style.objectFit = 'cover';
    
    // استبدال المحتوى المؤقت بالفيديو
    video.onloadeddata = function() {
        videoPlaceholder.innerHTML = '';
        videoPlaceholder.appendChild(video);
    };
    
    // في حالة عدم وجود الفيديو، الاحتفاظ بالمحتوى المؤقت
    video.onerror = function() {
        console.log('لم يتم العثور على ملف الفيديو');
    };
}
// وظيفة العودة للصفحة الرئيسية
function goBack() {
    switchPage('mainPage');
}

// وظيفة تبديل الصفحات
function switchPage(pageId) {
    // إخفاء الصفحة الحالية
    const currentPageElement = document.getElementById(currentPage);
    currentPageElement.classList.remove('active');
    
    // إظهار الصفحة الجديدة بعد تأخير قصير
    setTimeout(() => {
        const newPageElement = document.getElementById(pageId);
        newPageElement.classList.add('active');
        currentPage = pageId;
    }, 300);
}

// وظيفة إنشاء تأثير الكونفيتي
function createConfetti() {
    const colors = ['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE', '#F3E8FF'];
    const shapes = ['🌸', '💜', '🦋', '🌺', '💝', '🌷', '💕', '✨', '🌻'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.animation = 'fall 4s linear forwards';
            } else {
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.animation = 'fall 3s linear forwards';
            }
            
            document.body.appendChild(confetti);
            
            // إزالة العنصر بعد انتهاء الحركة
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 80);
    }
}

// وظيفة إنشاء تأثير القلوب
function createHearts() {
    const hearts = ['💜', '💖', '💕', '💗', '🤍', '💝', '💘', '💌', '🦋', '🌸'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'floatUp 5s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // إزالة العنصر بعد انتهاء الحركة
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 200);
    }
}

// إضافة الحركات المطلوبة في CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// إضافة مستمعات الأحداث للوحة المفاتيح
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'Escape':
            if (currentPage !== 'mainPage') {
                goBack();
            }
            break;
        case ' ':
            event.preventDefault();
            toggleMusic();
            break;
    }
});

// تأثيرات إضافية عند تحريك الماوس
document.addEventListener('mousemove', (event) => {
    // إنشاء نجوم صغيرة تتبع الماوس أحياناً
    if (Math.random() > 0.95) {
        createStar(event.clientX, event.clientY);
    }
});

function createStar(x, y) {
    const stars = ['🌸', '✨', '🦋', '💜', '🌺'];
    const star = document.createElement('div');
    star.textContent = stars[Math.floor(Math.random() * stars.length)];
    star.style.position = 'fixed';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '9998';
    star.style.fontSize = (Math.random() * 0.8 + 1) + 'rem';
    star.style.animation = 'starTwinkle 1.5s ease-out forwards';
    star.style.color = `hsl(${Math.random() * 60 + 260}, 75%, ${Math.random() * 25 + 65}%)`;
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 1500);
}

// إضافة حركة النجوم
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes starTwinkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(starStyle);