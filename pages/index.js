import styles from "../styles/Home.module.scss";
import MainWrapper from "@/components/MainWrapper/MainWrapper";
import Dock from "@/components/Dock/Dock";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MainWrapper />
      <Dock />
      <div className={styles.mainWrapper}>
        <div className={styles.aboutMeContainer}>
          <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Kuldeepsinh Jadeja 👋</h1>
            <p className={styles.aboutMe}>Passionate about Tech, turned me into Software engineer❤️</p>
            <p className={styles.aboutMe}>I love building things and helping people.</p>
          </div>
          <div className={styles.profilePicture}>
            <Image src="/images/test(1).png" alt="Profile Picture" width={100} height={100} />
          </div>
        </div>

        {/* About Me */}
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.aboutText}>
            I'm Kuldeepsinh Jadeja, a dedicated software engineer with a passion for technology and innovation. I love building things that make a difference and helping people through my work. With a strong foundation in software development, I continuously strive to learn and grow in this ever-evolving field.
          </p>
        </div>

        {/* Work Experience */}
        <div className={styles.workExperience}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <ul className={styles.experienceList}>
            <li className={styles.experienceItem}>
              <div className={styles.companyProfile}>
                <div className={styles.logoWrapper}>
                  <Image src="/images/redlio.png" alt="Redlio Designs" width={40} height={40} />
                </div>
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>Redlio Designs</h3>
                  <p className={styles.jobTitle}>Full-Stack MERN Developer </p>
                </div>
              </div>
              <p className={styles.jobDuration}>July 2024 - Present</p>
            </li>
            <li className={styles.experienceItem}>
              <div className={styles.companyProfile}>
                <div className={styles.logoWrapper}>
                  <Image src="/images/salecto.png" alt="salecto" width={40} height={40} />
                </div>
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>Salecto</h3>
                  <p className={styles.jobTitle}>Adobe Magento2 Frontend Developer</p>
                </div>
              </div>
              <p className={styles.jobDuration}>Dec 2022 - Jun 2024</p>
            </li>
            <li className={styles.experienceItem}>
              <div className={styles.companyProfile}>
                <div className={styles.logoWrapper}>
                  <Image src="/images/salecto.png" alt="salecto" width={40} height={40} />
                </div>
                <div className={styles.companyInfo}>
                  <h3 className={styles.companyName}>Salecto</h3>
                  <p className={styles.jobTitle}>Trainee - Adobe Magento2 Frontend Developer</p>
                </div>
              </div>
              <p className={styles.jobDuration}>Jun 2022 - Dec 2022</p>
            </li>
          </ul>
        </div>

        {/* Skills Section */}
        <div className={styles.skills}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <ul className={styles.skillsList}>
            <li className={styles.skillItem}>React</li>
            <li className={styles.skillItem}>Next.js</li>
            <li className={styles.skillItem}>JavaScript</li>
            <li className={styles.skillItem}>TypeScript</li>
            <li className={styles.skillItem}>JQuery</li>
            <li className={styles.skillItem}>Node.js</li>
            <li className={styles.skillItem}>MongoDB</li>
            <li className={styles.skillItem}>Express.js</li>
            <li className={styles.skillItem}>Magento2</li>
            <li className={styles.skillItem}>PHTML</li>
            <li className={styles.skillItem}>SASS</li>
            <li className={styles.skillItem}>CSS3</li>
            <li className={styles.skillItem}>RESTful APIs</li>
          </ul>
        </div>
      </div>
    </>
  );
}
