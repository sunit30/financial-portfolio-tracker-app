import React from "react";
import ReactDOM from "react-dom";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="headerFlex">
        <img src={"./money.png"} alt={"money"} />
        <h2>Finance Portfolio Tracker</h2>
      </div>
    );
  }
}

export default Header;
