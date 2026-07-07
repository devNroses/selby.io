import styles from './About.module.css'

export const AboutPage = () => {
    return (
        <div className={styles.aboutWrapper}>
            <div className={styles.contentContainer}> container 1</div>
            <div className={styles.contentContainer}> container 2</div>
            <div className={styles.contentContainer}> container 3</div>
        </div>
    )
}