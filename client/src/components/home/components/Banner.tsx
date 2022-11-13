import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/scss';
import styles from '../../../styles/Home.module.scss';

SwiperCore.use([Autoplay])

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Swiper
                className="banner"
                slidesPerView={1}
                loop={true}
                loopedSlides={1}
                autoplay={{ delay: 2000 }}
            >
                <SwiperSlide>
                    <img src="" alt="banner1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="" alt="banner2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="" alt="banner3" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
