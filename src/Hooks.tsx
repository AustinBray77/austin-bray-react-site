import { useEffect, useState } from "react";
import { getWindowSize, WindowSizes } from "./Sizing";

const useOnScreen = (ref: React.RefObject<HTMLDivElement>): boolean => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            let element = entries[0];
            setIntersecting(element.isIntersecting);
        });

        if (ref.current != null) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
};

function useOnResize<T>(func: (window: WindowSizes) => T, base: T): T {
    const [value, setValue] = useState(base);

    useEffect(() => {
        const handleResize = () => {
            setValue(func(getWindowSize(window)));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return value;
}
export { useOnScreen, useOnResize as useRecalculateHeight };
