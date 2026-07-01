import { Canvas } from '@react-three/fiber';
import { Environment, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import { RotatingText } from '../../HeroPage';
import styles from './Profile.module.css'

export const Profile = () => {
    return (
        <div className={styles.profileWrapper}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
                frameloop="always"
            >
            <Environment
                files="/THAZERO-WORLD-TEXTURE.hdr"
                background={false}
            />
            <Bounds fit clip observe margin={0.65}>
                <RotatingText />
            </Bounds>
            </Canvas>
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