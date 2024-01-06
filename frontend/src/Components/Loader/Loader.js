import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

import "./loader.css"
import { useSelector } from 'react-redux'

const Loader = () => {
    const loader=useSelector(state=>state.Loader);
    return (
        <div className='loader'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={loader}
            />

        </div>

    )
}

export default Loader