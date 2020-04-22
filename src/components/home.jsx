import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IndiaMap from './misc/indiaMap';

class Home extends Component {
    state = {  }

    openTab = (e, itemName) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(itemName).style.display = "block";
        e.currentTarget.className += " active";
    } 

    render() { 
        return ( 
            <React.Fragment>
                <div className="jumbotron">
                    <h1 className="display-4 text-center">Coronavirus disease (COVID‑19)</h1>
                    <hr/>
                    <div className="tab">
                        <button className="tablinks active" onClick={(e) => this.openTab(e, 'Overview')}>Overview</button>
                        <button className="tablinks" onClick={(e) => this.openTab(e, 'Symptoms')}>Symptoms</button>
                        <button className="tablinks" onClick={(e) => this.openTab(e, 'Prevention')}>Prevention</button>
                        <button className="tablinks" onClick={(e) => this.openTab(e, 'Treatments')}>Treatments</button>
                    </div>

                    <div id="Overview" style={{display: 'block'}} className="tabcontent">
                        <h1 className='display-4 text-center'>COVID-19 India <img src={require('./resources/img/ind-flag.gif')} alt='INDIA flag' width="60" border="1 px solid #aaa"></img></h1>                            
                        <IndiaMap />
                        <div className='larger-110'>
                            <p>Coronavirus disease (COVID-19) is an infectious disease caused by a new virus.</p>
                            <p>
                                The disease causes respiratory illness (like the flu) with symptoms such as a cough, fever, and in more severe cases, difficulty breathing. You can protect yourself by washing your hands frequently, avoiding touching your face, and avoiding close contact (1 meter or 3 feet) with people who are unwell.
                            </p>
                            <hr/>
                            <p>How it Spreads</p>
                            <p>
                                Coronavirus disease spreads primarily through contact with an infected person when they cough or sneeze. It also spreads when a person touches a surface or object that has the virus on it, then touches their eyes, nose, or mouth.
                            </p>
                        </div>
                    </div>

                    <div id="Symptoms" className="tabcontent">
                        <div className='larger-110'>
                            <ul>
                                <li>cough</li>
                                <li>fever</li>
                                <li>tiredness</li>
                                <li>sifficulty breathing</li>
                            </ul>
                            <p>
                                People may be sick with the virus for 1 to 14 days before developing symptoms. The most common symptoms of coronavirus disease (COVID-19) are fever, tiredness, and dry cough. Most people (about 80%) recover from the disease without needing special treatment.
                            </p> 
                            <p>
                                More rarely, the disease can be serious and even fatal. Older people, and people with other medical conditions (such as asthma, diabetes, or heart disease), may be more vulnerable to becoming severely ill.
                            </p>
                        </div>
                    </div>

                    <div id="Prevention" className="tabcontent">
                        <div className='larger-110'>
                            <p>There’s currently no vaccine to prevent coronavirus disease (COVID-19).</p>
                            <hr/>
                            <p>You can protect yourself and help prevent spreading the virus to others if you:</p>

                            <div className='larger-120'>
                                <p>
                                    Do<br/>
                                    <i className='fas fa-hands-wash text-success'></i> Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub<br/>
                                    <i className='fas fa-head-side-mask text-success'></i> Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze<br/>
                                    <i className='fas fa-people-arrows text-success'></i> Avoid close contact (1 meter or 3 feet) with people who are unwell<br/>
                                    <i className='fas fa-house-user text-success'></i> Stay home and self-isolate from others in the household if you feel unwell
                                </p>
                            <p>
                                Don't<br/>
                                <i className='fas fa-handshake-slash text-danger'></i> Touch your eyes, nose, or mouth if your hands are not clean
                            </p>
                            </div>
                        </div>
                    </div>

                    <div id="Treatments" className="tabcontent">
                        <div className='larger-110'>
                            <p>There is no specific medicine to prevent or treat coronavirus disease (COVID-19). People may need supportive care to help them breathe.</p>
                            <hr/>
                            <p>Self-Care</p>
                            <p>
                                If you have mild symptoms, stay at home until you’ve recovered. You can relieve your symptoms if you:
                                <br/>
                                • rest and sleep<br/>
                                • keep warm<br/>
                                • drink plenty of liquids<br/>
                                • use a room humidifier or take a hot shower to help ease a sore throat and cough<br/>
                            </p>
                            <hr />
                            <p>Medical Treatments</p>
                            <p>
                                If you develop a fever, cough, and have difficulty breathing, promptly seek medical care. Call in advance and tell your health provider of any recent travel or recent contact with travelers.
                            </p>
                        </div>
                    </div>
                    <p className="text-center mt-3">Test your COVID-19 risk factor by answering a few questions</p>
                    <div className="text-center">
                        <Link to="/dashboards" className="btn btn-primary btn-lg">Take Test</Link>
                        <Link to="/dashboards/corona/india" className="ml-5 btn btn-outline-primary btn-lg">Show More</Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Home;