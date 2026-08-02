import { lazy, Suspense } from 'react'
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
            <Suspense fallback={null}>
                <WordmarkScene />
            </Suspense>
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
