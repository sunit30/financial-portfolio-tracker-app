import React from "react";
import ReactDOM from "react-dom";
import "./MyStocks.css";

class MyStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.data) {
  //     return props.data;
  //   } else {
  //     return null;
  //   }
  // }

  stoptrack = (event) => {
    this.props.stopHandler(event.target.id);
  };
  render() {
    let tabData = Object.values(this.props.data).map((object, i) => {
      return (
        <tr key={i}>
          <td>{object.symbol}</td>
          <td>{object.name}</td>

          <td>{object.number}</td>

          <td>{object.buyprice}</td>
          <td>{object.price}</td>
          <td>{object.pl}</td>
          <td style={{ display: "none" }}>
            <button
              className="StopTrackingBtn"
              style={{ display: "none" }}
            ></button>
          </td>
          <td>
            <div onClick={this.stoptrack} id={object.symbol}>
              {" "}
              Stop Tracking
            </div>
          </td>
        </tr>
      );
    });

    // let tabData = (
    //   <tr>
    //     <td>{this.state.symbol}</td>
    //     <td>{this.state.name}</td>
    //     <td onClick={this.stoptrack} id={this.state.symbol}>
    //       stop
    //     </td>
    //     <td>{this.state.date}</td>
    //   </tr>
    // );

    return (
      <div className="MyStocks">
        <div className="tableDiv">
          <table className="MyStocksTable">
            <thead>
              <tr>
                <th>Stock symbol</th>
                <th>Stock name</th>
                <th>No.of shares</th>
                <th>Buy price</th>
                <th>Current price</th>
                <th>Profit/Loss</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{tabData}</tbody>
          </table>
        </div>

        {tabData.length == 0 ? (
          <h2 className="msg">No Stocks have been selected</h2>
        ) : null}
        {tabData.length >= 5 ? (
          <h2 className="msg">Only 5 stocks can be tracked at a time</h2>
        ) : null}
      </div>
    );
  }
}

export default MyStocks;
