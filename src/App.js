import "./App.css";
import { ImLeaf } from "react-icons/im";
import { FaGripLines } from "react-icons/fa";
import { ImPlay3 } from "react-icons/im";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";

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
                <ImLeaf className="leafy-icon" />
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
                        <AiOutlineClose className="close-icon" />
                    ) : (
                        <FaGripLines className="ham-icon" />
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
                                <ImPlay3 />
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
                                            <AiOutlineRight />
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
