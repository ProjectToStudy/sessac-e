import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import styles from '../../../styles/Home.module.scss';

SwiperCore.use([Autoplay, Pagination]);

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Swiper
                className="banner"
                slidesPerView={1}
                loop={true}
                loopedSlides={1}
                autoplay={{ delay: 2000 }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <img src="" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
