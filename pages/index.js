import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UseImageSort from '../components/UseImageSort'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Sample Application. 
        </h1>
        <UseImageSort></UseImageSort>
      </main>

      <footer className={styles.footer}>
        <div>Powered by Next.js</div>
      </footer>
    </div>
  )
}
