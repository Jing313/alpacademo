import Head from 'next/head';
import '../styles/reset.scss';
import '../styles/globals.scss'
import { motion } from "framer-motion"
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ALPACADABRAZ NFT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://alpacadabraz.io" />
        <meta name="twitter:title" content="ALPACADABRAZ - 9669 high quality alpacas" />
        <meta name="twitter:description" content="Alpacadabraz consists of a LIMITED collection of only 9669 HIGH QUALITY randomly generated NFTs, walking loose on the Ethereum blockchain." />
        <meta name="twitter:image" content="https://alpacadabraz.io/og_img.png" />

        {/* Open Graph */}
        <meta property="og:url" content="https://alpacadabraz.io" />
        <meta property="og:image" content="https://alpacadabraz.io/og_img.png" />
        <meta property="og:image:alt" content="ALPACADABRAZ NFT" />
        <meta property="og:site_name" content="ALPACADABRAZ - 9669 high quality alpacas" />
        <meta property="og:title" content="ALPACADABRAZ - 9669 high quality alpacas" />
        <meta property="og:description" content="Alpacadabraz consists of a LIMITED collection of only 9669 HIGH QUALITY randomly generated NFTs, walking loose on the Ethereum blockchain." />
      </Head>
      <Layout>
      <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ 
                  delay: 0.6, 
                  duration: 1, 
                  ease: [0.61, 1, 0.88, 1],
                        }}>
                  <Component {...pageProps} />
      </motion.div>
      </Layout>
            
      
    </>
  );
}

export default MyApp
