import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from './config';
import { emptyValue } from '../../utils';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.database = app.database();
    this.databaseRef = ref => this.database.ref(`users/${ref}`);
  }

  getUserID() {
    const user = this.auth.currentUser;

    if (!user) {
      return null;
    }
    return user.uid;
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

  addWriting() {
    const userID = this.getUserID();

    if (!userID) {
      return null;
    }

    return this.databaseRef(userID)
      .child('writings')
      .push({
        topic: 'Untitled',
        timestamp: Date.now(),
        writing: emptyValue.toJSON(),
      }).key;
  }

  async getWritings() {
    const userID = this.getUserID();

    if (!userID) {
      return [];
    }

    const snapshot = await this.databaseRef(userID)
      .child('writings')
      .once('value');

    const value = {};

    snapshot.forEach((child) => {
      value[child.key] = child.val();
    });

    const topics = Object.entries(value).map(([k, v]) => ({
      id: k,
      topic: v.topic,
      timestamp: v.timestamp,
    }));

    return topics;
  }

  async getWriting(id) {
    const userID = this.getUserID();

    if (!userID) {
      return emptyValue;
    }

    const snapshot = await this.databaseRef(userID)
      .child(`writings/${id}`)
      .once('value');

    const { writing, timestamp } = snapshot.val();

    return {
      writing,
      timestamp,
    };
  }

  saveWriting(id, topic, writing) {
    const userID = this.getUserID();

    if (!userID) {
      window.alert('Not signed in. Data not synced');
      return;
    }

    const timestamp = Date.now();

    this.databaseRef(userID)
      .child('writings')
      .update({
        [id]: {
          topic,
          timestamp,
          writing,
        },
      });
  }
}

export default Firebase;
