const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    // Telegram WebApp init
    if (tg && tg.ready) {
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#121212');
        tg.setBackgroundColor('#09090b');
    }

    const user = tg?.initDataUnsafe?.user;
    if (user) {
        console.log('Telegram user:', user);
    }

    // ----- LIVE: сдвиг, рандомные иконки и блик по всем при обновлении -----

    const liveTrack = document.querySelector('.live-track');

    const liveIcons = [
        'public/images/live-1.png',
        'public/images/live-2.png',
        'public/images/live-3.png',
        'public/images/live-4.png',
        'public/images/live-5.png',
        'public/images/live-6.png',
        'public/images/live-7.png',
        'public/images/live-8.png',
    ];

    if (liveTrack && liveTrack.children.length > 1) {
        let isAnimating = false;

        const runShineOnAll = () => {
            const items = liveTrack.querySelectorAll('.live-item');
            items.forEach(item => {
                item.classList.remove('shine');
                void item.offsetWidth;       // сброс анимации
                item.classList.add('shine'); // включаем блик
            });

            // через ~1.3 сек убираем класс, чтобы не залипал
            setTimeout(() => {
                items.forEach(item => item.classList.remove('shine'));
            }, 1300);
        };

        const shiftLiveOnce = () => {
            if (isAnimating) return;

            const first = liveTrack.firstElementChild;
            if (!first) return;

            const style = window.getComputedStyle(liveTrack);
            const gap = parseInt(style.columnGap || style.gap || 8, 10);
            const step = first.getBoundingClientRect().width + gap;

            isAnimating = true;
            liveTrack.style.transition = 'transform 0.45s ease';
            liveTrack.style.transform = `translateX(-${step}px)`;

            setTimeout(() => {
                liveTrack.style.transition = 'none';
                liveTrack.style.transform = 'translateX(0)';

                const img = first.querySelector('img');
                if (img) {
                    const randomSrc = liveIcons[Math.floor(Math.random() * liveIcons.length)];
                    img.src = randomSrc;
                }

                liveTrack.appendChild(first);
                void liveTrack.offsetWidth;

                isAnimating = false;

                // новая иконка "упала" -> запускаем блик по всем
                runShineOnAll();
            }, 460);
        };

        // первый блик при открытии, чтобы не было пусто
        runShineOnAll();
        // имитация нового выигрыша каждые 4.5 сек
        setInterval(shiftLiveOnce, 4500);
    }

    // дальше: обработчики открытия кейсов, запросы к бэкенду и т.д.
});