import React,{Component} from 'react';
const axios = require("axios");
import Webcam from "react-webcam";

export default class Test extends Component{
    constructor(props) {
        super(props);
        this.state={
            phase:0

        }
    }
    componentWillReceiveProps(nextProps,prevProps)
    {
        console.log("idhar",prevProps.initialData,nextProps.initialData)
        if(prevProps!=nextProps&&nextProps.images.length>0)
        {
            this.setState({
                test:nextProps.initialData[0]
            })

        }
        if(prevProps!=nextProps&&nextProps.quesans.length>0)
        {
            this.setState({
                test:nextProps.initialData[0]
            })

        }
    }

    doSomething=(evt, type)=>{
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(type).style.display = "block";
        evt.currentTarget.className += " active";
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