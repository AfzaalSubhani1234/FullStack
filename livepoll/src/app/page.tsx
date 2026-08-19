import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <span>●</span> Live Poll
          </div>

          <h1 className={styles.title}>
            Ask. Vote.
            <br />
            <span>See Results Live.</span>
          </h1>

          <p className={styles.description}>
            Create polls, share them with anyone, and watch the results
            update in real time.
          </p>

          <div className={styles.actions}>
            <Link href="/signup" className={styles.primaryButton}>
              Get Started
            </Link>

            <Link href="/login" className={styles.secondaryButton}>
              Login
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}>+</div>
              <div>
                <h3>Create</h3>
                <p>Build a poll in seconds</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>↗</div>
              <div>
                <h3>Share</h3>
                <p>Send it to anyone</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.icon}>◉</div>
              <div>
                <h3>Live Results</h3>
                <p>Watch votes update instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}