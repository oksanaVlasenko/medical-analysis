import React, { useState, useContext } from "react";
import datas from "../../../data.json";
import "./style.css";
import Gender from "../Gender/Gender";
import SelectList from "../Select/SelectList";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../../Context/Context";

const MainForm = () => {
  const item = useContext(ItemContext);
  let history = useHistory();
  const [data] = useState({ male: "male", female: "female" });
  const [gender, setGender] = useState("male");
  const [analysis, setAnalysis] = useState([]);
  const [allItem, setItem] = useState([]);

  function changeGender(e) {
    setGender(e.target.value);
  }

  function changeAnalysis(e) {
    setAnalysis([...analysis, e.target.value]);
  }

  function addItem() {
    var filtered = [];

    var filtered1 = filter(datas[0], analysis);

    var filtered2 = filter(datas[1], analysis);

    var filtered3 = filter(datas[2], analysis);

    filtered = filtered1.concat(filtered2, filtered3);
    setItem([...allItem, filtered]);

    item.items = filtered;
    item.gender = gender;
    return allItem;
  }

  //
  function handleSubmit(e) {
    e.preventDefault();
    history.push({
      pathname: "/result",
    });
    //item.gender = gender;
    console.log(gender);
    console.log(analysis);
    console.log(allItem);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Gender data={data} gender={gender} change={changeGender} />

        <SelectList analysis={analysis} change={changeAnalysis} />

        <div className="d-flex flex-row justify-content-center align-items-center">
          <button className="button-sub" type="submit" onClick={addItem}>
            Далі
          </button>
        </div>
      </form>
    </>
  );
};

export default MainForm;

function filter(arr1, arr2) {
  let result = arr1.filter(function (val) {
    for (let i = 0; i < arr2.length; i++) {
      if (val.name === arr2[i]) {
        return true;
      }
    }
    return false;
  });
  return result;
}
