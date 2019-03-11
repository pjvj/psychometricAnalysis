import React,{Component} from 'react';
const axios = require("axios");
import { ReactMic } from 'react-mic';
import Recorder from "@bigear/microphone-recorder";
//var base64ToImage = require('base64-to-image');
//const fs = require("fs");
//import AudioRecorder from 'react-audio-recorder';
import Webcam from "react-webcam";
var resizebase64 = require('resize-base64');  

//import Iframe from 'react-iframe'
//const Dpath = `/Users/pallavi/college/psychometricAnalysis/UsersData/`;
class Test extends Component{
    constructor(props) {
        super(props);
        this.state={
            // mediaRec:[],
            // myaudio:[],
            // record: false,
            activeStep:-1,
            quesans:[],
            images:[],
            qid:0,
            imgid:0,
            qscore: 0,
            iscore:0,
            facescores:[0,0,0,0,0,0,0],
            noofcaptures:0,
            showfacescore:false,
            showsentimentscore:false,
            facevalue:"",
            sentimentvalue:""
        }
    }
    setRef = webcam => {
        this.webcam = webcam;
      };
    componentWillReceiveProps(nextProps,prevProps)
    {
        console.log("idhar",prevProps.images,nextProps.images);
        if(prevProps!=nextProps&&nextProps.images.length>0)
        {
            this.setState({
                images:nextProps.images
            });

        }
        if(prevProps!=nextProps&&nextProps.quesans.length>0)
        {
            this.setState({
                quesans:nextProps.quesans           
            });

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
    submitAnswer(){
        const given_ans=document.getElementById("answer"+this.state.qid).value;
        const exp_ans=this.state.quesans[this.state.qid].answer;
        fetch("http://localhost:8000/FindSimilarity",
        {
            method: 'post',
            headers: new Headers({'content-type': 'application/json'}),
            "withCredentials":true,
            "mode":"cors",
            body: JSON.stringify({
                "exp_ans": exp_ans,
                "given_ans":given_ans
            })
        }).then(response => {
            this.setState({
                qscore: response
            });
        }).catch(err=>{
            console.log(err);
        })

    }
    submitDescription(){

    }
    
    
    startTest=()=>{
        this.setState({
            activeStep:0
        });
        document.getElementsByClassName("testtogive").style.display = "none";
        document.getElementsByName("gototest").style.display = "none";
        
    }
    handleQuestionImages=(e)=>{
        let name = e.target.name;
        let qi=this.state.qid;
        let ii=this.state.imgid;
        let ql=this.state.quesans.length;
        let il=this.state.images.length;
        if(name=='quesprevious')
        {
            if(qi==0)qi=ql-1;
            else qi-=1;
            this.setState({
                qid:qi
            });
            
        }
        else if(name=='quesnext')
        {
            if(qi==ql-1)qi=0;
            else qi+=1;
            this.setState({
                qid:qi
            });
        }
        else if(name=='imgprevious')
        {
            if(ii==0)ii=il-1;
            else ii-=1;
            this.setState({
                imgid:ii
            });
        }
        else if(name=='imgnext')
        {
            if(ii==il-1)ii=0;
            else ii+=1;
            this.setState({
                imgid:ii
            });
        }
    }
    
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        let y=this.state.noofcaptures;
        this.setState({
            noofcaptures:y+1
        });
        console.log("image taken",this.state.noofcaptures);
        var dataURI=imageSrc;
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        // create a view into the buffer
        var ia = new Uint8Array(ab);
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        var file = new File([blob], "imagefer.png", {type: "image/png", lastModified: Date.now()});
        var data = new FormData();
        data.append('imgUploader',file);
        var config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }  
        };
        axios.post(`http://localhost:8889/uploadfer/`,data,config)
            .then((response) => {
                console.log("The file is successfully uploaded");
            }).catch((error) => {
        });
        fetch("http://localhost:8000/FindEmotionFace/",
            {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                "withCredentials":true,
                "mode":"cors"   
                
            }).then(response => {
                return response.json()
            }).then((data) => {
                  
                console.log("aaya",data);
                //let res=response.json();
                let x= this.state.facescores;
                let n= this.state.noofcaptures;
                for(var i=0;i<x.length;i++)
                {
                    x[i]=x[i]+data[i];
                    x[i]=x[i]/n;
                }
                this.setState({
                    facescores: x
                });
                console.log("score of face",this.state.facescores);
                
            }).catch(err=>{
                console.log(err);
            })
    }
    
Recording=(e)=>{
    let name = e.target.name;
    //var myVar;
    if(name=='startrec')
    {
    this.myVar = setInterval(this.capture, 4000);
    console.log("chalu ho gaya");
    }
    else if(name=='stoprec')
    {
        window.clearInterval(this.myVar);
        console.log("khatam ho gaya");
        let x= this.state.facescores;
        this.setState({
            facescores: x,
            showfacescore:true
        });
        let s="";
        s=s+"\nAngry:"+x[0]+"\nDisgust:"+x[1]+"\nFear:"+x[2]+"\nHappy:"+x[3]+"\nSad:"+x[4]+"\nSurprised:"+x[5]+"\nNeutral:"+x[6];
        this.setState({
            facevalue:s
        })
    }
 }       
