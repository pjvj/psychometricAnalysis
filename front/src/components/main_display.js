
import React from 'react';
//import {Jumbotron} from 'react-bootstrap';
//import {Button} from 'react-bootstrap';
import {Carousel} from 'react-bootstrap';

const MainDisplay = () => {
    return (
        <div className="main-body">
            <section className="main-head" id="banner">
                <h1 className="main-heading">Psychometric Analysis</h1>
                <p/><h5 className="main-head-para" >Psychometric Analysis Tool powers judgment based on the assessment of the emotional state of an individual by using webcam, microphone and keyboard inputs. </h5><p/>
            </section>
            <section id="one" name="one" className="wrapper">
                <div className="inner">
                    <header className="align-center">
                        <h2>Features</h2>
                        <p/>
                    </header>
                    <div className="flex flex-2">
                        <article>
                            <div className="image fit">
                                <img src="/test/mind1.jpg" alt="Pic 01"/>
                            </div>
                            <header>
                                <h3>I: Facial Emotion Recognition</h3>
                            </header>
                            <p>While the interviewee speaks or gives a verbal response, images are captured periodically
                                from the webcam or video camera feed. The facial expression recognition model classifies each
                                image, calculating the class probability for each possible target class (angry, disgust, fear,
                                happy, sad, neutral, or surprise). The two classes with highest probabilities are used for
                                analysis.</p>

                        </article>
                        <article>
                            <div className="image fit">
                                <img src="/test/mind2.jpg" alt="Pic 02"/>
                            </div>
                            <header>
                                <h3>II: Speech Emotion Recognition</h3>
                            </header>
                            <p>The interviewee’s verbal response is recorded. The speech emotion recognition model is used
                                on the sequences of pressure levels (of successive frames) extracted from the audio recording
                                to assign a probability for each possible target class (angry, disgust, fear, happy, sad, neutral,
                                or surprise). The two classes with highest probabilities are used for analysis.</p>

                        </article>
                    </div>
                    <div className="flex flex-2">
                        <article>
                            <div className="image fit">
                                <img src="/test/mind3.jpg" alt="Pic 03"/>
                            </div>
                            <header>
                                <h3>III: Image Based Perspective Analysis</h3>
                            </header>
                            <p>The interviewee writes an honest descriptions of the shown image. The text in the description
                                is processed and converted to a feature vector. The sentiment analysis model takes the feature
                                vector as input and calculates the probability for each target class (positive, neutral, or
                                negative). This is used to determine the polarity of the interviewee’s opinions, and thus,
                                his/her attitude.</p>

                        </article>
                        <article>
                            <div className="image fit">
                                <img src="/test/mind4.jpg" alt="Pic 04"/>
                            </div>
                            <header>
                                <h3>IV: Text Based Similarity</h3>
                            </header>
                            <p>The interviewee writes a response to the given question. The database contains the expected
                                answer to the question. The given and expected responses are compared using similarity
                                measures like cosine similarity and jaccard similarity, and a score is assigned to the
                                interviewee’s response.</p>
                        </article>
                    </div>
                    <div className="flex flex-2">
                        <article>
                            <div className="image fit">
                                <img src="/test/mind5.jpg" alt="Pic 05"/>
                            </div>
                            <header>
                                <h3>V: Automated Chatbot</h3>
                            </header>
                            <p>Adaptive, interactive chatbot for questioning and answering by context detection throughout the
                            test session.</p>

                        </article>
                        <article>
                            <div className="image fit">
                                <img src="/test/mind6.jpg" alt="Pic 06"/>
                            </div>
                            <header>
                                <h3>VI: Database Management</h3>
                            </header>
                            <p>A database file is created which stores the filename and picture information in the form of
                                BLOB. Another database records list of questions and their respective answers entered by the
                                administrator. They can be accessed by querying the database by making a connection request
                                to it.</p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default MainDisplay;