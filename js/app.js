const app = {
    game: {
        horrorStart: function () {
            const min = 10000;
            const max = 30000;
            let time = Math.floor(Math.random() * (max - min + 1) + min);
            setTimeout(() => {
                document.querySelector('audio').pause();
                document.querySelector('#circle').remove();
                document.querySelector('video').play();
                setTimeout(() => document.querySelector('.video').style.display = 'inline-block', 1000);
            }, time);
        },
        play: async function () {
            app.fullScreen.enter();
            await app.game.startCountDown();
            app.game.startTimer();
            app.game.circle();
            app.game.horrorStart();
        },
        circleClicked: function () {
            this.removeEventListener('click', app.game.circleClicked);
            document.querySelector('.clickCount').innerText = Number(document.querySelector('.clickCount').innerText) + 1;
            this.remove();
            app.game.circle();
        },
        circle: function () {
            document.querySelector('audio').play();

            const min_top = app.convertRemToPixels(5) + 75;
            const max_top = window.screen.availHeight - min_top;

            const min_left = 75;
            const max_left = window.screen.availWidth - min_left;

            let circle = document.createElement('div');
            circle.id = 'circle';
            circle.style.top = 'calc(' + Math.floor(Math.random() * (max_top - min_top) + min_top) + 'px)';
            circle.style.left = 'calc(' + Math.floor(Math.random() * (max_left - min_left) + min_left) + 'px)';

            circle.addEventListener('click', app.game.circleClicked);

            document.querySelector('main').append(circle);
        },
        startTimer: function () {
            let i = 1;
            let sec = 60;
            let min = 0;
            setInterval(() => {
                sec = ('0' + (sec - i)).slice(-2);
                min = ('0' + Math.floor(sec / 60)).slice(-2);
                document.querySelector('.time').innerText = min + ':' + sec;
            }, 1000);
        },
        startCountDown: async function () {
            document.querySelector('.play').remove();
            document.querySelector('.countdown').style.display = 'inline-block';

            let time;
            let totalCountDown = 3;
            await new Promise(res => time = setInterval(function () {
                if (totalCountDown !== 0) {
                    document.querySelector('.countdown span').style.animation = 'scaleUp 1s infinite ease-in-out';
                    document.querySelector('.countdown span').innerText = totalCountDown;
                } else {
                    document.querySelector('.countdown').style.display = 'none';
                    res();
                    clearInterval(time);
                }
                totalCountDown--;
            }, 1000));

            return Promise.resolve();
        }
    },
    fullScreen: {
        enter: function () {
            document.documentElement.requestFullscreen().catch(e => console.log(e));
        },
        exit: function () {
            document.exitFullscreen();
        }
    },
    convertRemToPixels: function (rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    },
    listeners: function () {
        document.querySelector('.play .play_button').addEventListener('click', this.game.play);

        document.querySelector('.video').addEventListener('dblclick', this.fullScreen.exit);
    },
    init: function () {
        this.listeners();
    }
}

app.init();