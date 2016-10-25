import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router';
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

class Home extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     speed : 10
  //   };
  // }

  // componentDidMount() {
  //   const rootRef = firebase.database().ref().child('react');
  //   const speedRef = rootRef.child('speed');
  //   speedRef.on('value', snap => {
  //     this.setState({
  //       speed: snap.val()
  //     });
  //   });
  // }

  render() {
    return (
      <div className="Home">
        <Link to="/snake">Snake</Link>
      </div>
    );
  }
}

export default Home;
