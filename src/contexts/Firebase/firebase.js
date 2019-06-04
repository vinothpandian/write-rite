import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.database = app.database();
    this.databaseRef = ref => this.database.ref(`users/${ref}`);
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

  addWriting(userId) {
    return this.databaseRef(userId)
      .child('writings')
      .push('Write here...').key;
  }

  async getWritings(userId) {
    const snapshot = await this.databaseRef(userId)
      .child('writings')
      .once('value');

    const value = {};

    snapshot.forEach((child) => {
      value[child.key] = child.val();
    });

    return value;
  }

  async getWriting(userId, id) {
    const snapshot = await this.databaseRef(userId)
      .child(`writings/${id}`)
      .once('value');

    return snapshot.val();
  }

  // async updateWriting(userId, postKey, writing) {

  // }
}

export default Firebase;
