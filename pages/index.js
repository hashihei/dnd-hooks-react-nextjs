import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StoreProvider from '../store'
import ImageSortMainArea from '../components/ImageSortMainArea'

export default function Home() {

  return (
    <StoreProvider>
      <div className={styles.container}>
        <Head>
          <title>reactjs</title>
          <meta name="description" content="dnd kit sample application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Sample Application. 
          </h1>
          <ImageSortMainArea />
        </main>

        <footer className={styles.footer}>
          <div>footer</div>
        </footer>
      </div>
    </StoreProvider>

  )
}
