import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';
import "../index.css";

export default function WelcomePage() {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(3);
    const [hideWelcome, setHideWelcome] = useState(false);
    const animationRef = useRef(null);
    const circuitRef = useRef(null);

    // Text animation using anime.js
    useEffect(() => {
        // Animate SVG stroke
        const textAnimation = animate(".shubham-stroke", {
            targets: '.shubham-stroke',
            strokeDashoffset: [1000, 0],
            strokeDasharray: [1000, 1000],
            ease: 'inOutQuad',
            duration: 8000,
            delay: 0,
            complete: () => {
                setAnimationComplete(true);
                // Fill animation after stroke is complete
                animate(".shubham-stroke", {
                    targets: '.shubham-stroke',
                    duration: 6000,
                    ease: 'inOutQuad'
                });
            }
        });

        // Start the loading bar along with the text animation
        const loadingBarAnimation = animate(".loading-bar-fill",{
            targets: '.loading-bar-fill',
            width: '100%',
            duration: 8000,
            easing: 'linear',
            complete: () => {
                setAnimationComplete(true);
            }
        });

        animationRef.current = textAnimation;

        return () => {
            if (animationRef.current) animationRef.current.pause();
            if (loadingBarAnimation) loadingBarAnimation.pause();
        };
    }, []);

    // Countdown timer after animation completes
    useEffect(() => {
        if (!animationComplete) return;

        const interval = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setFadeOut(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 700);

        return () => clearInterval(interval);
    }, [animationComplete]);

    // Skip intro handler
    const handleSkip = () => {
        setFadeOut(true);
    };

    // Transition to main content after fade out
    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(() => {
                setHideWelcome(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [fadeOut]);

    return (
        <>
            {!hideWelcome && (
                <div
                    className={`fixed inset-0 z-50 bg-gray-100 dark:bg-background flex items-center justify-center
                    transition-opacity duration-1000 ease-in-out overflow-hidden
                    ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="text-primary flex flex-col items-center justify-center w-full max-w-6xl px-4 relative">
                        {/* Name SVG with theme-compatible colors */}
                        <svg className="w-full h-auto relative z-10" viewBox="0 0 800 150">
                            <defs>
                                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="50%" stopColor="var(--card)" />
                                    <stop offset="100%" stopColor="var(--primary)" />
                                </linearGradient>
                                <filter id="textGlow">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <text
                                className="shubham-stroke"
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="transparent"
                                stroke="url(#textGradient)"
                                strokeWidth="1.5"
                                fontSize="80"
                                fontFamily="poppins, sans-serif"
                                filter="url(#textGlow)"
                            >
                                SHUBHAM SHINDE
                            </text>
                        </svg>

                        {/* Loading bar with shadcn UI theme colors */}
                        {animationComplete && (
                            <div className="mt-8 w-64 bg-muted rounded-full h-2 overflow-hidden relative z-10 border border-border">
                                <div
                                    className="h-full loading-bar-fill transition-all duration-1000 ease-linear bg-primary"
                                    style={{
                                        width: `${(timeRemaining / 3) * 100}%`
                                    }}
                                ></div>
                            </div>
                        )}

                        {/* Skip button with shadcn UI theme colors */}
                        <button
                            onClick={handleSkip}
                            className="mt-8 text-sm text-muted-foreground hover:text-primary transition-colors relative z-10 px-6 py-1 border border-border rounded-full hover:bg-muted"
                        >
                            Skip Intro
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
