import React from "react"
import { BounceLoader } from "react-spinners";

const Spinner: React.FC<{ loading: boolean }> = ({ loading }) => {
    return (

        <>
            {
                loading ?
                    <div className="fixed w-full h-full backdrop-blur-sm flex justify-center items-center z-[21]">
                        <BounceLoader 
                           size={75}
                           aria-label="Loading Spinner"
                           data-testid="loader"
                           color="#01023d"
                        className=" z-10"  />
                    </div>
                    : <></>
            }
        </>

    )
}

export default Spinner