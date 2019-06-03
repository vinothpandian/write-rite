import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.databaseRef = ref => app
      .database()
      .ref(`users/${ref}`)
      .child('writings');
  }

  createUser({ email, password }) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signInUser({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    this.auth.signOut();
  }

  createWriting(userId) {
    return this.databaseRef(`${userId}`).push().key;
  }

  // async getTitles(userId) {
  //   const value = await this.app
  //     .database()
  //     .ref(`users/${userId}`)
  //     .once('writings');

  //   return Object.keys(value);
  // }

  // async updateWriting(userId, postKey, writing) {

  // }
}

export default Firebase;
