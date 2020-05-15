// for (let i = 0; i < shotAnalysis.length; i++) {
//   if (shotAnalysis[i].priority === 10) {
//     resultHigh.push(shotAnalysis[i].description);
//   } else if (shotAnalysis[i].priority === 8) {
//     resultMiddle.push(shotAnalysis[i].description);
//   } else if (shotAnalysis[i].priority === 6) {
//     resultNorm.push(shotAnalysis[i].description);
//   } else {
//     resultLow.push(shotAnalysis[i].description);
//   }
// }

// resultHigh = resultHigh.flat(Infinity);
// resultMiddle = resultMiddle.flat(Infinity);
// resultNorm = resultNorm.flat(Infinity);
// resultLow = resultLow.flat(Infinity);

// let arr2 = resultHigh.concat(resultMiddle, resultNorm, resultLow);
// //console.log(arr2, " --arr2");

// let unie = unique(arr2);
// //console.log(unie, "- uniw");

// if (resultHigh.length === 1) {
//   RESULT = resultHigh;
// } else if (resultMiddle.length === 1 && resultHigh.length === 0) {
//   RESULT = resultMiddle;
// } else if (resultNorm.length === 1) {
//   RESULT = "Можливий " + resultNorm;
// } else if (resultLow.length === 1) {
//   RESULT = "Можливий " + resultLow;
// }
// let res = [],
//   res2 = [],
//   res3 = [];
// if (
//   resultHigh.length > 1 &&
//   resultMiddle.length === 0 &&
//   resultNorm.length === 0 &&
//   resultLow.length === 0
// ) {
//   RESULT = diagnosisFrequency(resultHigh);
// } else if (resultHigh.length !== 0 && resultMiddle.length !== 0) {
//   res = filter(resultHigh, resultMiddle);
//   if (res.length === 1 && res.length !== 0) {
//     RESULT = res;
//   } else if (res.length === 0 && resultNorm.length !== 0) {
//     res2 = filter(resultHigh, resultNorm);
//   }
//   if (res2.length === 1 && res2.length !== 0) {
//     RESULT = "Можливий " + res2;
//   } else if (resultLow.length !== 0) {
//     res3 = filter(res2, resultLow);
//   }

//   if (res3.length === 1 && res3.length !== 0) {
//     RESULT = "Можливий " + res3;
//   } else if (
//     res3.length === 0 &&
//     res2.length === 0 &&
//     res.length === 0 &&
//     resultLow.length > 1
//   ) {
//     RESULT = diagnosisFrequency(resultLow);
//   }
// } else if (
//   resultHigh.length === 0 &&
//   resultMiddle.length === 0 &&
//   resultNorm.length === 0 &&
//   resultLow.length !== 0
// ) {
//   if (resultLow.length === 1) {
//     RESULT = "Можливий " + resultLow;
//   } else {
//     RESULT = "Можливий " + diagnosisFrequency(resultLow);
//   }
// } else if (
//   resultHigh.length === 0 &&
//   resultMiddle.length === 0 &&
//   resultNorm.length !== 0 &&
//   resultLow.length === 0
// ) {
//   if (resultNorm.length === 1) {
//     RESULT = "Можливий " + resultNorm;
//   } else {
//     RESULT = "Можливий " + diagnosisFrequency(resultNorm);
//   }
// } else if (resultHigh.length !== 0 && resultNorm.length !== 0) {
//   res = filter(resultHigh, resultNorm);
//   if (res.length === 1 && res.length !== 0) {
//     RESULT = res;
//   } else if (res.length > 1 && resultLow.length !== 0) {
//     res2 = filter(resultLow, res);
//   }
//   if (res2.length === 1 && res2.length !== 0) {
//     RESULT = "Можливий " + res2;
//   } else if (res2.length > 0) {
//     RESULT = "Можливий " + diagnosisFrequency(res2);
//   }
// } else if (
//   resultHigh.length === 0 &&
//   resultMiddle.length === 0 &&
//   resultNorm.length !== 0 &&
//   resultLow.length !== 0
// ) {
//   res = filter(resultNorm, resultLow);
//   if (res.length === 1 && res.length !== 0) {
//     RESULT = "Можливий " + res;
//   } else if (res.length > 1 && resultLow.length !== 0) {
//     RESULT = "Можливий " + diagnosisFrequency(res);
//   }
// }

// console.log(resultHigh, "- high");
// console.log(resultMiddle, " mid");
// console.log(resultNorm, "- norm");
// console.log(resultLow, "- low");
// console.log(res, "- res");
// console.log(res2, "- res2");
// console.log(res3, "- res3");
// console.log(RESULT, " -- RESULTTTTTT");
