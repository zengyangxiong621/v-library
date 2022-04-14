import React from "react";
import XSpreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/xspreadsheet.css";
import { v4 as uuidv4 } from 'uuid';

const data = {
  rows: {
    "0": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    "1": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    "2": {
      cells: {
        "0": { text: "0" },
        "1": { text: "0" },
        "2": { text: "0" }
      }
    },
    len: 50
  },
  cols: { len: 26 },
  validations: [],
  autofilter: {}
}

export default function Spreadsheet(props) {
  const sheetEl = React.useRef(null);
  const sheetRef = React.useRef(null);
  const containerId = `a${uuidv4()}b`
  const [state, setState] = React.useState(props.data || data);
  React.useEffect(() => {
    const element = sheetEl.current;
    const sheet = new XSpreadsheet(`#${containerId}`, {
      view: {
        height: () =>
          (element && element.clientHeight) ||
          document.documentElement.clientHeight,
        width: () =>
          (element && element.clientWidth) ||
          document.documentElement.clientWidth
      },
      ...props.options
    })
      .loadData(state) // load data
      .change((data) => {
        setState(data);
      });

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
