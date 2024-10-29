import { Link } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import PostCard from "../components/PostCard"
import { useEffect, useState } from "react";

import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';

const Home = () => {
  const [posts, setPosts] = useState([]); 

  // get all posts 
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>

   <Swiper 
      navigation={true} 
      modules={[Navigation, Autoplay]} 
      loop={true}
      className="mySwiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      >
        <SwiperSlide>
           <img src={slider1} alt="slider" className="w-full h-[300px] sm:h-[440px] "  />
        </SwiperSlide>
        <SwiperSlide>
           <img src={slider2} alt="slider" className="w-full h-[300px] sm:h-[440px] "  />
        </SwiperSlide>
        <SwiperSlide>
           <img src={slider3} alt="slider" className="w-full h-[300px] sm:h-[440px] "  />
        </SwiperSlide>
      
      </Swiper>

     {/* blog section  */}
      <div className='max-w-7xl mx-auto p-3 flex flex-col items-center gap-8 py-7'>
        {posts && posts?.length > 0 && (
          <div className='flex flex-col gap-6 items-center justify-center'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts?.map((post) => (
                <PostCard key={post?._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>


      {/* call to action section  */}
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
 
    </div>
  )
}

export default Home

