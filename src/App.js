import React from "react";
import MyStocks from "./components/MyStocks";
import AddStocks from "./components/AddStocks";
import Modal from "./components/Modal";
import Header from "./components/Header";
import firebase from "./fire";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableStocks: {},
      listStocks: {},
      showModal: false,
    };
    this.buttonSelected = {};
  }
  updateState() {
    Axios.get(
      "https://financial-portfolio-d69ac.firebaseio.com/listStocks.json"
    )
      .then((response) => {
        let listStocks = response.data;
        //console.log("now", response.data);

        Axios.get(
          "https://financial-portfolio-d69ac.firebaseio.com/tableStocks.json"
        ).then((response) => {
          if (!response.data) {
            this.setState({
              tableStocks: {},
              listStocks: listStocks,
            });
          } else if (!listStocks) {
            this.setState({
              tableStocks: response.data,
              listStocks: {},
            });
          } else {
            this.setState({
              tableStocks: response.data,
              listStocks: listStocks,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  buttonHandler = (event) => {
    var newPostKey = firebase.database().ref().child("tableStocks").push().key;
    //var newPostKey = firebase.database().ref().child("tableStocks").push().key;
    // firebase
    //   .database()
    //   .ref("tableStocks/" + newPostKey + "/")
    //   .set({ symbol: event });
    Axios.get(
      "https://financial-portfolio-d69ac.firebaseio.com/listStocks.json"
    )
      .then((response) => {
        let keyData = Object.keys(response.data).filter((key) => {
          return response.data[key].symbol == event;
        });

        //console.log(keyData);
        this.buttonSelected = this.state.listStocks[keyData[0]];
        this.buttonSelected.key = keyData[0];
        this.buttonSelected.newpostkey = newPostKey;
        //console.log(this.buttonSelected);
        // firebase
        //   .database()
        //   .ref("tableStocks/" + newPostKey + "/")
        //   .update({
        //     name: response.data[keyData[0]].name,
        //   })
        //   .then(() => {
        //     firebase
        //       .database()
        //       .ref("listStocks/" + keyData[0] + "/")
        //       .remove()
        //       //.then(() => {
        //       //this.updateState();
        //       // })
        //       .then(() => {
        //         this.startModal();
        //       });
        //   });
      })
      .then(() => {
        this.startModal();
      });

    // let newstate = {};
    // for (let v in this.state.listStocks) {
    //   if (this.state.listStocks[v].symbol != event.target.innerHTML) {
    //     newstate[v] = this.state.listStocks[v];
    //   } else continue;
    // }

    //this.setState({ listStocks: newstate });
    //this.props.addtoTable(event.target.innerHTML);
  };

  stopHandler = (event) => {
    var newPostKey1 = firebase.database().ref().child("listStocks").push().key;
    firebase
      .database()
      .ref("listStocks/" + newPostKey1 + "/")
      .set({ symbol: event });
    Axios.get(
      "https://financial-portfolio-d69ac.firebaseio.com/tableStocks.json"
    ).then((response) => {
      let keyData1 = Object.keys(response.data).filter((key) => {
        return response.data[key].symbol == event;
      });
      //console.log(keyData);
      firebase
        .database()
        .ref("listStocks/" + newPostKey1 + "/")
        .update({ name: response.data[keyData1[0]].name })
        .then(() => {
          firebase
            .database()
            .ref("tableStocks/" + keyData1[0] + "/")
            .remove()
            .then(() => {
              this.updateState();
            });
        });
    });
  };
  startModal = () => {
    this.setState({ showModal: true });
  };
  stopModal = () => {
    this.setState({ showModal: false });
  };
  formEval = (date, number, buyprice, currprice, pl) => {
    // this.setState({
    //   newValuesFromModal: {
    //     name: this.buttonSelected.name,
    //     symbol: this.buttonSelected.symbol,
    //     key: this.buttonSelected.key,
    //     date: date,
    //   },
    // })
    //alert(currprice);

    firebase
      .database()
      .ref("tableStocks/" + this.buttonSelected.newpostkey + "/")
      .set({ symbol: this.buttonSelected.symbol });
    // firebase
    //     .database()
    //     .ref("tableStocks/" + newPostKey + "/")
    //     .update({
    //       name: response.data[keyData[0]].name,
    //     })
    firebase
      .database()
      .ref("tableStocks/" + this.buttonSelected.newpostkey + "/")
      .update({
        name: this.buttonSelected.name,
        number: number,
        buyprice: buyprice,
        price: currprice,
        pl: pl,
      })
      .then(() => {
        firebase
          .database()
          .ref("listStocks/" + this.buttonSelected.key + "/")
          .remove();
      })
      .then(() => {
        this.updateState();
      })
      .then(() => {
        this.stopModal();
      });
  };

  // change() {
  //   if (this.state.a.length > 1) {
  //     this.setState({ a: [2] });
  //   }
  // }
  // tableData() {
  //   return Object.values(this.state).map((object) => {
  //     return <td>{object.name}</td>;
  //   });
  // }
  // addtoMyStocks = (val) => {
  //   this.setState({ e: val });
  // };
  componentDidMount() {
    this.updateState();
  }
  render() {
    var d = new Date();
    var day = d.getDay();
    var dayStyle = {
      textAlign: "center",
      fontSize: "calc(0.5em + 0.6vw)",
      fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
      color: "rgba(0, 0, 0, 0.69)",
    };
    return (
      <div>
        <Header></Header>
        <br></br>
        {day == 6 || day == 0 ? (
          <h2 style={dayStyle}>
            Since its a weekend, Stock Prices are taken from Friday.
          </h2>
        ) : null}
        <MyStocks
          data={
            //<tr>{this.tableData()}</tr>
            this.state.tableStocks
            //this.buttonSelected
          }
          stopHandler={this.stopHandler}
          counter={Object.keys(this.state.tableStocks).length}
        ></MyStocks>

        {Object.keys(this.state.tableStocks).length >= 5 ? null : (
          <AddStocks
            //addtoTable={this.addtoMyStocks}
            data={this.state.listStocks}
            buttonHandler={this.buttonHandler}
            startmodal={this.startModal}
          ></AddStocks>
        )}

        {this.state.showModal == true ? (
          <Modal
            stopmodal={this.stopModal}
            formeval={this.formEval}
            buttonselected={this.buttonSelected}
          ></Modal>
        ) : null}
      </div>
    );
  }
}

export default App;
