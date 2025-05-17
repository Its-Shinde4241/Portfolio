import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import myImage from '../assets/me.jpg';

export default function AboutPage() {
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const aboutRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current.querySelector('img');

        const onLoad = () => {
            animate(imageRef.current, {
                opacity: [0, 1],
                translateY: [-50, 0],
                easing: 'easeOutExpo',
                duration: 1500
            });

            animate(textRef.current, {
                opacity: [0, 1],
                translateY: [50, 0],
                easing: 'easeOutExpo',
                delay: 500,
                duration: 1500
            });

            animate(aboutRef.current, {
                opacity: [0, 1],
                translateY: [50, 0],
                easing: 'easeOutExpo',
                delay: 1000,
                duration: 1500
            });
        };

        if (image.complete) {
            onLoad();
        } else {
            image.addEventListener('load', onLoad);
        }

        return () => {
            image.removeEventListener('load', onLoad);
        };
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-24 px-4 md:px-0 max-w-7xl mx-auto">

                {/* Image Section */}
                <div
                    ref={imageRef}
                    className="relative group pointer-events-auto flex-shrink-0"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/70 via-primary/85 to-primary blur-md opacity-80 group-hover:opacity-100 animate-spin-slow"></div>
                    <div className="relative overflow-hidden rounded-full p-[2px] bg-primary/30 pointer-events-none
                        h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64"
                    >
                        <img
                            src={myImage}
                            alt="Shubham Shinde"
                            className="rounded-full h-full w-full object-cover transform transition-all duration-500 group-hover:scale-105 select-none"
                        />
                    </div>
                </div>

                {/* Name/Intro Section */}
                <div
                    ref={textRef}
                    className="text-center sm:w-xl md:text-left md:scale-90 lg:scale-100 md:w-1/2 relative overflow-hidden opacity-0
                        md:hover:scale-95 lg:hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-300"
                >
                    <div
                        className="relative bg-gradient-to-r from-primary/30 via-primary/10 to-transparent p-6 backdrop-blur-xs h-full flex flex-col justify-center"
                        style={{
                            clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)"
                        }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-primary relative group pointer-events-auto select-none">
                            👋 Hi, I'm Shubham Namdev Shinde
                            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary/25 to-primary transition-all duration-700 group-hover:w-full"></span>
                        </h2>

                        <div className="text-base sm:text-lg md:text-xl text-primary/60 mt-4 pl-4 sm:pl-6 relative md:skew-x-20">
                            <p className="relative z-10 transform origin-top-left leading-relaxed">
                                MERN stack enthusiast & problem solver. I craft real-time web apps and love cracking DSA challenges.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div
                ref={aboutRef}
                className="flex items-center justify-center mt-6 sm:mt-10 px-4 sm:px-0 opacity-0"
            >
                <div className="w-full max-w-3xl sm:w-[85%] md:w-[70%] z-10">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary/90 bg-clip-text bg-gradient-to-r from-primary/70 via-primary/80 to-primary">
                            About
                        </h2>
                    </div>
                    <div>
                        <div
                            style={{ '--border-radius': '8px' }}
                            className="relative grid min-h-[60px] w-full sm:w-fit min-w-[300px] place-items-center bg-background text-primary rounded-xl shadow-xl p-2 z-10 transition-all duration-500 ease-in-out transform ring-1 hover:ring-primary/50 ring-offset-0 pointer-events-auto"
                        >
                            <div className="select-none prose max-w-full text-primary/90 font-sans  sm:p-3 text-sm sm:text-base leading-relaxed">
                                <p>
                                    Hello there 👋,I am a full-stack developer with most experience in frontend development using <strong className="text-primary">React</strong>. I have worked with several frameworks such as <strong className="text-primary">NextJS</strong>, <strong className="text-primary">FastApi</strong>, and <strong className="text-primary">Express</strong>. I can quickly adapt to new frameworks and languages, and I enjoy learning new technologies. In my free time, I delve into <strong className="text-primary">computers</strong> and <strong className="text-primary">networking</strong> to expand my knowledge in low-level programming.
                                </p>
                                <hr />
                                <br />
                                <p>
                                    I am proficient in <strong className="text-primary">C, C++, Java, Python and JavaScript</strong>. On Codechef, I have achieved a 2-star rating with a maximum rating of 1532. Currently, I'm focusing on learning low-level programming using <strong className="text-primary">C</strong>.
                                </p>
                                <hr />
                                <br />
                                <p>
                                    I also love participating in different coding competitions or contests on platforms like <strong className="text-primary">Leetcode</strong> and <strong className="text-primary">Codeforces</strong>. While competing on such platforms I have solved more than <strong className="text-primary">500+</strong> problems and also achieved a rating of 1620 on <strong className="text-primary">Leetcode</strong> and max rating of 1105 on <strong className="text-primary">Codeforces</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
