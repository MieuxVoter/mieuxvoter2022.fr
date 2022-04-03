import {createContext, useContext, useState, useEffect} from "react"
import {initializeApp} from "firebase/app"
import {getDatabase, ref, push, get, set, runTransaction} from "firebase/database";
import {getAuth, signInAnonymously, onAuthStateChanged} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export let personalData = null;

// const analytics = getAnalytics(app);
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    storeLog({type: 'logged in'}, uid)
    get(ref(database, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        personalData = snapshot.val();
      } else {
        console.log("No data available");
        personalData = {'mj': false, 'sm': false, 'step': Math.random() > 0.5 ? 'mj' : 'sm'}
      }
      console.log(personalData)
    }).catch((error) => {
      console.error(error);
    });
  }
}, null, () => {
  storePersonalData({type: 'logout'})
});

export const getPersonalData = async () => {
  return personalData || {}
}

export const connect = () => {
  getUserId();
}

export const storeBallot = async (ballot, type) => {
  /**
   * Store a ballot from majority judgment
   */
  const uid = await getUserId()
  const payload = {ballot, date: Date.now().toString()}
  const numVotes = Object.keys(ballot).length
  await runTransaction(ref(database, 'numVotes'), (currentValue) => {console.log('numvotes', currentValue); return parseInt((currentValue || 0) + numVotes)})
  await recordParticipations(type)
  return push(ref(database, `${type}/${uid}`), payload)
}

export const storeLog = async (data) => {
  /**
   * Store personal data
   */
  const uid = await getUserId()
  const payload = {data, date: Date.now().toString()}
  return set(ref(database, `logs/${uid}`), payload)
}

export const storePersonalData = async () => {
  /**
   * Store personal data
   */
  const uid = await getUserId()
  const payload = {personalData, date: Date.now().toString()}
  console.log(payload)
  return set(ref(database, `users/${uid}`), payload)
}


const getUserId = async () => {
  const user = auth.currentUser
  if (!user) {
    const userCredential = await signInAnonymously(auth)
      .catch(error => {
        console.log("Error with anonymous connexion", error.code)
        console.log(error.message)
      })
    return userCredential.user.uid;
  }
  return user.uid
}

const recordParticipations = async (type) => {
  if (!personalData || (!personalData.mj && !personalData.sm)) {
    await runTransaction(ref(database, 'numUsers'), (currentValue) => parseInt((currentValue || 0) + 1))
  }
  if (!personalData[type]) {
    personalData[type] = true
    storePersonalData()
  }
}

