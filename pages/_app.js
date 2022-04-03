import '../semantic/semantic.min.css'
// import {UserProvider} from "../lib/database"

function MyApp({Component, pageProps}) {
  //  return <UserProvider><Component {...pageProps} /></UserProvider>
  return <Component {...pageProps} />
}

export default MyApp
