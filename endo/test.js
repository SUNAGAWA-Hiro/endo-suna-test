var str = 'abcdefghij';
// dより前の文字が欲しい
var cut1 = str.substr(0, str.indexOf('d'));
console.log(cut1);
// 結果:abc

// dより後の文字が欲しい
var cut2 = str.substr(str.indexOf('d') + 1);
console.log(cut2);
// 結果:fghij

/*
var testData1 = [
    { windspeed: '1', winddirection: '345' },
    { windspeed: '2', winddirection: '23' },
    { windspeed: '3', winddirection: '65' },
    { windspeed: '4', winddirection: '273' },
    { windspeed: '5', winddirection: '195' },
];
var testData2 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0
];
var isPresent = false;
isPresent = testData2.some(function (el) { return el >= Number(3); });
// console.log(isPresent);

var testData3 = [0, 1, 2, true, false, null, undefined];
const resData = testData3.map((elem) => {
    const ret = typeof elem !== 'undefined' ? elem : -9999;
    return ret
});
console.log(testData3);
console.log(resData);
*/