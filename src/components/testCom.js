import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "../utils/connect";

const mapStateToProps = (state) => {
  return state;
};

// @connect(mapStateToProps)
class Components extends Component {
  constructor(props) {
    super(props);
  }                                        


  render() {

    return (
      <div className="">
        0000000000000000
      </div>
    );
  }
}

export default connect(mapStateToProps)(Components); 