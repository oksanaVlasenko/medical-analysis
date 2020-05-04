import React, { useContext } from "react";
import { ItemContext } from "../../Context/Context";
import InputForm from "./InputForm";
import { useHistory } from "react-router-dom";
import Error from "../404/404";
import "./style.css";

const Form = () => {
  let history = useHistory();
  const msg = "Будь ласка, оберіть список аналізів";
  const item = useContext(ItemContext);
  const dataItem = item.items;
  if (!dataItem) {
    return <Error msg={msg} />;
  }
  const array = dataItem.map((item) =>
    Object.assign({ userResult: null }, item)
  );

  function getAnalysis() {
    let notNormal = [];
    if (item.gender === "male") {
      notNormal = array.filter(
        (item) =>
          item.userResult < item.normal[1].men[0].min ||
          item.userResult > item.normal[1].men[0].max
      );
    } else {
      notNormal = array.filter(
        (item) =>
          item.userResult < item.normal[0].women[0].min ||
          item.userResult > item.normal[0].women[0].max
      );
    }
    return notNormal;
  }

  function getNorm() {
    let analysis = getAnalysis();

    let nameNotNorm = analysis.map((item) => item.name);
    item.analysis = nameNotNorm;

    let RESULT;
    sortByPriority(analysis);

    let shotAnalysis = analysis.map((item) =>
      Object.assign({ description: item.decrease, priority: item.priority }, {})
    );

    console.log(shotAnalysis);
    let resultHigh = [],
      resultMiddle = [],
      resultNorm = [],
      resultLow = [];
    for (let i = 0; i < shotAnalysis.length; i++) {
      if (shotAnalysis[i].priority === 10) {
        resultHigh.push(shotAnalysis[i].description);
      } else if (shotAnalysis[i].priority === 8) {
        resultMiddle.push(shotAnalysis[i].description);
      } else if (shotAnalysis[i].priority === 6) {
        resultNorm.push(shotAnalysis[i].description);
      } else {
        resultLow.push(shotAnalysis[i].description);
      }
    }

    resultHigh = resultHigh.flat(Infinity);
    resultMiddle = resultMiddle.flat(Infinity);
    resultNorm = resultNorm.flat(Infinity);
    resultLow = resultLow.flat(Infinity);

    if (resultNorm.length === 1) {
      RESULT = "Можливий " + resultNorm;
    } else if (resultLow.length === 1) {
      RESULT = "Можливий " + resultLow;
    }

    if (resultHigh.length === 1) {
      RESULT = resultHigh;
    } else if (resultMiddle.length === 1 && resultHigh.length === 0) {
      RESULT = resultMiddle;
    }

    let res = [],
      res2 = [],
      res3 = [];
    if (
      resultHigh.length > 1 &&
      resultMiddle.length === 0 &&
      resultNorm.length === 0 &&
      resultLow.length === 0
    ) {
      RESULT = diagnosisFrequency(resultHigh);
    } else if (resultHigh.length !== 0 && resultMiddle.length !== 0) {
      res = filter(resultHigh, resultMiddle);
      if (res.length === 1 && res.length !== 0) {
        RESULT = res;
      } else if (res.length === 0 && resultNorm.length !== 0) {
        res2 = filter(resultHigh, resultNorm);
      }
      if (res2.length === 1 && res2.length !== 0) {
        RESULT = "Можливий " + res2;
      } else if (resultLow.length !== 0) {
        res3 = filter(res2, resultLow);
      }

      if (res3.length === 1 && res3.length !== 0) {
        RESULT = "Можливий " + res3;
      } else if (
        res3.length === 0 &&
        res2.length === 0 &&
        res.length === 0 &&
        resultLow.length > 1
      ) {
        RESULT = diagnosisFrequency(resultLow);
      }
    } else if (
      resultHigh.length === 0 &&
      resultMiddle.length === 0 &&
      resultNorm.length === 0 &&
      resultLow.length !== 0
    ) {
      if (resultLow.length === 1) {
        RESULT = "Можливий " + resultLow;
      } else {
        RESULT = "Можливий " + diagnosisFrequency(resultLow);
      }
    } else if (
      resultHigh.length === 0 &&
      resultMiddle.length === 0 &&
      resultNorm.length !== 0 &&
      resultLow.length === 0
    ) {
      if (resultNorm.length === 1) {
        RESULT = "Можливий " + resultNorm;
      } else {
        RESULT = "Можливий " + diagnosisFrequency(resultNorm);
      }
    } else if (resultHigh.length !== 0 && resultNorm.length !== 0) {
      res = filter(resultHigh, resultNorm);
      if (res.length === 1 && res.length !== 0) {
        RESULT = res;
      } else if (res.length > 1 && resultLow.length !== 0) {
        res2 = filter(resultLow, res);
      }
      if (res2.length === 1 && res2.length !== 0) {
        RESULT = "Можливий " + res2;
      } else if (res2.length > 0) {
        RESULT = "Можливий " + diagnosisFrequency(res2);
      }
    } else if (
      resultHigh.length === 0 &&
      resultMiddle.length === 0 &&
      resultNorm.length !== 0 &&
      resultLow.length !== 0
    ) {
      res = filter(resultNorm, resultLow);
      if (res.length === 1 && res.length !== 0) {
        RESULT = "Можливий " + res;
      } else if (res.length > 1 && resultLow.length !== 0) {
        RESULT = "Можливий " + diagnosisFrequency(res);
      }
    }

    console.log(resultHigh, "- high");
    console.log(resultMiddle, " mid");
    console.log(resultNorm, "- norm");
    console.log(resultLow, "- low");
    console.log(res, "- res");
    console.log(res2, "- res2");
    console.log(res3, "- res3");
    console.log(RESULT, " -- RESULTTTTTT");
    return RESULT;
  }

  function handleSubmit(e) {
    e.preventDefault();

    item.result = getNorm();
    history.push("/diagnosis");
  }

  return (
    <>
      <form style={style} onSubmit={handleSubmit}>
        {array.map((item, index) => {
          return <InputForm key={index} item={item} gender={item.gender} />;
        })}
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" className="button-sub justify-content-center">
            Результат
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

const style = {
  color: "#fff",
};

function filter(arr1, arr2) {
  let result = arr1.filter(function (val) {
    for (let i = 0; i < arr2.length; i++) {
      if (val === arr2[i]) {
        return true;
      }
    }
    return false;
  });
  return result;
}

function sortByPriority(arr) {
  arr.sort((a, b) => (a.priority < b.priority ? 1 : -1));
}

function diagnosisFrequency(arr) {
  let result;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result = arr[i];
      }
    }
  }
  if (result === undefined) {
    const msg = "\nНедостатньо даних для більш точного висновку. \n";
    result = arr[1] + msg;
  }
  return result;
}
