import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Select } from "@shopify/polaris";
import { fetchCategory } from "../redux/reduxSlice";
import { fetchAttributes } from "../redux/reduxSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@shopify/polaris";
import { Button } from "@shopify/polaris";

function LandingPage() {
  // UseDispatch For Dispatching Actions
  const dispatch = useDispatch();
  // UseSelect For Check Updated State Value
  const data = useSelector((state) => state.products.products.data);
  const loader = useSelector((state) => state.products.loading);
  const attribute = useSelector((state) => state.products.attributes);
  const error = useSelector((state) => state.products);
  // Select State For check which categrory is press
  const [selected, setSelected] = useState(undefined);
  // SelectAtt For check which attribute is press
  const [selectAtt, SetSelectAtt] = useState(undefined);
  // Payload State For Store Payload and pass with api
  const [payload, setPayload] = useState([]);
  // Str State For Hold and Display All Categroy One By One
  const [str, setStr] = useState([]);
  // Result State For Storing Attribute Key Value
  const [result, setResult] = useState([]);
  const attriOptions = ["--Select--"];
  // Throw Error When Api Response is False
  if (error.products.success === false) {
    throw new Error(error.message);
  }
  // Function When User Select Category
  const handleSelectChange = (val) => {
    setSelected(val);
    result.push(val);
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === val && data[i].hasChildren === true) {
        setPayload(data[i].parent_id);
        tempArr.push(
          <Select
            key={Math.random() * 10000}
            label="Category"
            options={options}
            onChange={handleSelectChange}
            value={val}
          />
        );
        setStr([...str, tempArr]);
      } else if (data[i].name === val && data[i].hasChildren === false) {
        dispatch(
          fetchAttributes({
            url: "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/",
            browseNodeId: data[i].browseNodeId,
            primaryCategory: data[i].category["primary-category"],
            subCategory: data[i].category["sub-category"],
          })
        );
      }
    }
    setResult([...result]);
  };
  // Function for select attribute
  const handleAttributes = (val) => {
    SetSelectAtt(val);
  };
  // UseEffect for When Page is reload then we dispatch action
  useEffect(() => {
    dispatch(
      fetchCategory({
        url: " https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
        payload: payload,
      })
    );
  }, [payload]);

  let options = ["--Select--"];
  // Set Options Value When Data is Get From Api
  if (data !== undefined) {
    data.forEach((element, index) => {
      let obj = {
        label: element.name,
        value: element.name,
        key: index,
      };
      options.push(obj);
    });
  }
  // Set Options Value When Attribute Data Is Get From APi
  if (attribute.length !== 0) {
    Object.keys(attribute.data.Mandantory).forEach((element, index) => {
      let obj = {
        label: element,
        value: element,
        key: index,
      };
      attriOptions.push(obj);
    });
  }
  // UseState For Set Attribute Data into table
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState([]);
  // State For Get Attribute Value
  const handleChange = (val) => {
    setValue(val);
  };
  // Function That Push Attribute Value into state and display
  const attributeAdd = () => {
    if (value === "") {
      alert("Blank Field Not Be Added!!!");
    } else {
      let obj = {
        key: selectAtt,
        attribute: value,
      };
      setDisplay([...display, obj]);
      setValue("");
    }
  };

  return (
    <center>
      <div style={{ width: "50%" }}>
        <h1 style={{ fontSize: "30px", margin: "1em" }}>Shopify Async Await</h1>
        {/* Breadcrumb */}
        <div>
          {result.map((val, index) => (
            <span key={index} style={{ fontSize: "24px", marginTop: "1em" }}>
              {val} <i className="fa fa-angle-double-right"></i>{" "}
            </span>
          ))}
        </div>
        {/* Loader */}
        {loader === true ? <Loader /> : null}
        {/* Category */}
        {selected !== undefined ? str : undefined}
        {loader === false ? (
          <Select
            key={Math.random() * 10000}
            label="Category"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
        ) : null}
        {/* Attribute */}
        {attribute.length !== 0 ? (
          <Select
            key={Math.random() * 10000}
            label="Attributes"
            options={attriOptions}
            onChange={handleAttributes}
            value={selectAtt}
          />
        ) : null}
        {/* Input Form And Button */}
        {selectAtt !== undefined ? (
          <>
            <TextField
              label="Value"
              value={value}
              onChange={handleChange}
              autoComplete="off"
            />
            <div style={{ margin: "1em" }}>
              <Button onClick={attributeAdd}>Add product</Button>
            </div>
          </>
        ) : null}

        {/* Table Display */}
        {display.length !== 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {display.map((val, index) => (
                  <>
                    <tr key={index}>
                      <td>{val.key}</td>
                      <td>{val.attribute}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </center>
  );
}

export default LandingPage;
