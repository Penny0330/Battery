navigator.getBattery().then((battery) => {
    console.log('battery: ', battery)
    // level: 0-1（目前電量）
    // charging: true/false（是否正在充電）
    // dischargingTime: 秒（剩餘電量可用時間）
    // chargingTime: 秒（充飽電還需多久時間）
    // 若是正在充電或放電，另一個狀態會是'Infinity'
    // onchargingchange: 監聽充電狀態
    // onchargingtimechange: 監聽滿電狀態
    // ondischargingtimechange: 監聽沒電狀態
    // onlevelchange: 監聽電量
    battery.onlevelchange = () => {
        console.log('onlevelchange: ', battery.level)
    }
})