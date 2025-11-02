// Utility to get default image URLs from the main website
// These paths point to the actual images currently used on the website

const MAIN_WEBSITE_URL = 'http://localhost:5173';

export const getDefaultImages = (pageId) => {
  if (pageId === 'home') {
    return {
      hero1: {
        // Hero images are served via CSS background, but we can access the asset files
        // Try accessing via assets path that Vite processes
        image: `${MAIN_WEBSITE_URL}/src/assets/image/hero-1.jpg`,
      },
      hero2: {
        image: `${MAIN_WEBSITE_URL}/src/assets/image/hero-2.jpg`,
      },
      services: [
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif1.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif2.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif3.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif4.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif5.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif6.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif7.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif8.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif9.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif10.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif11.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/gif12.gif` },
      ],
      carRepair: {
        image: `${MAIN_WEBSITE_URL}/src/assets/image/service.png`,
      },
      coreValues: [
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/easy.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/financing.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/expertise.gif` },
        { image: `${MAIN_WEBSITE_URL}/src/assets/image/cost.gif` },
      ],
      about: {
        image: `${MAIN_WEBSITE_URL}/src/assets/image/about-car.png`,
      },
    };
  }
  
  return {};
};

