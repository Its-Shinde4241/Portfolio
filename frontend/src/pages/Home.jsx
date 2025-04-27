import React, { useEffect, useState } from 'react';
import { animate } from 'animejs';
import myImage from '../assets/me.jpg'

const NumberGrid = () => {
    const [gridColumns, setGridColumns] = useState(30);
    const GRID_ROWS = 30;

    useEffect(() => {
        const updateGridColumns = () => {
            if (window.innerWidth < 640) {
                setGridColumns(25);
            } else if (window.innerWidth < 1024) {
                setGridColumns(35);
            } else {
                setGridColumns(62);
            }
        };

        updateGridColumns();
        window.addEventListener('resize', updateGridColumns);
        return () => window.removeEventListener('resize', updateGridColumns);
    }, []);

    useEffect(() => {
        const grid = document.querySelector('.number-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const spans = [];

        for (let i = 0; i < gridColumns * GRID_ROWS; i++) {
            const span = document.createElement('span');
            span.textContent = Math.floor(Math.random() * 10).toString();
            span.className = "transition-transform duration-100 text-xs sm:text-lg";
            span.style.textShadow = "0 0 4px rgba(255,255,255,0.5)";
            span.style.pointerEvents = "auto";
            spans.push(span);
            grid.appendChild(span);
        }

        const getRippleIndices = (center, maxRadius = 4) => {
            const indicesByDistance = [];
            const row = Math.floor(center / gridColumns);
            const col = center % gridColumns;

            for (let radius = 0; radius <= maxRadius; radius++) {
                const layer = [];
                for (let dr = -radius; dr <= radius; dr++) {
                    for (let dc = -radius; dc <= radius; dc++) {
                        if (Math.abs(dr) + Math.abs(dc) !== radius) continue;
                        const nr = row + dr;
                        const nc = col + dc;
                        if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < gridColumns) {
                            layer.push(nr * gridColumns + nc);
                        }
                    }
                }
                indicesByDistance.push(layer);
            }

            return indicesByDistance;
        };

        spans.forEach((span, index) => {
            span.addEventListener('mouseenter', () => {
                const rippleLayers = getRippleIndices(index, 4);

                rippleLayers.forEach((layer, i) => {
                    layer.forEach((idx) => {
                        const el = spans[idx];
                        if (!el) return;

                        animate(el, {
                            scale: 2.2 - i * 0.1,
                            opacity: 1 - i * 0.1,
                            duration: 50,
                            ease: 'inOutQuad',
                        });
                    });
                });
            });

            span.addEventListener('mouseleave', () => {
                const rippleLayers = getRippleIndices(index, 4);

                rippleLayers.forEach((layer, i) => {
                    layer.forEach((idx) => {
                        const el = spans[idx];
                        if (!el) return;

                        animate(el, {
                            scale: 1,
                            opacity: 1,
                            duration: 50,
                            ease: 'inOutQuad',
                        });
                    });
                });
            });
        });
    }, [gridColumns]);

    return (
        <div className="relative h-screen overflow-y-auto to-black">
            {/* Ripple grid on top, listening to mouse */}
            <div
                className="fixed inset-0 z-10 pointer-events-auto"
                style={{
                    background: 'transparent',
                }}
            >
                <div
                    className="number-grid w-full h-full text-muted-foreground/40 font-mono mx-1 pointer-events-none"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                        gap: '1px',
                        userSelect: 'none',
                    }}
                ></div>
            </div>

            {/* Content */}
            <div
                className="relative z-20 pointer-events-none p-4 md:p-10 text-foreground max-w-6xl mx-auto"
                style={{
                    minHeight: 'calc(100vh - 80px)',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                {/* Profile section with animated border, unique layout */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8  ">
                    <div className="relative group transition-all duration-500 hover:rotate-1 pointer-events-auto">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/70 via-primary/85 to-primary blur-md opacity-80 group-hover:opacity-100 animate-spin-slow"></div>
                        <div className="relative overflow-hidden rounded-full h-40 w-40 md:h-64 md:w-64 p-[2px] bg-primary/30">
                            <img
                                src={myImage}
                                alt="Shubham Shinde"
                                className="rounded-full h-full w-full object-cover transform transition-all duration-500 group-hover:scale-100"
                            />
                        </div>
                    </div>

                    <div className="text-center md:text-left md:w-1/2 transform transition-all duration-500 hover:scale-102 relative overflow-hidden">
                        <div
                            className="relative bg-gradient-to-r from-primary/30 via-primary/10 to-transparent p-6 backdrop-blur-xs h-full flex flex-col justify-center"
                            style={{
                                clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)"
                            }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-primary relative group pointer-events-auto">
                                👋 Hi, I'm Shubham Namdev Shinde
                                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary/25 to-primary transition-all duration-700 group-hover:w-full"></span>
                            </h2>

                            <div className="text-xl md:text-2xl text-primary/50 mt-4 pl-6 relative skew-x-20">
                                <p className="relative z-10 transform origin-top-left ">
                                    MERN stack enthusiast & problem solver. I craft real-time web apps and love cracking DSA challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-2 ">
                    <div className="w-[70%] z-10">
                        <div >
                            <h2 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary/70 via-primary/80 to-primary">
                                About
                            </h2>
                        </div>
                        <div >
                            <div
                                style={{ '--border-radius': '8px' }}
                                className="relative grid min-h-[60px] w-fit min-w-[300px] place-items-center bg-background text-primary rounded-xl shadow-xl p-1 z-10 transition-all duration-500 ease-in-out transform hover:ring-1 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-transparent pointer-events-auto "
                            >
                                <div className="prose max-w-full text-primary/90 font-sans p-4 text-sm bg-background dark:prose-invert leading-relaxed">
                                    <p>
                                        I am a full-stack developer with most experience in frontend development using <strong className='text-primary'>React</strong>. I have worked with several frameworks such as <strong className='text-primary'>NextJS</strong>, <strong className='text-primary'>Django</strong>, <strong className='text-primary'>Angular</strong>, <strong className='text-primary'>Spring</strong>, <strong className='text-primary'>Flask</strong>, and <strong className='text-primary'>Express</strong>. I can quickly adapt to new frameworks and languages, and I enjoy learning new technologies. In my free time, I delve into <strong className='text-primary'>computers</strong> and <strong className='text-primary'>networking</strong> to expand my knowledge in low-level programming.
                                    </p>
                                    <hr />
                                    <br />
                                    <p>
                                        I am proficient in <strong className='text-primary'>C, C++, Java, Python, JavaScript, and TypeScript</strong>. On Codechef, I have achieved a 2-star rating with a maximum rating of 1509. Currently, I'm focusing on learning low-level programming using <strong className='text-primary'>C</strong>.
                                    </p>
                                    <hr />
                                    <br />
                                    <p>
                                        I also love participating in Hackathons and have received recognition for my efforts. I secured <strong className='text-primary'>1st place 🥇</strong> in <strong className='text-primary'>COEP Mindspark '23</strong>, <strong className='text-primary'>3rd place 🥉</strong> in <strong className='text-primary'>Barclays Hack-O-Hire 2024</strong> (and was the winner from the Barclays Pune campus), and I was a <strong className='text-primary'>finalist</strong> in <strong className='text-primary'>PICT's TechFiesta '24</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default NumberGrid;