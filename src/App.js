import "./App.css";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

function App() {
    const { scrollYProgress, scrollY } = useScroll();
    const bushY = useTransform(scrollY, [0, 800], [0, -400]);
    const containerTwoY = useTransform(scrollY, [0, 500], [0, -50]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const opacity = useTransform(scrollY, [0, 100], [1, 0]);

    const transition = { duration: 1, ease: [0.6, 0.1, -0.5, 0.9] };
    const partOneRef = useRef(null);
    const partTwoRef = useRef(null);
    const isInViewOne = useInView(partOneRef, { once: true });
    const isInViewTwo = useInView(partTwoRef, { once: true });

    // Title and Button Variant
    const variants = {
        visible: { opacity: 1, x: 0 },
        hidden: {
            opacity: 0,
            x: -100,
        },
    };

    const smallImageVariants = {
        beforeLoad: { height: 0 },
        afterLoad: { height: 288 },
    };

    const largeImageVariants = {
        beforeLoad: { height: 0 },
        afterLoad: { height: 488 },
    };

    const ifMobile = window.innerWidth < 481;

    let smallImageElement, largeImageElement;
    if (!ifMobile) {
        //Large Screens
        //If not in view increase height on scroll
        smallImageElement = (
            <motion.img
                src={require("./assets/paraone.webp")}
                type="image/webp"
                className="image-small"
                alt="tea field"
                variants={smallImageVariants}
                animate={isInViewOne ? "afterLoad" : "beforeLoad"}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
                style={{ width: 288 }}
            />
        );
        largeImageElement = (
            <motion.img
                src={require("./assets/paratwo.webp")}
                type="image/webp"
                className="image-large"
                alt="tea fields and people working"
                variants={largeImageVariants}
                style={{ width: 488 }}
                animate={isInViewTwo ? "afterLoad" : "beforeLoad"}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
            />
        );
    } else {
        //Mobile Screens
        smallImageElement = (
            <motion.img
                src={require("./assets/paraone.webp")}
                type="image/webp"
                className="image-small"
                alt="tea field"
                variants={smallImageVariants}
                style={{ width: window.innerWidth - 36 }}
                animate={isInViewOne ? "afterLoad" : "beforeLoad"}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
            />
        );
        largeImageElement = (
            <motion.img
                src={require("./assets/paratwo.webp")}
                type="image/webp"
                className="image-large"
                alt="tea fields and people working"
                style={{ width: window.innerWidth - 36 }}
                variants={smallImageVariants}
                animate={isInViewTwo ? "afterLoad" : "beforeLoad"}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
            />
        );
    }

    //Mobile Nav
    const [mobileNavStatus, setMobileNavStatus] = useState(false);

    return (
        <div className="App">
            <header>
                <svg
                    className="leafy-icon"
                    stroke="white"
                    fill="white"
                    strokeWidth="0"
                    version="1.1"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M15.802 2.102c-1.73-1.311-4.393-2.094-7.124-2.094-3.377 0-6.129 1.179-7.549 3.235-0.667 0.965-1.036 2.109-1.097 3.398-0.054 1.148 0.139 2.418 0.573 3.784 1.482-4.444 5.622-7.923 10.395-7.923 0 0-4.466 1.175-7.274 4.816-0.002 0.002-0.039 0.048-0.103 0.136-0.564 0.754-1.055 1.612-1.423 2.583-0.623 1.482-1.2 3.515-1.2 5.965h2c0 0-0.304-1.91 0.224-4.106 0.873 0.118 1.654 0.177 2.357 0.177 1.839 0 3.146-0.398 4.115-1.252 0.868-0.765 1.347-1.794 1.854-2.882 0.774-1.663 1.651-3.547 4.198-5.002 0.146-0.083 0.24-0.234 0.251-0.402s-0.063-0.329-0.197-0.431z"></path>
                </svg>
                <nav className={mobileNavStatus ? "isExpanded" : "notExpanded"}>
                    <ul>
                        <li>About Us</li>
                        <li>Collections</li>
                        <li>Partnerships</li>
                    </ul>
                </nav>
                {!mobileNavStatus && (
                    <span className="nav-title">Art of Tea</span>
                )}
                <div
                    className="nav-icon-container"
                    onClick={() => setMobileNavStatus(!mobileNavStatus)}
                >
                    {mobileNavStatus ? (
                        <svg
                            width="24"
                            height="24"
                            className="close-icon"
                            fill="white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m12 10.583 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414L12 13.41l-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.633l4.95 4.95Z"></path>
                        </svg>
                    ) : (
                        <svg
                            width="24"
                            height="24"
                            fill="white"
                            className="ham-icon"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M3 4h18v2H3V4Zm6 7h12v2H9v-2Zm-6 7h18v2H3v-2Z"></path>
                        </svg>
                    )}
                </div>
            </header>
            <div className="sidebar sidebar-left">
                <div className="vertical-line-before"></div>
                <div className="vertical-line"></div>
            </div>
            <div className="sidebar sidebar-right">
                <div className="vertical-line-before"></div>
                <div className="right-side vertical-line"></div>
                <div className="vertical-line-after"></div>
                <div className="hollow-diamond"></div>
                <div className="diamond"></div>
                <div className="diamond"></div>
                <div className="diamond"></div>
                <div className="diamond"></div>
                <div className="vertical-line-before"></div>
                <div className="right-side vertical-line"></div>
                <div className="vertical-line-after"></div>
            </div>
            <main>
                <section className="section section-one">
                    <motion.h1 className="title" style={{ opacity: opacity }}>
                        The Home
                        <br />
                        of Good Tea
                    </motion.h1>
                </section>
                <section className="section section-two">
                    <motion.div
                        className="bush-container"
                        style={{ y: bushY, scale: scale }}
                        initial={{ scale: 1, y: 0 }}
                        animate={{
                            transition: { ...transition },
                        }}
                    ></motion.div>
                    <motion.div
                        style={{ opacity: opacity }}
                        className="container-box"
                    >
                        <div className="history-button">
                            <div className="circle">
                                <svg
                                    width="28"
                                    height="28"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M16.394 12.003 10 7.74v8.526l6.394-4.263Zm2.982.416L8.777 19.485A.5.5 0 0 1 8 19.07V4.937a.5.5 0 0 1 .777-.416l10.599 7.066a.501.501 0 0 1 0 .832Z"></path>
                                </svg>
                            </div>
                            <span className="history-text">
                                GREEN HOUSE HISTORY
                            </span>
                        </div>
                    </motion.div>
                    <motion.div
                        style={{ y: containerTwoY }}
                        className="container-passage"
                    >
                        <div className="card card-one" ref={partOneRef}>
                            <div className="text-container">
                                <div className="quote-container">
                                    <p className="quote">
                                        "Green tea throughout the day is the
                                        healthiest thing I've discovered for
                                        me."
                                    </p>
                                    <p className="author">- Jessica Chastain</p>
                                </div>
                                <div className="general-text">
                                    We have searched the globe high and low and
                                    came up with this list of utterly delicious,
                                    best orgranic tea brands around.Not only do
                                    we approve of their taste but they are all
                                    organic, fair trade or both!
                                </div>
                            </div>
                            {smallImageElement}
                        </div>
                        <div className="card card-two" ref={partTwoRef}>
                            {largeImageElement}
                            <div className="text-container card-two-text">
                                <motion.h3
                                    animate={isInViewOne ? "visible" : "hidden"}
                                    variants={variants}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeIn",
                                    }}
                                    className="card-two-title"
                                >
                                    Ancestral gathering traditions
                                </motion.h3>
                                <div className="shifted-box">
                                    <motion.p
                                        animate={
                                            isInViewTwo ? "visible" : "hidden"
                                        }
                                        variants={variants}
                                        transition={{
                                            duration: 1,
                                            ease: "easeOut",
                                        }}
                                        className="general-text"
                                    >
                                        In today's competitive international
                                        marketplace fragrant Indian teas are
                                        considered delicate and exclusive but
                                        have been overshadowed by brews from
                                        smaller producers such as Kenya and Sri
                                        Lanka.
                                    </motion.p>
                                    <motion.span
                                        animate={
                                            isInViewTwo ? "visible" : "hidden"
                                        }
                                        variants={variants}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeIn",
                                        }}
                                        className="learn-more"
                                    >
                                        LEARN MORE ABOUT TECHNOLOGY
                                        <div className="arrow-container">
                                            <span className="line-before"></span>
                                            <span className="line"></span>
                                            <svg
                                                width="20"
                                                height="20"
                                                fill="white"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="m13.172 11.997-4.95-4.95 1.414-1.414L16 11.997 9.636 18.36l-1.414-1.414 4.95-4.95Z"></path>
                                            </svg>
                                        </div>
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}

export default App;
