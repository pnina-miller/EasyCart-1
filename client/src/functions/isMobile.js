
export const isMobile = () => {
    const mobileState = window.matchMedia('(max-width:600px)').matches;
    return mobileState;
}