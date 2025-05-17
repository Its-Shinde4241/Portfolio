import React, { useState, useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import AboutPage from './AboutPage';
import EducationPage from './EducationPage';
import SkillsPage from './SkillsPage.jsx';
import ProjectsPage from './ProjectsPage.jsx';

const Home = () => {
    const [gridColumns, setGridColumns] = useState(30);
    const GRID_ROWS = 30;
    const location = useLocation(); // to track route changes

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

                        el.style.transition = "transform 0.1s, opacity 0.1s";
                        el.style.transform = `scale(${2.2 - i * 0.1})`;
                        el.style.opacity = `${1 - i * 0.1}`;
                    });
                });
            });

            span.addEventListener('mouseleave', () => {
                const rippleLayers = getRippleIndices(index, 4);

                rippleLayers.forEach((layer, i) => {
                    layer.forEach((idx) => {
                        const el = spans[idx];
                        if (!el) return;

                        el.style.transform = "scale(1)";
                        el.style.opacity = "1";
                    });
                });
            });
        });
    }, [gridColumns]);

    return (
        <div className="relative overflow-y-auto to-black h-[95vh]" style={{ scrollbarWidth: "thin" }}>
            {/* Ripple grid on top, listening to mouse */}
            <div
                className="fixed inset-0 z-10 pointer-events-auto bg-gradient-to-r from-secondary via-secondary to-secondary"
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
                className="relative z-20 pointer-events-none p-3 pt-2 sm:pt-0 lg:p-10  text-foreground max-w-6xl mx-auto  "
                style={{
                    // minHeight: 'calc(100vh - 80px)',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                {/* Profile section with animated border, unique layout */}
                <div className="transition-all duration-500 ease-in-out">
                    {/* Applying animation class based on location */}
                    {/* <div
                        className={`content-wrapper transform ${location.pathname === '/about' ? 'scale-100' : 'scale-0'
                            } transition-all duration-700 ease-in-out`}
                    > */}
                    <Routes>
                        <Route path="/" element={<AboutPage />} />
                        <Route path="/education" element={<EducationPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                    </Routes>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Home;
