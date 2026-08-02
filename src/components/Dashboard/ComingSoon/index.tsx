import styles from './ComingSoon.module.css'

interface ComingSoonProps {
  eyebrow?: string
  word?: string
  status?: string
}

/**
 * Placeholder for the UX/UI case-study slot while real work is still in
 * progress. Deliberately built from type + CSS only (no imagery) so it
 * can be swapped for the real thing later without any layout changes —
 * drop a <FeaturePanel> in where this is rendered and it's done.
 */
export const ComingSoon = ({
  eyebrow = 'UX / UI · Case Studies',
  word = 'SOON',
  status = 'In progress',
}: ComingSoonProps) => {
  return (
    <div className={styles.comingSoon}>
      <span className={styles.grain} aria-hidden="true" />
      <span className={styles.blurWord} aria-hidden="true">{word}</span>

      <div className={styles.card}>
        <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />

        <p className={styles.eyebrow}>{eyebrow}</p>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {status}
        </p>
      </div>
    </div>
  )
}
