import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./index.css";

interface CarouselProps { 
    carouselData: Array<{img: string, alt: string, text?: string}>
}
function Carousel({carouselData}: CarouselProps) {
    return (
        <Swiper 
            modules={[Autoplay, Navigation, Pagination]} 
            autoplay={{ delay: 5000, disableOnInteraction: false }} 
            className="mySwiper"
            pagination={{ clickable: true }}
        >
            { carouselData.map((slide) => (
                <SwiperSlide key={slide.img} className="slide">
                    <img
                        src={`/${slide.img}`}
                        loading="lazy"
                        alt={slide.alt}
                    />
                    {slide.text &&
                        <h3 className="banner-text" dangerouslySetInnerHTML={{__html: slide.text}} />
                    }
                </SwiperSlide>
            ))
            }
      </Swiper>
    );
}

export default Carousel;
