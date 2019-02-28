import React from 'react';
import {Carousel} from 'react-bootstrap';

const FeatureDisplay = (props) => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className={"img1"} src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-533749.jpg"/>
                <Carousel.Caption>
                    <h1>Enhanced Coding Skills</h1>
                    <p>practice coding questions collected from different coding platforms sorted on the basis of tags
                        entered by user : it redirects to the user choosen coding platform of the given tag</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"img1"} alt="900x500"
                     src="http://cdn.wonderfulengineering.com/wp-content/uploads/2014/04/code-wallpaper-8.jpg"/>
                <Carousel.Caption>
                    <h1>Keep A Track of Your Progress</h1>
                    <p>display a comparison/brief of the number of questions already solved on different(spoj,
                        codechef,etc) platforms related to the provided tag</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"img1"} alt="900x500"
                     src="http://ecojourney.by/userfiles/literature/2ad0e0158092f457484fd682d068a51c.jpg"/>
                <Carousel.Caption>
                    <h1>Think On Your Feet</h1>
                    <p>Provide a scratch pad for rough work/notes while solving</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"img1"} alt="900x500"
                     src="http://www.babansadik.com/wp-content/uploads/2017/03/gina-facebook-2-2.jpg"/>
                <Carousel.Caption>
                    <h1>Discuss Your Code with your Buddies</h1>
                    <p>provides you a facility to make a group/chat hub: discuss queries relating to whatever you are
                        solving with others to facilitate a competitive feeling and healthy discussion environment</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className={"img1"} alt="900x500"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzLWjDV7EVjKd3akIbzXkux439LkbTCWTeh0NWVD2W2mqmdHwow"/>
                <Carousel.Caption>
                    <h1>Set A Schedule that reminds you</h1>
                    <p>set reminders for maintaining the flow and regularity of problem solving</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
export default FeatureDisplay;