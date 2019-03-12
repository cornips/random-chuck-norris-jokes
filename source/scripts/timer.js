'use strict';

import fetcher from './fetcher';

export default function timer() {

    const timerSetting = document.getElementById("timerSetting");
    let timer = null;

    timerSetting.addEventListener('change', (event) => {
        if (event.target.checked) {
            let timer = setInterval(() => {
                fetcher();
            }, 5000);
        } else {
            clearInterval(timer);
        }
    });

    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    timerSetting.dispatchEvent(evt);

}
