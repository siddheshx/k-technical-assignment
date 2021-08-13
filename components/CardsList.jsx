import Image from 'next/image';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCardsAsync } from '../src/cardsSlice';
import useIntersection from '../src/hooks/UseIntersection';

const sideScroll = (
    element,
    speed,
    distance,
    step
) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
        element.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
            clearInterval(slideTimer);
        }
    }, speed);
};

const skeletonArray = [1, 2, 3, 4];

const CardsList = () => {
    const cardsWrapper = useRef(null);

    const inViewport = useIntersection(cardsWrapper, '-100px');

    const { value: cards, status } = useSelector((state) => state.cards);
    const dispatch = useDispatch();

    useEffect(() => {
        if (inViewport) {
            dispatch(getCardsAsync());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewport])

    return (
        <>
            <div ref={cardsWrapper} className="overflow-scroll scrollbar-hide whitespace-nowrap rounded-2xl">
                {status == 'loading' ?
                    skeletonArray.map((skeleton) =>
                    (
                        <div key={skeleton} className="inline-block w-3/4 mr-3 bg-white sm:w-2/4 md:w-4/12 lg:w-3/12 rounded-2xl">
                            <div className="relative">
                                <div className="bg-gray-300 h-96 animate-pulse rounded-t-2xl"></div>
                            </div>
                            <div className="px-6 py-4">
                                <div className="h-2 mb-2 text-xl bg-gray-300 rounded-sm animate-pulse card-title"></div>
                            </div>
                        </div>
                    )) :
                    cards.map((card) => (
                        <div key={card.id} className="inline-block w-3/4 mr-3 bg-white sm:w-2/4 md:w-4/12 lg:w-3/12 rounded-2xl">
                            <div className="relative h-96">
                                <Image
                                    src={card.url}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-2xl"
                                    alt={card.title}
                                />
                            </div>
                            <div className="px-6 py-4">
                                <div className="mb-2 text-xl font-bold card-title">{card.title}</div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex justify-between mt-5">
                <button
                    onClick={() => {
                        sideScroll(cardsWrapper.current, 25, 200, -10);
                    }}
                    className="py-4 mt-3 text-gray-500 transition duration-100 ease-in-out transform bg-white px-7 hover:text-black rounded-xl hover:-translate-y-1 hover:scale-110">Prev</button>
                <button
                    onClick={() => {
                        sideScroll(cardsWrapper.current, 25, 200, 10);
                    }}
                    className="py-4 mt-3 text-gray-500 transition duration-100 ease-in-out transform bg-white px-7 hover:text-black rounded-xl hover:-translate-y-1 hover:scale-110">Next</button>
            </div>
        </>
    )
}

export default CardsList
