import { useState, useEffect } from 'react';

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

const useResponsive = () => {
    const [screenType, setScreenType] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setScreenType({
                isMobile: screenWidth < breakpoints.md,
                isTablet: screenWidth >= breakpoints.md && screenWidth < breakpoints.lg,
                isDesktop: screenWidth >= breakpoints.lg && screenWidth < breakpoints['2xl'],
                isLargeDesktop: screenWidth >= breakpoints['2xl'],
            });
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenType;
}

export default useResponsive;
