import { Notebook } from 'lucide-react';
import styles from '../../styles/readme.module.scss';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { SITE_URL, PERSON_ID, WEBSITE_ID, graph, breadcrumbSchema } from '@/lib/seo';

export default function Readme() {
    return (
        <>
            <Seo
                title="Project READMEs – Kuldeepsinh Jadeja"
                description="Setup guides for open-source projects by Kuldeepsinh Jadeja: a GSAP image slider, a Node.js file server and a FastAPI background remover."
                socialDescription="Setup guides for open-source projects by Kuldeepsinh Jadeja: GSAP slider, Node.js file server, FastAPI bg remover."
                path="/readme"
                image="/og/readme.jpg"
                jsonLd={graph(
                    {
                        "@type": "CollectionPage",
                        "@id": `${SITE_URL}/readme#page`,
                        url: `${SITE_URL}/readme`,
                        name: "Project READMEs",
                        isPartOf: { "@id": WEBSITE_ID },
                        about: { "@id": PERSON_ID },
                    },
                    breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Readme", path: "/readme" },
                    ])
                )}
            />
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
                                <Link href="/readme/Image-Background-Remover" className={styles.viewBtn}>View Readme</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

