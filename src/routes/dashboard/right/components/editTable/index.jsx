import React, { memo, useState } from 'react'
import './index.less'
import Spreadsheet from "./spreadsheet.js";



const EditTable = props => {
  const _data = props.data;

  return (
    <div className="edit-table-wraper" style={props.style}>
      <Spreadsheet
        height="100%"
        options={{
          mode: "read",
          showToolbar: false,
          showBottomBar:false,
          showContextmenu: false,
          style: {
            bgcolor: '#181a24',
            align: 'left',
            valign: 'middle',
            textwrap: false,
            strike: false,
            underline: false,
            color: '#fff',
            font: {
              name: 'Helvetica',
              size: 10,
              bold: false,
              italic: false,
            },
          }
        }}
      />
    </div>
  )
}

export default memo(EditTable)