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
      .push({
        topic: 'Untitled',
        writing: 'Write here...',
      }).key;
  }

  async getWritings(userId) {
    const snapshot = await this.databaseRef(userId)
      .child('writings')
      .once('value');

    const value = {};

    snapshot.forEach((child) => {
      value[child.key] = child.val();
    });

    const topics = Object.entries(value).map(([k, v]) => ({ id: k, topic: v.topic }));

    return topics;
  }

  async getWriting(userId, id) {
    const snapshot = await this.databaseRef(userId)
      .child(`writings/${id}`)
      .once('value');

    const value = snapshot.val();

    return value.writing;
  }

  saveWriting(userId, id, writing) {
    this.databaseRef(userId)
      .child('writings')
      .update({
        [id]: writing,
      });
  }
}

export default Firebase;
