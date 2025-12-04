import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe, LibraryBig } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.aboutMeContainer}>
          <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Kuldeepsinh Jadeja 👋</h1>
            <p className={styles.aboutMe}>Passionate about Tech, turned me into Software engineer ❤️</p>
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

        {/* Projects */}
        <div className={styles.projectsShowCase}>
          <div className={styles.pill}>
            <h2 className={styles.sectionPill}>Projects</h2>
            <h3 className={styles.sectionSubtitle}>Check out my latest work</h3>
            <p className={styles.sectionDescription}>I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.</p>
          </div>

          <div className={styles.projectCards}>
            <div className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <Image src="/images/Award-winning-slider.gif" alt="Project 1" width={350} height={200} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>Award Winning Slider 🎠</h3>
                <p className={styles.projectDescription}>A stunning, modern image carousel with synchronized text animations and smooth transitions. Built with vanilla JavaScript, jQuery, Slick Carousel, and GSAP animations.</p>
                <div className={styles.pillsContainer}>
                  <div className={styles.projectTechStack}>
                    <span className={styles.techPills}>HTML5</span>
                    <span className={styles.techPills}>CSS3</span>
                    <span className={styles.techPills}>JavaScript</span>
                    <span className={styles.techPills}>jQuery</span>
                    <span className={styles.techPills}>Slick Carousel</span>
                  </div>
                  <div className={styles.projectLinks}>
                    <div className={styles.projectPill}>
                      <Globe strokeWidth={1.5} size={15} /><Link href="https://award-winning-slider.kuldeepjadeja.dev/" target="_blank" rel="noopener noreferrer">View Project</Link>
                    </div>
                    <div className={styles.projectPill}>
                      <LibraryBig size={16} strokeWidth={1.5} /> <Link href="https://github.com/kuldeep-jadeja/AwardWinningSlider#readme" target="_blank" rel="noopener noreferrer">View Readme</Link>
                    </div>
                    <div className={styles.projectPill}>
                      <Github size={16} strokeWidth={1.5} /><Link href="https://github.com/kuldeep-jadeja/AwardWinningSlider" target="_blank" rel="noopener noreferrer">View Source</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <Image src="/images/file-server.gif" alt="Project 1" width={350} height={200} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>Ultimate Self-Hosted File Server 💪🏻</h3>
                <p className={styles.projectDescription}>🚀 A powerful and elegant Node.js file server powered by Express and Flmngr for seamless file management.  feature-rich Flmngr library, intuitive web interface for all your file management needs.</p>
                <div className={styles.pillsContainer}>
                  <div className={styles.projectTechStack}>
                    <span className={styles.techPills}>Node.js</span>
                    <span className={styles.techPills}>Express.js</span>
                    <span className={styles.techPills}>Flmngr</span>
                    <span className={styles.techPills}>Multer</span>
                    <span className={styles.techPills}>HTML5</span>
                  </div>
                  <div className={styles.projectLinks}>
                    <div className={styles.projectPill}>
                      <Globe strokeWidth={1.5} size={15} /><Link href="https://files.kuldeepjadeja.dev/file-server" target="_blank" rel="noopener noreferrer">View Project</Link>
                    </div>
                    <div className={styles.projectPill}>
                      <LibraryBig size={16} strokeWidth={1.5} /> <Link href="https://github.com/kuldeep-jadeja/clipper-file-server#readme" target="_blank" rel="noopener noreferrer">View Readme</Link>
                    </div>
                    <div className={styles.projectPill}>
                      <Github size={16} strokeWidth={1.5} /><Link href="https://github.com/kuldeep-jadeja/clipper-file-server" target="_blank" rel="noopener noreferrer">View Source</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <Image src="/images/clip-final.gif" alt="Ultimate Clippper" width={350} height={200} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>Automated Twitch Clipper ⚡</h3>
                <p className={styles.projectDescription}>Automatically detect viral twitch moments, create clips 🎬, manage your content library with AI-powered tools and Automatically posts on Instagram and Youtube by Converting into Shorts Format  🚀</p>
                <div className={styles.pillsContainer}>
                  <div className={styles.projectTechStack}>
                    <span className={styles.techPills}>Next.Js</span>
                    <span className={styles.techPills}>Node.js</span>
                    <span className={styles.techPills}>Express.js</span>
                    <span className={styles.techPills}>MongoDB</span>
                    <span className={styles.techPills}>Redis</span>
                    <span className={styles.techPills}>BullMQ</span>
                    <span className={styles.techPills}>Flmngr</span>
                    <span className={styles.techPills}>Axios</span>
                    <span className={styles.techPills}>Twitch API</span>
                    <span className={styles.techPills}>FFmpeg</span>
                    <span className={styles.techPills}>Openrouter API</span>
                  </div>
                  <div className={styles.projectLinks}>
                    <div className={styles.projectPill}>
                      <Globe strokeWidth={1.5} size={15} /><Link href="#">Sorry Can't Share</Link>
                    </div>
                    <div className={styles.projectPill}>
                      <Github size={16} strokeWidth={1.5} /><Link href="#">Private Soon Public ❤️</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
