import Image from 'next/image';
import styles from './Landing.module.scss';
import profileImg from '@/public/landing/landing-profile.png';
import logoImg from '@/public/logo/logo_main.png';
import keyboardImg from '@/public/landing/landing-keyboard.png';
import chatDarkImg from '@/public/landing/landing-chat-dark.png';
import share1Img from '@/public/landing/landing-share1.png';
import share2Img from '@/public/landing/landing-share2.png';
import share3Img from '@/public/landing/landing-share3.png';
import share4Img from '@/public/landing/landing-share4.png';
import scriptGreenImg from '@/public/landing/landing-script-green.png';
import bellImg from '@/public/landing/landing-bell.png';
import chatLightImg from '@/public/landing/landing-chat-light.png';
import classNames from 'classnames';
import Link from 'next/link';
import { Bounce, Slide, Fade, Flip, AttentionSeeker } from 'react-awesome-reveal';
import Footer from '@/components/@shared/footer/Footer';

export default function Landing() {
  return (
    <>
      <main className={styles.LandingContainer}>
        <section className={styles.introSection}>
          <div className={styles.logoImageWrapper}>
            <Image src={logoImg} alt={'로고 이미지'} height={353} width={1435} />
          </div>
          <div className={styles.introParagraph}>
            <Fade delay={300} triggerOnce>
              <p className={styles.introLightText}>친구들이 만드는</p>
            </Fade>
            <Fade delay={900} triggerOnce>
              <p className={styles.introBoldText}>
                나만의 <span className={styles.cloverText}>위키</span>
              </p>
            </Fade>
          </div>
          <Fade delay={1400} triggerOnce>
            <Link href={'/home'} className={classNames(styles.landingLink, styles.dark)}>
              위키 만들기
            </Link>
          </Fade>
          <div className={styles.background}>
            <Bounce className={styles.introImageWrapper} delay={1900} triggerOnce>
              <Image src={profileImg} alt={'프로필 소개 이미지'} height={1421} width={1832} />
            </Bounce>
          </div>
        </section>
        <section className={styles.writeSection}>
          <div className={styles.common}>
            <div className={styles.writeGridContainer}>
              <div className={styles.writeParagraph}>
                <p className={styles.upperSubText}>Write</p>
                <p className={styles.mainLightText}>
                  친구의 <span className={styles.cloverText}>위키</span>,
                </p>
                <p className={styles.mainBoldText}>직접 작성해봐요</p>
              </div>
              <Slide className={styles.keyboard} triggerOnce>
                <Image src={keyboardImg} alt={'키보드 이미지'} height={450} width={364} />
              </Slide>
              <Slide direction={'right'} className={styles.chat} triggerOnce>
                <Image src={chatDarkImg} alt={'어두운 배경 채팅 이미지'} height={681} width={520} />
              </Slide>
            </div>
          </div>
        </section>
        <section className={styles.shareSection}>
          <Slide className={styles.common} delay={200} triggerOnce>
            <div className={styles.shareParagraph}>
              <p className={styles.upperSubText}>Share</p>
              <p className={styles.mainLightText}>
                내 <span className={styles.cloverText}>위키</span> 만들고
              </p>
              <p className={styles.mainBoldText}>친구에게 공유해요</p>
            </div>
          </Slide>
          <div className={styles.shareImageList}>
            <Flip delay={300} triggerOnce>
              <Image src={share1Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
            </Flip>
            <Flip delay={400} triggerOnce>
              <Image src={share2Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
            </Flip>
            <Flip delay={500} triggerOnce>
              <Image src={share3Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
            </Flip>
            <Flip delay={600} triggerOnce>
              <Image src={share4Img} alt={'어두운 배경 채팅 이미지'} height={360} width={360} />
            </Flip>
          </div>
        </section>
        <section className={styles.viewSection}>
          <div className={styles.common}>
            <Fade delay={300} triggerOnce>
              <div className={styles.viewParagraph}>
                <p className={styles.upperSubText}>View</p>
                <p className={styles.mainLightText}>친구들이 달아준</p>
                <p className={styles.mainBoldText}>내용을 확인해봐요</p>
              </div>
            </Fade>
            <div className={styles.viewGridContainer}>
              <Image
                className={styles.scriptGreen}
                src={scriptGreenImg}
                alt={'초록 배경 채팅 이미지'}
                height={280}
                width={924}
              />
              <AttentionSeeker effect={'swing'} delay={400} triggerOnce>
                <Image className={styles.bell} src={bellImg} alt={'종 이미지'} height={280} width={280} />
              </AttentionSeeker>
              <Image
                className={styles.chatLight}
                src={chatLightImg}
                alt={'밝은 배경 채팅 이미지'}
                height={280}
                width={604}
              />
            </div>
          </div>
        </section>
        <section className={styles.startSection}>
          <Fade triggerOnce>
            <p>
              나만의 <span className={styles.cloverText}>위키</span> 만들어보기
            </p>
          </Fade>
          <AttentionSeeker effect={'bounce'} delay={400} triggerOnce>
            <Link href={'/home'} className={styles.landingLink}>
              지금 시작하기
            </Link>
          </AttentionSeeker>
        </section>
        <Footer />
      </main>
      <Footer />
    </>
  );
}
