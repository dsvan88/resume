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
    if (window.scrollY > 600 && !projectsUpdated){
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

if (googleTranslateConfig.langFirstVisit && (!Cookies.get('googtrans') || Cookies.get('googtrans') != `/${googleTranslateConfig.lang}/${googleTranslateConfig.lang}`)) {
    let script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=TranslateInit";
    document.body.append(script)
    let observerTarget = document.body;
    let config = { attributes: false, childList: true, characterData: false };

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'DIV' && mutation.addedNodes[0].className === 'skiptranslate') {
                setTimeout(() => {
                    mutation.addedNodes[0].remove()
                    observer.disconnect();
                }, 500);
                document.body.style.position = 'static';
            }
        });    
    });
    observer.observe(observerTarget, config);
    setTimeout(() => (!observer || observer.disconnect()), 5000);
}
else {
    const langsImages = document.body.querySelectorAll('img[data-google-lang]');
    langsImages.forEach(element => {
        element.addEventListener('click', () => {
            TranslateCookieHandler(`/${googleTranslateConfig.lang}/${element.dataset.googleLang}`, googleTranslateConfig.domain);
            window.location.reload();
        })
    })
}