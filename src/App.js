import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDpIqC_0cxIVfW6THRUmj_SjCFvwJ21JQs",
  authDomain: "website-a0e3b.firebaseapp.com",
  databaseURL: "https://website-a0e3b.firebaseio.com",
  storageBucket: "website-a0e3b.appspot.com",
  messagingSenderId: "816865712645"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed : 10
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.speed}</h1>
      </div>
    );
  }
}

export default App;
