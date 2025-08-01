import React, { useEffect, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { FreeMode, Pagination, Autoplay, Keyboard } from "swiper"

// import { getAllCourses } from "../../services/operations/courseDetailsAPI"
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <>
      {Courses?.length ? (
         
      
        <Swiper
        slidesPerView={1}
        spaceBetween={25}
        // loop={true}
        freeMode={true}
        loopFillGroupWithBlank={true} 
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
       keyboard={{
          enabled: true,
        }}
        pagination={true }
        modules={[FreeMode, Pagination, Autoplay,Keyboard]}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-h-[30rem] custom-swiper-pagination"
      >

          {Courses?.map((course, i) => (
       
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Course_Slider
