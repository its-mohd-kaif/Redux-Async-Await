import React, { useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import { Select } from "@shopify/polaris";
import { fetchCategory } from "../redux/reduxSlice";
import { fetchAttributes } from "../redux/reduxSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@shopify/polaris";

function LandingPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.products.data);
  const loader = useSelector((state) => state.products.loading);
  const attribute = useSelector((state) => state.products.attributes);
  const [selected, setSelected] = useState(null);
  const [selectAtt, SetSelectAtt] = useState(null);
  const [payload, setPayload] = useState([]);
  const [str, setStr] = useState([]);
  const [result, setResult] = useState([]);
  const attriOptions = ["--Select--"];
  const handleSelectChange = (val) => {
    setSelected(val);
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === val && data[i].hasChildren === true) {
        setPayload(data[i].parent_id);
        result.push(val);
        str.push(
          <Select
            label="Date range"
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

  const handleAttributes = (val) => {
    SetSelectAtt(val);
  };
  useEffect(() => {
    dispatch(
      fetchCategory({
        url: " https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/",
        payload: payload,
      })
    );
  }, [payload]);

  let options = ["--Select--"];
  if (data !== undefined) {
    data.forEach((element) => {
      let obj = {
        label: element.name,
        value: element.name,
      };
      options.push(obj);
    });
  }

  if (attribute.length !== 0) {
    Object.keys(attribute.data.Mandantory).forEach((element) => {
      let obj = {
        label: element,
        value: element,
      };
      attriOptions.push(obj);
    });
  }

  const [value, setValue] = useState("");
  const [display, setDisplay] = useState([]);

  const handleChange = (val) => {
    setValue(val);
  };

  const attributeAdd = () => {
    let obj = {
      key: selectAtt,
      attribute: value,
    };
    setDisplay([...display, obj]);
    setValue("");
  };

  console.log("Choose", display);

  return (
    <center>
      <div style={{ width: "50%" }}>
        <h1>LandingPage</h1>
        <div>
          {result.map((val) => (
            <span>{val} : </span>
          ))}
        </div>
        {loader === true ? <Loader /> : null}
        {selected !== null ? str : null}
        {data !== null ? (
          <Select
            label="Date range"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
        ) : null}

        {attribute.length !== 0 ? (
          <Select
            label="Attributes"
            options={attriOptions}
            onChange={handleAttributes}
            value={selectAtt}
          />
        ) : null}

        {selectAtt !== null ? (
          <>
            <TextField
              label="Store name"
              value={value}
              onChange={handleChange}
              autoComplete="off"
            />
            <div>
              <button onClick={attributeAdd}>ADD</button>
            </div>
          </>
        ) : null}

        {/* Display */}
        {display.length !== 0 ? (
          <div>
            <table >
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {display.map((val) => (
                  <>
                    <tr>
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
