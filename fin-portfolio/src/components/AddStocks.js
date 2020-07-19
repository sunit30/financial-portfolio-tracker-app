import React from "react";
import ReactDOM from "react-dom";
import "./AddStocks.css";
import firebase from "firebase";
import Axios from "axios";
class AddStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tableStocks: {},
      // listStocks: {},
    };
  }

  // startData = () => {
  //   Axios.get(
  //     "https://financial-portfolio-d69ac.firebaseio.com/listStocks.json"
  //   )
  //     .then((response) => {
  //       let listStocks = response.data;
  //       Axios.get(
  //         "https://financial-portfolio-d69ac.firebaseio.com/tableStocks.json"
  //       ).then((response) => {
  //         this.setState({
  //           tableStocks: response.data,
  //           listStocks: listStocks,
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // fire
  //   .database()
  //   .ref()
  //   .once("value")
  //   .then((snapshot) => {
  //     this.setState(snapshot.val().tickers.intel);
  //   });
  // };
  // buttonHandler = (event) => {
  //   var newPostKey = firebase.database().ref().child("tableStocks").push().key;
  //   firebase
  //     .database()
  //     .ref("tableStocks/" + newPostKey + "/")
  //     .set({ name: event.target.innerHTML });
  //   let newstate = {};
  //   for (let v in this.state.listStocks) {
  //     if (this.state.listStocks[v].symbol != event.target.innerHTML) {
  //       newstate[v] = this.state.listStocks[v];
  //     } else continue;
  //   }
  //   this.setState({ listStocks: newstate });
  //   this.props.addtoTable(event.target.innerHTML);
  // };

  render() {
    // console.log(this.state.tableStocks);
    // console.log(this.state.listStocks);

    // let ele = Object.values(this.state.listStocks).map((object) => {
    //   return (
    //     <div className="AddStocksFlex">
    //       <label>
    //         <button onClick={this.buttonHandler} className="StockButton">
    //           {object.symbol}
    //         </button>
    //         <div>{object.name}</div>
    //       </label>
    //     </div>
    //   );
    // });

    //console.log(this.props.data);
    let addData = Object.values(this.props.data).map((object, i) => {
      return (
        <div key={i} className="AddStocksFlex">
          <label>
            <button onClick={this.makeChange} className="StockButton">
              {object.symbol}
            </button>
            <div>{object.name}</div>
          </label>
        </div>
      );
    });

    return (
      <div className="AddStocksTitle">
        <h2>Add stocks to my stocks</h2>
        <div className="outerflex">{addData}</div>
      </div>
    );
  }
  componentDidMount() {
    // this.startData();
  }
  makeChange = (event) => {
    this.props.buttonHandler(event.target.innerHTML);
    // .then(() => {
    //   this.props.startmodal();
    // });
  };
}

export default AddStocks;
