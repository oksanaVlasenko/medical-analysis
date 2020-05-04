import React from "react";
import data from "../../../data.json";
import "./style.css";

const list1 = data[0].slice(1);
const list2 = data[1].slice(1);
const list3 = data[2].slice(1);

const SelectList = ({ analysis, change }) => {
  return (
    <>
      <label>{data[0][0].groupName}:</label>
      <select value={analysis} onChange={(e) => change(e)} multiple>
        {list1.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
      <label>{data[1][0].groupName}:</label>
      <select value={analysis} onChange={(e) => change(e)} multiple>
        {list2.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
      <label>{data[2][0].groupName}:</label>
      <select value={analysis} onChange={(e) => change(e)} multiple>
        {list3.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectList;
