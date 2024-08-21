enum WindowSizes {
    XS = 576,
    SM = 768,
    MD = 768,
    LG = 992,
    XL,
}

const getWindowSize = (windowInstance: Window): WindowSizes => {
    if (windowInstance.innerWidth < WindowSizes.XS) {
        return WindowSizes.XS;
    } else if (windowInstance.innerWidth < WindowSizes.SM) {
        return WindowSizes.SM;
    } else if (windowInstance.innerWidth < WindowSizes.MD) {
        return WindowSizes.MD;
    } else if (windowInstance.innerWidth < WindowSizes.LG) {
        return WindowSizes.LG;
    }

    return WindowSizes.XL;
};

export { WindowSizes, getWindowSize };
