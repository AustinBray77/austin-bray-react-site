import { useEffect, useState } from "react";

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

export { useOnScreen };
