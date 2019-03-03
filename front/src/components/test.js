import React,{Component} from 'react';
const axios = require("axios");
import Webcam from "react-webcam";

export default class Test extends Component{
    constructor(props) {
        super(props);
        this.state={
            test: "",
            admin:"",
            images:[],
            quesans:[]
        }
    }
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
      };
    
    render(){

        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };

        return(
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
            </div>
        );
    }
}