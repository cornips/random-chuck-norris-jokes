'use strict';

import fetcher from './fetcher';

export default function timer() {

    const timerSetting = document.getElementById("timerSetting");
    let timer = null;

    // Add toggle listener for timer
    timerSetting.addEventListener('change', (event) => {
        if (event.target.checked) {
            timer = setInterval(() => {
                fetcher();
            }, 5000);
        } else {
            clearInterval(timer);
        }
    });

    // Fire default value for toggle
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    timerSetting.dispatchEvent(evt);

}
