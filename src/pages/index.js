import { motion } from 'framer-motion'
import Head from 'next/head'
import Hero from '../components/Home/Hero';
import ThreeDAlpacas from '../components/Home/3dAlpacas';
import About from '../components/Home/About';
import Team from '../components/Home/Team';
import Faq from '../components/Home/Faq';
import GenesisBanner from '../components/Home/GenesisBanner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../styles/modules/Home/Hero.module.scss'



import { Web3ReactProvider } from '@web3-react/core'
// import your favorite web3 convenience library here

import getLibrary from '../store/library';


export default function Home() {
  return (
    <>
      <Head>
            <title>ALPACADABRAZ NFT - Home</title>
            <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer style={{
            zIndex: '99999999'
      }} toastClassName={styles.toast} bodyClassName={styles.toast__body} /> 

      {/* Content */}
      <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  ease: [0.61, 1, 0.88, 1],
                        }}>
            <Hero/>
            <GenesisBanner/>
            <ThreeDAlpacas/>
            <About/>
            <Team/>
            <Faq/>
      </motion.div>
      

      </Web3ReactProvider>
    </>
  );
}