secondPhase=()=>{
    this.setState({
        activeStep:1
    });
    let images=this.state.images;
    console.log("before",images);
    let imagesshow = [];
    images.map((value,key)=>{
        //console.log("image ka naam", value);
        let url =`http://localhost:8889/getimage/${this.props.user}/${this.props.testname}/${value}`; 
        fetch(url).
        then((res)=>res.blob()
        ).catch((error)=>{
            console.log(error);

        }).then((res)=>{
        imagesshow.push(res);
        this.setState({
            images:imagesshow
        });});
    });
    
    console.log("aftre",this.state.images);
}
   
    render(){
        const videoConstraints = {
            width: 600,
            height: 600,
            facingMode: "user"
          };

        return(

            <div>
                {
                (this.state.activeStep==-1)
                ?(<div>
                    <p className="para">The test will start as soon as you click on the start button. There are 2 rounds in the test. 
                        It requires your audio and video.
                    </p>
                    <button className="addbutton" name="starttest" onClick={this.startTest}>StartTest </button>
                </div>
                ):(
                    <div>
                    {
                    (this.state.activeStep==0)?
                    (<div>
                            <div className="row">
                                <div className="flex">
                                <div className="card1" >
                                            <div className="card-body1">
                                                <h4 className="card-title1">Check your IQ</h4>
                                                <p className="card-text1">Answer the questions that follow.You can navigate through questions using previous and next buttons</p>
                                                <div className=" videofeed">
                                                    <Webcam
                                                            audio={false}
                                                            height={450}
                                                            ref={this.setRef}
                                                            screenshotFormat="image/png"
                                                            width={400}
                                                            videoConstraints={videoConstraints}
                                                            style={{float:'left'}}
                                                        />
                                                </div>
                                                
                                                <div className=" threebuttons">
                                                    <button className="capture" name="capture" onClick={this.capture}>Capture</button>
                                                    <button className="startrec" name="startrec" onClick={this.Recording}>StartRec</button>
                                                    <button className="stoprec" name="stoprec" onClick={this.Recording}>StopRec</button>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div className="card" >
                                            <div className="card-body">
                                                <h4 className="card-title">Check your IQ</h4>
                                                <p className="card-text">Answer the questions that follow.You can navigate through questions using previous and next buttons</p>
                                                <div>
                                                    <p className="displayques">{this.state.qid}. {this.state.quesans[this.state.qid].question} </p>
                                                </div>
                                                <div className="queschangerow">
                                                <button className="changequesp" name="quesprevious" onClick={this.handleQuestionImages}>Previous</button>
                                                <button className="changequesn" name="quesnext" onClick={this.handleQuestionImages}>Next</button>
                                                </div>
                                                <div className="row">
                                                {/* <input type="text" className="givenans" id={"answer"+this.state.qid} name={"answer"+this.state.qid} placeholder="Answer"/>
                                                <button className="testtogive" onClick={this.submitAnswer}>SubmitAnswer</button>  */}
                                                {(this.state.showfacescore)&&
                                                <input className="facescore" name={"qscore"+this.state.qid} placeholder="Score" value ={this.state.facevalue}/>
                                                } 
                                                </div>
                                                <div className="row">
                                                    < button className="addbutton" onClick={this.secondPhase}>Phase2</button>  
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                           </div> 
                    ):
                    (this.state.activeStep==1 &&
                    <div className="row">
                        
                            <div className="flex">
                                <div className="card2">
                                <div className="card-body2">
                                    <h4 className="card-title2">Check your IQ</h4>
                                    <p className="card-text2">Answer the questions that follow.You can navigate through questions using previous and next buttons</p>
                                    <img className="imagesenti" name={"image"+this.state.imgid}  src={URL.createObjectURL(this.state.images[this.state.imgid])}/>
                                    <div className="queschangerow">
                                        <button className="changeimgp" name="imgprevious" onClick={this.handleQuestionImages}>Previous</button>
                                        <button className="changeimgn" name="imgnext" onClick={this.handleQuestionImages}>Next</button>
                                    </div>
                                </div>
                                </div>
                                <div className="card2">
                                    <div className="card-body2">
                                            <h4 className="card-title2">Perception Check</h4>
                                            <p className="card-text2">Write a description of the image you see in 10-50 words. You can navigate through images using previous and next buttons</p>
                                            <div>
                                                <p className="displayimg">{this.state.imgid}. {this.state.images[this.state.imgid].question} </p>
                                            </div>
                                            <div className="row">
                                            {/* <input type="text" className="givenans" id={"answer"+this.state.qid} name={"answer"+this.state.qid} placeholder="Answer"/>
                                            <button className="testtogive" onClick={this.submitAnswer}>SubmitAnswer</button>  */}
                                            {(this.state.showsentimentscore)&&
                                            <input className="imagescore" name={"iscore"+this.state.imgid} placeholder="Score" value ={this.state.sentimentvalue}/>
                                            } 
                                            </div>
                                            <div className="row">
                                                < button className="addbutton" onClick={this.secondPhase}>Finish Test</button>  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        
                    </div>
                    )
                    }
                </div>
                )
            }
            </div>
        );
    }
}


export default Test;