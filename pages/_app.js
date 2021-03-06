import Head from 'next/head'
import '../semantic/semantic.min.css'

function MyApp({Component, pageProps}) {
  return <>
    <Head>
      <title>Mieux Voter 2022</title>
      <meta property="og:title" content="MieuxVoter2022.fr : exprimez enfin vos opinions !" key="title" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mieuxvoter2022.fr/" />
      <meta property="og:image" content="https://mieuxvoter2022.fr/opengraph.jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@mieux_voter" />
      <meta property="twitter:creator" content="@pierrelouisg" />
    </Head>
    <Component {...pageProps} />

  </>
}

export default MyApp
