import Head from 'next/head'
import '../semantic/semantic.min.css'
import {UserProvider} from "../lib/database"

function MyApp({Component, pageProps}) {
  return <>
    <Head>
      <title>Mieux Voter 2022</title>
      <meta property="og:title" content="MieuxVoter2022.fr : exprimez enfin vos opinions !" key="title" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mieuxvoter2022.fr/" />
      <meta property="og:image" content="https://mieuxvoter2022.fr/opengraph.jpg" />
    </Head>
    <UserProvider><Component {...pageProps} /></UserProvider>

  </>
}

export default MyApp
