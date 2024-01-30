const modalInit = () => {
    $('.modal').iziModal({
        width: 720,
        iframeHeight: 760,
        background: 'transparent',
        transitionIn: 'fadeInDown',
        bodyOverflow: false,
        overlayClose: false,
        closeOnEscape: false,
        overlayColor: 'rgba(6, 2, 24, 0.70)',
    });
};

const coinsButtons = () => {
    const buttons = document.querySelectorAll('.game__main-button');
    let activeButtons = Array.from(buttons);
    let clickCount = 0;
    let isClickable = true;

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const keyValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
        return keyValue ? keyValue[2] : null;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', handleClick);
    });

    function modalTrigger(id) {
        $(`#${id}`).iziModal('open');
    }

    function handleClick(event) {
        const clickedButton = event.currentTarget;

        if (clickedButton.hasAttribute('disabled') || !isClickable) {
            return;
        }

        isClickable = false;
        setTimeout(() => {
            isClickable = true;
        }, 500);

        clickCount++;

        if (clickCount === 1) {
            handleFirstClick(clickedButton);
        } else if (clickCount === 2) {
            handleSecondClick(clickedButton);
        } else if (clickCount === 3) {
            handleThirdClick(clickedButton);
        }
    }

    function handleFirstClick(clickedButton) {
        clickedButton.classList.add('coin-try-more');
        setTimeout(() => {
            modalTrigger('modalFirst');
        }, 200);
        clickedButton.setAttribute('disabled', 'true');
    }

    function handleSecondClick(clickedButton) {
        clickedButton.classList.add('coin-luck');
        setTimeout(() => {
            modalTrigger('modalSecond');
        }, 200);
        clickedButton.setAttribute('disabled', 'true');
    }

    function handleThirdClick(clickedButton) {
        clickedButton.classList.add('coin-crown');
        setTimeout(() => {
            modalTrigger('modalThird');
            setCookie('modalThirdTriggered', 'true', 365);
        }, 200);
        clickedButton.setAttribute('disabled', 'true');

        activeButtons.forEach((button) => {
            if (button !== clickedButton) {
                button.setAttribute('disabled', 'true');
            }
        });
    }

    // document.addEventListener('DOMContentLoaded', () => {
    //     const modalThirdTriggered = getCookie('modalThirdTriggered');
    //     if (modalThirdTriggered === 'true') {
    //         modalTrigger('modalThird');
    //     }
    // });
};

(function() {
    modalInit();
    coinsButtons();
})();

function addStar() {
    var s = document.createElement('div');
    s.className = 'star';
    s.style.setProperty('--size', Math.random() * 3 + 2 + 'vmin');
    s.style.left = Math.floor(Math.random() * 100) + '%';
    s.style.top = Math.floor(Math.random() * 100) + '%';
    s.onanimationend = function() { this.remove(); };
    document.body.appendChild(s);
}
setInterval(addStar, 50);