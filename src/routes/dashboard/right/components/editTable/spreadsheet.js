/* eslint-disable react/prop-types */
import React from "react";
import XSpreadsheet from "./x-spreadsheet";
import "./x-spreadsheet/dist/xspreadsheet.css";
import { v4 as uuidv4 } from "uuid";

export default function Spreadsheet(props) {
  const sheetEl = React.useRef(null);
  const sheetRef = React.useRef(null);
  const containerId = `a${uuidv4()}b`;
  const [state, setState] = React.useState(props.data);
  React.useEffect(() => {
    const element = sheetEl.current;
    const sheet = new XSpreadsheet(`#${containerId}`, {
      view: {
        height: () => (element && element.clientHeight) || document.documentElement.clientHeight,
        width: () => (element && element.clientWidth) || document.documentElement.clientWidth,
      },
      mode: "edit", // edit  read
      showToolbar: false,
      showBottomBar: false,
      showContextmenu: false,
      row: {
        len: 50,
        height: 35,
      },
      cols: {
        len: 26,
        width: 74,
        minWidth: 74,
        indexWidth: 60,
      },
      style: {
        bgcolor: "#181a24",
        align: "left",
        valign: "middle",
        textwrap: false,
        strike: false,
        underline: false,
        color: "#fff",
        font: {
          name: "Helvetica",
          size: 10,
          bold: false,
          italic: false,
        },
      },
      ...props.options,
    })
      .loadData(state) // load data
      .change((data) => {
        setState(data);
        props.onChange && props.onChange(sheet.getData());
      });
    // const getData = sheet.getData
    sheetRef.current = sheet;
    return () => {
      element.innerHTML = "";
    };
  }, [props.options]);
  return (
    <>
      <div
        style={{ height: props.height || "100%", width: props.width || "100%" }}
        id={containerId}
        ref={sheetEl}
      ></div>
    </>
  );
}
