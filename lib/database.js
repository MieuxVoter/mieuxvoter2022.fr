import React, {createContext, useContext, useState, useEffect} from "react"
import {initializeApp} from "firebase/app"
import {getAuth, signOut, signInAnonymously, onAuthStateChanged} from "firebase/auth";
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
  return get(ref(database, `v2/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().data || defaultUser;
    } else {
      return defaultUser
    }
  }).catch((error) => {
    console.error("ERROR", error);
    console.error("ERROR", error.message);
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



String.prototype.hashCode = function () {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const useUser = (defaultUser) => {
  const auth = useAuth()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [personalData, setPersonalData] = useState(null)

  const logOut = () => {
    /**
     * Sign out the user.
     */
    signOut(auth).then(function () {
      console.log('Signed Out');
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  }

  const log = async () => {
    /**
     * Store user activity
     */
    const payload = {date: Date.now().toString()}
    return push(ref(database, `logs/${user.uid}`), payload)
  }

  const updateCounterVotes = (numVotes) => {
    runTransaction(
      ref(database, 'numVotes'),
      (currentValue) => {
        if (currentValue === null) {
          return 0;
        }
        const newValue = parseInt((currentValue || 0) + numVotes);
        return newValue;
      }
    ).catch(error => {console.error(error); console.error(error.message)})
  }

  const updateCounterUsers = () => {
    runTransaction(
      ref(database, 'numUsers'),
      (currentValue) => {
        if (currentValue === null) {
          return 0;
        }
        const newValue = parseInt((currentValue || 0) + 1);
        return newValue;
      }
    ).catch(error => {console.error(error); console.error(error.message)})
  }

  const store = async (data, mail) => {
    if (mail) {
      await push(ref(database, `mails/${user.uid.hashCode()}`), mail)
    }
    await set(ref(database, `v2/${user.uid}`), {data, date: Date.now().toString()})

  }

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
        } else {
          console.error('Can\'t load user')
        }
      })

    return () => {}
  }, [auth])

  return {
    error,
    loading,
    setLoading,
    user,
    store,
    log,
    setPersonalData,
    updateCounterUsers,
    updateCounterVotes,
    personalData,
    logOut,
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
