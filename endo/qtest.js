const testIoData = {
    pointId: "402200353_0101",
    continuity: 2,
    element: "wnd",
};

const testData = [
    {
        "station_id": "402200353_0101",
        "station_name": "岡山",
        "observation_time": "2021-04-26T14:55:00Z",
        "temp": "23.1",
        "wnddir": "4",
        "wndspd": "3.1",
        "prcrin_1hour": "1.5",
        "prcrin_5min": "0.5",
        "prcrin_10min": "0.5",
        "prcrin_prst": "5.5",
        "prcrin_24hour": "8.0",
        "begin_prcrin": "2021-04-26T12:15:00Z",
        "created_at": "2021-04-26T14:57:12Z",
        "created_by": "amoeba"
    }, {
        "station_id":"402200353_0101",
        "station_name":"岡山",
        "observation_time":"2021-04-26T14:40:00Z",
        "temp":"23.4",
        "wnddir":"3",
        "wndspd":"2.6",
        "prcrin_1hour":"2.5",
        "prcrin_5min":"0.5",
        "prcrin_10min":"1.0",
        "prcrin_prst":"6.0",
        "prcrin_24hour":"8.5",
        "begin_prcrin":"2021-04-26T11:15:00Z",
        "created_at":"2021-04-26T14:02:45Z",
        "created_by":"amoeba"
    }, {
        "station_id":"402200353_0101",
        "station_name":"岡山",
        "observation_time":"2021-04-26T14:00:00Z",
        "temp":"23.3",
        "wnddir":"4",
        "wndspd":"2.9",
        "prcrin_1hour":"2.0",
        "prcrin_5min":"0.5",
        "prcrin_10min":"2.0",
        "prcrin_prst":"5.0",
        "prcrin_24hour":"8.5",
        "begin_prcrin":"2021-04-26T11:15:00Z",
        "created_at":"2021-04-26T14:02:45Z",
        "created_by":"amoeba"
    }
]

function loadLogicData(param) {
    const {
        pointId,
        continuity,
        element,
    } = param;

    if (!pointId || !continuity || !element) {
        return {};
    }

    //const latestData = await this.getLatest3hour(pointId);
    const latestData = testData;
    if (!latestData) {
        return {};
    }

    const observationTime = latestData[0].observation_time;

    let targetElement;
    if (element.match(/wnd/)) {
        targetElement = Object.keys(latestData[0]).filter(el => el.startsWith(element));
    } else {
        targetElement = [element];
    }

    /*
    // 予測データの場合、対象期間のデータのみ切り出し
    // →　対象期間のデータがない場合、{} を返す
    // 予測時間は前1時間なので、現在時刻を含む予測は1時間後の予測
    const dt = new Date();
    let startTime = DatetimeUtil.addHours(dt, 1);
    startTime = DatetimeUtil.toString(new Date(startTime), '%Y-%m-%dT%H:00:00Z');
    const startIndex = ftList.findIndex(el => el === startTime);
    if (startIndex === -1) {
        return {};
    }
    */

    // ハードコーディング気味 上手い方法を知りたい
    let targetData = [];
    [...Array(continuity).keys()].forEach((i) => {
        if (targetElement.length > 1) {
            targetData.push({});
            targetElement.forEach((key) => {
                targetData[i][key] = latestData[i][key];
            });
        } else {
            targetData.push(latestData[i][targetElement])
        }
    });

    targetData = targetData.map(e => ({ winddirection: e.wnddir, windspeed: e.wndspd }));
    // 返り値
    return {
        pointId,
        observationTime,
        targetData,
    };
}

console.log(loadLogicData(testIoData));