import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.database = app.database();
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
    return this.databaseRef(`${userId}`).push('Write here...').key;
  }

  getTitles(userId) {
    const data = {};

    this.database
      .ref()
      .child(`users/${userId}/writings`)
      .once('value', (snapshot) => {
        snapshot.forEach((child) => {
          data[child.key] = child.val();
        });
      });

    return data;
  }

  // async updateWriting(userId, postKey, writing) {

  // }
}

export default Firebase;
