const Selector = ele => document.querySelector(ele),
    SelectorAll = eleAll => document.querySelectorAll(eleAll),
    newEle = newele => document.createElement(newele),
    hrefIndex = href => window.location.href.indexOf(href),
    lsGet = item => localStorage.getItem(item),
    lsSet = (key, value) => localStorage.setItem(key, value),
    lsRem = item => localStorage.removeItem(item),
    sI = (fun, time) => setInterval(fun, time),
    sT = (fun, time) => setTimeout(fun, time),
    cI = intervaliable => clearInterval(intervaliable),
    cT = intervaliable => clearTimeout(intervaliable),
    docLis = (eve, fun) => document.addEventListener(eve, fun);

let horrorStart = async () => {
    const min = 10000;
    const max = 30000;
    let time = Math.floor(Math.random() * (max - min + 1) + min);
    sT(() => {
        Selector('audio').pause();
        Selector('#circle').remove();
        Selector('video').play();
        sT(() => Selector('.video').style.display = 'inline-block', 1500);
    }, time);
}

let appendCircle = async () => {
    Selector('audio').play();
    const min = 30;
    const max = 100;
    let circle = newEle('div');
    circle.id = 'circle';
    circle.style.top = 'calc(' + Math.abs(Math.floor(Math.random() * (max - min + 1) + min)) + 'vh - 5rem)';
    circle.style.left = 'calc(' + Math.abs(Math.floor(Math.random() * (max - min + 1) + min)) + 'vw - 5rem)';
    Selector('main').appendChild(circle);
    circle.onclick = () => (Selector('.clickCount').innerText = Number(Selector('.clickCount').innerText) + 1, circle.remove(), appendCircle());
}

let timeStart = async () => {
    let i = 1;
    let sec = 60;
    let min = 0;
    setInterval(() => {
        sec = ('0' + (sec - i)).slice(-2);
        min = ('0' + Math.floor(sec / 60)).slice(-2);
        Selector('.time').innerText = min + ':' + sec;
    }, 1000);
};

Selector('.play').addEventListener('click', () => {
    document.documentElement.requestFullscreen().catch(e => console.log(e));
    Selector('.play').remove();
    timeStart();
    appendCircle();
    horrorStart();
});

document.addEventListener('dblclick', () => document.documentElement.exitFullscreen());