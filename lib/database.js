import React, {createContext, useContext, useState, useEffect} from "react"
import {initializeApp} from "firebase/app"
import {getAuth, signInAnonymously, onAuthStateChanged} from "firebase/auth";
import {getDatabase, ref, push, get, set, runTransaction} from "firebase/database";

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
export const firebaseApp = initializeApp(firebaseConfig);


const connect = () => {
  signInAnonymously(auth)
    .catch(error => {
      console.log("Error with anonymous connexion", error.code)
      console.log(error.message)
    })
}

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export const UserContext = createContext({
  user: null,
})

export const loadUser = async (uid, defaultUser) => {
  console.log(uid, defaultUser)
  return get(ref(database, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().personalData;
    } else {
      return defaultUser
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const getNumVotes = async () => {
  return get(ref(database, 'numVotes')).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return 0;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const getNumParticipants = async () => {
  return get(ref(database, 'numUsers')).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return 0;
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = auth.currentUser
    if (!user) {
      connect()
    }
    return {
      loading: !user,
      user,
    }
  })

  const onChange = user => {
    if (user) {
      setState({loading: false, user})
    } else {
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange)
    return () => unsubscribe()
  }, [])

  return state
}

export const useUser = (defaultUser) => {
  const auth = useAuth()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [personalData, setPersonalData] = useState(null)

  const storeBallot = async (ballot, type) => {
    /**
     * Store a ballot from majority judgment
     */
    const payload = {ballot, date: Date.now().toString()}
    const numVotes = Object.keys(ballot).length
    await runTransaction(ref(database, 'numVotes'), (currentValue) => {console.log('numvotes', currentValue); return parseInt((currentValue || 0) + numVotes)})
    await recordParticipations(type)
    return push(ref(database, `${type}/${user.uid}`), payload)
  }

  const log = async () => {
    /**
     * Store user activity
     */
    const payload = {date: Date.now().toString()}
    return push(ref(database, `logs/${user.uid}`), payload)
  }

  const recordParticipations = async (type) => {
    if (!personalData || (!personalData.mj && !personalData.sm)) {
      await runTransaction(ref(database, 'numUsers'), (currentValue) => parseInt((currentValue || 0) + 1))
    }
    if (!personalData[type]) {
      setPersonalData(old => ({...old, [type]: true}))
    }
  }

  useEffect(() => {
    if (personalData) {
      const payload = {personalData, date: Date.now().toString()}
      setPersonalData(personalData)
      set(ref(database, `users/${user.uid}`), payload)
    }
  }, [personalData])

  useEffect(() => {
    if (!loading || auth.loading) {
      return () => {}
    }

    loadUser(auth.user.uid, defaultUser).then(
      (user) => {
        if (user) {
          setUser(auth.user)
          setPersonalData(user)
          setLoading(false)
          // log()
        } else {
          console.error('Cant load user')
        }
      })

    return () => {}
  }, [auth, loading])

  return {
    error,
    loading,
    user,
    log,
    setPersonalData,
    storeBallot,
    personalData,
  }
}

export const UserProvider = props => {
  const {loading, error, user, setUser} = useUser()

  // if (loading) {
  //   return (
  //     <p>Loading</p>
  //   )
  // }

  const {children} = props
  return (
    <UserContext.Provider value={{loading, error, user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}
