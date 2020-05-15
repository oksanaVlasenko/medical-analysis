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

    let predictResult = [],
      diagnosisResult = [],
      diasdLow = [],
      pred = [],
      def = [];

    for (let i = 0; i < array.length; i++) {
      if (item.gender === "male") {
        if (array[i].prediction !== null) {
          if (
            array[i].userResult > array[i].prediction[1].men.min &&
            array[i].userResult < array[i].prediction[1].men.max
          ) {
            if (
              Array.isArray(array[i].decrease) &&
              array[i].decrease !== undefined
            ) {
              pred = array[i].decrease.map(
                (item) => "Можливий розвиток " + item
              );
            }

            predictResult.push(pred);
          } else {
            if (
              array[i].userResult < array[i].normal[1].men[0].min ||
              array[i].userResult > array[i].normal[1].men[0].max
            ) {
              if (array[i].priority === 10 || array[i].priority === 8) {
                diagnosisResult.push(array[i].decrease);
              } else if (array[i].priority === 6 || array[i].priority === 3) {
                if (
                  Array.isArray(array[i].decrease) &&
                  array[i].decrease !== undefined
                ) {
                  def = array[i].decrease.map((item) => "Можливий " + item);
                }
                diasdLow.push(def);
              }
            }
          }
        }
      } else {
        if (array[i].prediction !== null) {
          if (
            array[i].userResult > array[i].prediction[0].women.min &&
            array[i].userResult < array[i].prediction[0].women.max
          ) {
            if (
              Array.isArray(array[i].decrease) &&
              array[i].decrease !== undefined
            ) {
              pred = array[i].decrease.map(
                (item) => "Можливий розвиток " + item
              );
            }

            predictResult.push(pred);
          } else {
            if (
              array[i].userResult < array[i].normal[0].women[0].min ||
              array[i].userResult > array[i].normal[0].women[0].max
            ) {
              if (array[i].priority === 10 || array[i].priority === 8) {
                diagnosisResult.push(array[i].decrease);
              } else if (array[i].priority === 6 || array[i].priority === 3) {
                if (
                  Array.isArray(array[i].decrease) &&
                  array[i].decrease !== undefined
                ) {
                  def = array[i].decrease.map((item) => "Можливий " + item);
                }
                diasdLow.push(def);
              }
            }
          }
        }
      }
    }

    predictResult = predictResult.flat(Infinity);
    diagnosisResult = diagnosisResult.flat(Infinity);
    diasdLow = diasdLow.flat(Infinity);

    predictResult = unique(predictResult); //prediction
    diagnosisResult = unique(diagnosisResult); // deficit
    diasdLow = unique(diasdLow); // maybe deficit

    diasdLow = filtersss(diagnosisResult, diasdLow); // filtered maybe deficit by exactly deficit

    let filterForPredict = diasdLow.map((item) =>
      item.substr(item.indexOf(" ") + 1)
    );

    predictResult = filtersss(filterForPredict, predictResult);
    predictResult = filtersss(diagnosisResult, predictResult);

    console.log(predictResult, " -predict");
    console.log(diagnosisResult, " -diagnisis");
    console.log(diasdLow, " -diagnisis loww");

    let result = predictResult.concat(diagnosisResult, diasdLow);
    RESULT = result;
    console.log(RESULT, " - result concat");

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

function filterByDeficit(array, deficit) {
  let result = array.filter(function (item) {
    if (Array.isArray(item.decrease)) {
      if (item.decrease === deficit || item.decrease.length === 1) {
        return item;
      } else {
        return item.decrease.filter((item) => item === deficit);
      }
    }
  });
  return result;
}

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
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result.push(arr[i]);
      }
    }
  }
  if (result === undefined) {
    const msg = "\nНедостатньо даних для більш точного висновку. \n";
    result = arr[1] + msg;
  }
  return result;
}

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

function filtersss(arr1, arr2) {
  let result = arr2.filter(function (val) {
    for (let i = 0; i < arr2.length; i++) {
      var index = val.indexOf(arr1[i]);
      if (index > -1) {
        return false;
      }
    }
    return true;
  });
  return result;
}
