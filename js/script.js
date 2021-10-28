const debug = false;
let projectsUpdated = false;

const navRightSide = document.body.querySelector('.right-side .navigation');
const dashboardPanelFixed = document.body.querySelector('.dashboard');

// For gallery
const blobArray = [];

window.addEventListener('scroll', (event) => {
    const rightSide = navRightSide.closest('.right-side');
    if (navRightSide.getBoundingClientRect().bottom <= 0) {
        if (rightSide.classList.contains('right-side-hover')) {
            dashboardPanelFixed.style.opacity = "1";
            dashboardPanelFixed.style.pointerEvents = 'auto';
            rightSide.classList.remove('right-side-hover');
        }
    }
    else {
        dashboardPanelFixed.style.opacity = "0";
        dashboardPanelFixed.style.pointerEvents = 'none';
        navRightSide.closest('.right-side').classList.add('right-side-hover');
    }
    if (document.body.getBoundingClientRect().top < -400 && !projectsUpdated){
        projectsUpdated = true;
        mainFunc.updateProjects.call(mainFunc);
    }
});

const myMottoBlock = document.body.querySelector('#my-motto');
const myMottoExplainBlock = document.body.querySelector('.about-me__motto-explain');
let myMottoBlockHover = false;

function tweakMyMottoBlock() {
    if (myMottoBlockHover) {
        myMottoExplainBlock.style.height = `${myMottoExplainBlock.scrollHeight-20}px`;
    }
    else {
        myMottoExplainBlock.style.height = '0px';
    }
}

myMottoBlock.onmousemove = function (e) {
    myMottoBlockHover = true;
}

myMottoBlock.onmouseout = function (e) {
    myMottoBlockHover = false;
}

const autoTweak = setInterval(tweakMyMottoBlock, 300);

document.body.querySelector('.contact-form__submit').addEventListener('click', (event) => {
    event.preventDefault();
    mainFunc.sendRequest();
});
setTimeout(() => {
    document.body.querySelector('.skiptranslate').style.display = 'none';
    document.body.style.position = 'static';
}
, 1000);

