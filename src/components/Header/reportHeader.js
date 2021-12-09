import React, { useState, props } from "react"
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./header.css";



const ReportHeader = (props) => {

    const handleClick = () => {
        props.changeLinkText('');
    }

    console.log(props.language);

    return (
        <>
            <div id="Home" className="header">
                <div class="headerleft">
                    <div class="title">
                        <h1>LA 25x25</h1>
                        {props.language === "English" ?
                        <h3>
                      
                        A challenge to our next leaders to build a more <span className="access">accessible</span> <span className="green">green</span> <span className="healthy">healthy</span> and <span className="productive">productive</span> city by giving public space back to people.
                    </h3> : 
                    <h3> 
                    Un desafío para nuestros próximos líderes para construir una ciudad <span className="green">sostenible</span>  <span className="healthy">saludable</span> y <span className="productive">productiva</span> más <span className="access">accesible</span>, devolviendo el espacio público a las personas.
                        </h3>

                        }
                    </div>
                    <div class="vid">
                        <iframe modestbranding="1" mwidth="100%" height="100%" src="https://www.youtube.com/embed/69J3serWViI?modestbranding=1" title="YouTube video player" frameborder="0" allow="fullscreen; modestbranding; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    </div>
                </div>

                <div class="headerright">
                    <div>
                        <a class="SFA" target="_blank" href="https://streetsforall.org/"><img src="SFA_logo.png" /></a>
                    </div>
                    <div>
                        <Link class="endorsments" to="coalition"><p>25x25 Sign-Ons</p></Link>
                    </div>
                    {/* <div class="sub_links"> */}
                    <a target="_blank" href="https://forms.gle/iBzm16Na9sDi2CRc7"><p>Candidate Sign-On Form</p></a>
                    <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeB6uOgWeGSUotmspB9UEnXYXzy0giVM8SjycUIwOnN3nUykA/viewform"><p>Org Sign-On Form</p></a>
                    {/* <a href="https://www.efundraisingconnections.com/c/STREETSFORALL">Donate</a> */}
                    <Link to="/nc"><p>Explore Data</p></Link>
                    <Link to="#Our_Built_Environment"><p>Read the Report</p></Link>
                    {/* </div> */}
                    <div>
                        <sub>By <a target="_blank" href="https://streetsforall.org/">Streets for All</a>. Inspired by Transportation Alternative's <a target="_blank" href="https://nyc25x25.org/">NYC25x25</a> campaign & created with their blessing.</sub>
                    </div>
                </div>


            </div>
            <div className="header-nav">
                <div>
                    <Link to="#">LA 25x25</Link>
                    <Link to="#Our_Built_Environment">Intro</Link>
                    <Link to="#Proposal">Proposal</Link>
                    <Link to="#Benefits">Benefits</Link>
                    <Link to="#Implementation">Implementation</Link>
                    <Link to="#Outro">Outro</Link>
                    <Link to="#Data">Data</Link>
                    <button data-tip="Coming Soon / Viene Pronto " class="language" onClick={() => handleClick()} >
                        {props.language === "Español" ? "English" : "Español"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReportHeader;