import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./coalition.css";
import ReactGA from 'react-ga';
import {Helmet} from "react-helmet";


function Coalition(data) {
    const ElectionData = data.e.items ? data.e.items[0] : ""
    const candidates = ElectionData ? ElectionData.cityRacesCollection.items : ""
    const county = ElectionData ? ElectionData.countyRacesCollection.items : ""

    const [endrosements, setendorse] = useState(0);



    ReactGA.pageview(window.location.pathname);

    return (
        <div class="coalition">
            <Helmet>
                <meta charSet="utf-8" />
                <title>LA 25x25 Sign Ons</title>
                <link rel="canonical" href="http://la25x25.com/coalition" />
                <meta property="og:title" content="LA 25x25 Sign Ons" />
                <meta name="twitter:title" content="LA 25x25 Sign Ons"/>
                <meta name="twitter:image" content="https://la25x25.com/img/thumb.jpg"/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Helmet>
            <Link class="navButton" to="/">Home</Link>
            <img class="coalitionimg" src="img/LA-DT.jpg" />
            <div class="coalition-head">
                <p>{ElectionData.introParagraph} </p><br />

            </div>

            <div className="electeds-head">

                <a class="sign-on" target="_blank" href="https://forms.gle/iBzm16Na9sDi2CRc7"><p>Candidate Sign-On Form</p></a>
                
                <div class="coalition_grid endorsed">
                    <span className="neutral">No Response</span>
                    <span className="green">✓ Signed-On</span>
                    <span className="healthy">X Not Signed-On</span>
                </div>
            </div>

            <div class="electeds">
                {
                    candidates ? candidates.slice(0).map((a) =>

                        <div class="race">
                            <h3> {a.title}</h3>
                            {a.officialCollection.items.sort((a, b) => a.name.localeCompare(b.name, 'en', { ignorePunctuation: true })).map((a) =>
                                <li class={a.endorsed}>{a.name}</li>
                            )}

                        </div>
                    ) : ""}
                    <div class="race"><sub>Candidates determined viable by fundraising total, name recognition, or previous office. Want to be added? Please fill out our <a target="_blank" href="https://forms.gle/iBzm16Na9sDi2CRc7">sign-on form</a>.</sub></div>
            </div>
            <h1>Outside the City of LA</h1>
            
            <div class="electeds">
            <div class="race"><sub>While our report and outreach is focused on the City of LA, Candidates from other local races are <a target="_blank" href="https://forms.gle/iBzm16Na9sDi2CRc7">welcome to support the initiative</a> and be listed here.</sub></div>
                {
                    county ? county.slice(0).map((a) =>

                        <div class="race">
                            <h3> {a.position}</h3>
                            <li className="Yes">{a.name}</li>

                        </div>
                    ) : ""}
            </div>
            <h1>Coalition Members</h1>
            <a class="sign-on" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeB6uOgWeGSUotmspB9UEnXYXzy0giVM8SjycUIwOnN3nUykA/viewform"><p>Coalition Sign-On Form</p></a>
            <div class="coalition_grid orgs">

                {
                    ElectionData ? ElectionData.orgCollection.items.slice(0).map((a) =>
                        <a target="_blank" class="org" href={a.link}>
                            <img src={a.img.url} />
                            <p> {a.name}</p>
                        </a>
                    ) : ""}
            </div>

        </div>

    )

}

export default Coalition;