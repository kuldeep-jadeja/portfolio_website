import { Notebook } from 'lucide-react';
import styles from '../../styles/readme.module.scss';
import Link from 'next/link';
import Head from 'next/head';

export default function Readme() {
    return (
        <>
            <Head>
                <title>Readme - Kuldeepsinh Jadeja Portfolio</title>
                <link rel="canonical" href="https://kuldeepjadeja.dev/readme" />
                <meta name="description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="image" content="/images/readme.webp" />
                <meta itemProp="name" content="Kuldeepsinh Jadeja - Software Engineer Portfolio" />
                <meta itemProp="description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta itemProp="image" content="/images/readme.webp" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="twitter:description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="twitter:site" content="@kuldeepjadeja" />
                <meta name="twitter:creator" content="@kuldeepjadeja" />
                <meta name="twitter:image:src" content="/images/readme.webp" />
                <meta name="keywords"
                    content="Kuldeep Jadeja, Software Engineer, React Developer, Readme,  Frontend Developer, JavaScript Developer, Portfolio" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="og:title" content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="og:description"
                    content="This is the Readme page for Kuldeepsinh Jadeja's portfolio website. It provides an overview of the portfolio and instructions for navigating and understanding the content." />
                <meta name="og:image" content="/images/readme.webp" />
                <meta name="og:url" content="https://kuldeepjadeja.dev/readme" />
                <meta name="og:site_name" content="Kuldeep Jadeja Portfolio" />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />
                <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png" />
                <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
                <meta name="title" property="og:title"
                    content="Readme - Kuldeepsinh Jadeja Portfolio" />
                <meta name="image" property="og:image" content="/images/readme.webp" />
                <meta name="author" content="Kuldeep Jadeja" />
                <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
            </Head>
            <div className={styles.mainWrapper}>
                <h1 className={styles.title}>Welcome to the Readme Page <Notebook size={40} /></h1>

                <p className={styles.description}>
                    This page serves as a guide to help you understand my projects effectively. Here are some key points to keep in mind:
                </p>

                <div className={styles.checklist}>
                    <input id="01" type="checkbox" name="r" value="1" />
                    <label htmlFor="01">Refer to the documentation for detailed instructions on each feature.</label>
                    <input id="02" type="checkbox" name="r" value="2" />
                    <label htmlFor="02">Feel free to reach out for support if you encounter any issues.</label>
                    <input id="03" type="checkbox" name="r" value="3" />
                    <label htmlFor="03">Stay updated with the latest changes and improvements.</label>
                    <input id="04" type="checkbox" name="r" value="4" />
                    <label htmlFor="04">Contribute to the project by providing feedback or suggestions.</label>
                    <input id="05" type="checkbox" name="r" value="5" />
                    <label htmlFor="05">Enjoy using the application and make the most out of it!</label>
                    <input id="06" type="checkbox" name="r" value="6" />
                    <label htmlFor="06">CLICK ME! 🤭</label>
                </div>

                <div className={styles.readmeList}>
                    <h2 className={styles.subTitle}>My Projects</h2>

                    <div className={styles.projectList}>
                        <div className={styles.projectItem}>
                            <div className={styles.leftWrapper}>
                                <h3 className={styles.projectTitle}>Award Winning Slider 🎠</h3>
                                <p className={styles.projectDescription}>A stunning, modern image carousel with synchronized text animations and smooth transitions. Built with vanilla JavaScript, jQuery, Slick Carousel, and GSAP animations.</p>
                            </div>
                            <div className={styles.rightWrapper}>
                                <Link href="/readme/AwardWinningSlider" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>

                        <div className={styles.projectItem}>
                            <div className={styles.leftWrapper}>
                                <h3 className={styles.projectTitle}>Ultimate Self-Hosted File Server 💪🏻</h3>
                                <p className={styles.projectDescription}>🚀 A powerful and elegant Node.js file server powered by Express and Flmngr for seamless file management.  feature-rich Flmngr library, intuitive web interface for all your file management needs.</p>
                            </div>
                            <div className={styles.rightWrapper}>
                                <Link href="/readme/clipper-file-server" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>

                        <div className={styles.projectItem}>
                            <div className={styles.leftWrapper}>
                                <h3 className={styles.projectTitle}>Automated Twitch Clipper ⚡</h3>
                                <p className={styles.projectDescription}>Automatically detect viral twitch moments, create clips 🎬, manage your content library with AI-powered tools and Automatically posts on Instagram and Youtube by Converting into Shorts Format  🚀</p>
                            </div>
                            <div className={styles.rightWrapper}>
                                <Link href="/readme/clipper-file-server" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>
                        <div className={styles.projectItem}>
                            <div className={styles.leftWrapper}>
                                <h3 className={styles.projectTitle}>My Portfolio ⚡</h3>
                                <p className={styles.projectDescription}>A modern, responsive portfolio showcasing my journey as a software engineer 🚀</p>
                            </div>
                            <div className={styles.rightWrapper}>
                                <Link href="/readme/portfolio_website" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>
                        <div className={styles.projectItem}>
                            <div className={styles.leftWrapper}>
                                <h3 className={styles.projectTitle}>Python Background Remover ⚡</h3>
                                <p className={styles.projectDescription}>
                                    A Python-based background remover that utilizes advanced image processing techniques to seamlessly remove backgrounds from images, providing a clean and professional result.
                                </p>
                            </div>
                            <div className={styles.rightWrapper}>
                                <Link href="/readme/Image-background-remover" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

