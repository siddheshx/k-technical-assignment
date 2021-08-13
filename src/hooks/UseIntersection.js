import { useEffect, useState } from "react";

const useIntersection = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState(entry.isIntersecting);
                    observer.unobserve(element.current);
                }
            }, { rootMargin }
        );

        element && observer.observe(element.current);

        return () => observer.unobserve(element.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isVisible;
};

export default useIntersection
