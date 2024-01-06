import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./category.css"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {getcategory} from "../../Api/CategoryApi"
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../State/Slice/categorySlice'
import {toast} from "react-toastify"



const NextArrow = ({ onClick }) => {
    return (
        <div onClick={onClick} className='arrowright'>
            <AiOutlineRight className='icon' />
        </div>
    )
}

const PrevArrow = ({ onClick }) => {
    return (
        <div onClick={onClick} className='arrowleft'>
            <AiOutlineLeft className='icons' />
        </div>
    )

}

const addHash=(category)=>{
    window.location.hash = category;
    //add scroll till blogs
    const currentPosition = window.scrollY;
    window.scrollTo({
        top: currentPosition + 190,
        behavior: 'smooth',
      });
}

const Category = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint:600,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                }
            }

        ]
    };
    const dispatch=useDispatch();
    const category=useSelector(state=>state.Category);

    useEffect(()=>{
        const getCategory=async()=>{
            const res=await getcategory();
            if(res.success){
                dispatch(setCategory(res.category))
            }
            else{
                console.log("Error",res.error);
                toast.error(res.error);
            }
        }

        getCategory();
    },[dispatch])

    
    return (
        <div className='category'>
            <Slider {...settings}>
                {
                    category.map((cat) => {
                        return <div key={cat._id} className='scroll' onClick={()=>{addHash(cat.category)}}>
                            <img src={cat.categoryImg.imgUrl} alt="" />
                            <div className='overlay'>
                                <Link>
                                    <h4>{cat.category}</h4>
                                </Link>
                                <p>{cat.title}</p>
                            </div>
                        </div>
                    })
                }
            </Slider>


        </div>
    )
}

export default Category
