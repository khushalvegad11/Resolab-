import React from 'react';
import Loader from 'react-loader-spinner';
import '../style/css/Loader.css';
function LoadingElement(){
    return(
            <div className = "loaderdiv">
                
                <Loader
                className = "loadersvg"
                type="ThreeDots"
                color="#00BFFF"
                height={800}
                width={800}
                timeout={0}
                radius={1000}
                />
            </div>
    );
}
export default LoadingElement;