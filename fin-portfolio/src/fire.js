import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB-pVW5bj6utAqjJZkT3ZHhHyYHCkbpdOM",
  authDomain: "financial-portfolio-d69ac.firebaseapp.com",
  databaseURL: "https://financial-portfolio-d69ac.firebaseio.com",
  projectId: "financial-portfolio-d69ac",
  storageBucket: "financial-portfolio-d69ac.appspot.com",
  messagingSenderId: "1035459282656",
  appId: "1:1035459282656:web:052f4a82a9e88502ce7285",
};

var fire = firebase.initializeApp(firebaseConfig);

// firebase
//   .database()
//   .ref("top/first/")
//   .on("value", (snapshot) => {
//     console.log(snapshot.val());
//   });
// firebase.database().ref("tableStocks");
// firebase.database().ref("listStocks");
// firebase
//   .database()
//   .ref("listStocks/microsoft/")
//   .set({ name: "microsoft", symbol: "ms" });
// firebase
//   .database()
//   .ref("listStocks/intel/")
//   .set({ name: "intel", symbol: "int" });
// firebase
//   .database()
//   .ref("listStocks/gold/")
//   .set({ name: "goldman", symbol: "gs" });

// let newPost = firebase.database().ref().child("listStocks").push().key;
// firebase
//   .database()
//   .ref("listStocks/" + newPost + "/")
//   .set({ symbol: "AXP", name: "American Express Co." });

export default fire;
