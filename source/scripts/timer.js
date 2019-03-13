'use strict';

import fetcher from './fetcher';

export default function timer() {

    const timerSetting = document.getElementById("timerSetting");
    const timerProgress = document.getElementById("timerProgress");
    let timerCountdown = null;
    let timer = null;
    let timeSetting = 5000;

    // Add toggle listener for timer
    timerSetting.addEventListener('change', (event) => {
        if (event.target.checked) {
            timerProgress.classList.add('visible');
            timerCountdown = setInterval(() => {
                if (timerProgress.value >= 1) {
                    timerProgress.value = 0;
                }
                timerProgress.value = timerProgress.value+.01;
            }, timeSetting*0.01);
            timer = setInterval(() => {
                fetcher();
            }, timeSetting);
        } else {
            clearInterval(timer);
            clearInterval(timerCountdown);
            timerProgress.value = 0;
            timerProgress.classList.remove('visible');
        }
    });

    // Fire default value for toggle
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    timerSetting.dispatchEvent(evt);

}
