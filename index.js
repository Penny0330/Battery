// 時間單位轉換
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs.toString().padStart(2, '0')}：${mins.toString().padStart(2, '0')}：${secs.toString().padStart(2, '0')}`;
}

// 目前電量
function updateBatteryLevel(level) {
    const nowBattery = document.getElementById('now-battery');
    nowBattery.innerText = `${(level * 100).toFixed(0)} %`;
}

// 切換 box
function toggleShowClass(selector, add) {
    document.querySelectorAll(selector).forEach(box => {
        if (add) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}

// 可用時間
function updateBatteryCanUseTime (dischargingTime) {
    const canUseTime = document.getElementById('time');
    canUseTime.innerText = formatTime(dischargingTime);
};

// 充電時間
function updateBatteryChargingTime (chargingTime) {
    const needChargingTime = document.getElementById('time');
    needChargingTime.innerText = formatTime(chargingTime);
};

function updateBattery (battery) {
    const { charging, chargingTime, dischargingTime } = battery
    toggleShowClass('.show', false);
    
    if (charging) {
        toggleShowClass('.isCharging', true);
        // 還需要充多久時間
        updateBatteryChargingTime(chargingTime);
    } else {
        toggleShowClass('.canUse', true);
        // 可使用時間
        updateBatteryCanUseTime(dischargingTime);
    }
}

navigator.getBattery().then((battery) => {
    // init
    updateBatteryLevel(battery.level);
    updateBattery(battery);

    // 監聽
    battery.onlevelchange = () => updateBatteryLevel(battery.level);
    battery.onchargingchange = () => updateBattery(battery);
    battery.onchargingtimechange = () => updateBatteryChargingTime(chargingTime);
    battery.ondischargingtimechange = () => updateBatteryCanUseTime(dischargingTime);
})


// level: 0-1（目前電量）
// charging: true/false（是否正在充電）
// dischargingTime: 秒（剩餘電量可用時間）
// chargingTime: 秒（充飽電還需多久時間）
// 若是正在充電或放電，另一個狀態會是'Infinity'
// onlevelchange: 監聽目前電量
// onchargingchange: 監聽是否在充電狀態
// onchargingtimechange: 監聽充滿電的時間
// ondischargingtimechange: 監聽放電時間狀態