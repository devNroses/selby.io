import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '../../Global/ErrorBoundary'
import styles from './Profile.module.css'

// Same shared chunk the Hero page uses for its rotating wordmark —
// fetched once, cached, and never bundled into either route's
// critical-path JS.
const WordmarkScene = lazy(() =>
  import('../../Global/WordmarkScene').then((m) => ({ default: m.WordmarkScene }))
)

export const Profile = () => {
    return (
        <div className={styles.profileWrapper}>
            {/* A genuinely failed asset fetch (bad network, not just
               slow) throws past Suspense's "still loading" handling —
               catch it here so a flaky connection loses the animated
               logo, not more of the page than that. profileWrapper's
               own gradient background already reads fine as an empty
               state underneath. */}
            <ErrorBoundary>
                <Suspense fallback={null}>
                    <WordmarkScene />
                </Suspense>
            </ErrorBoundary>
            <div className={styles.profileDesc}>
                <div className={styles.profileContent}>
                    <div className={styles.profileTitle}>
                        <p>Design<br></br>Engineer</p>
                        <p>Color<br></br>Architect</p>
                        <p>Creative<br></br>Navigator</p>
                    </div>
                    <div className={styles.description}>
                        <p>Navigating creative worlds with intent.</p>
                    </div>
                </div>
                <div className={styles.profileBackdrop} />
            </div>
        </div>
    )
}
