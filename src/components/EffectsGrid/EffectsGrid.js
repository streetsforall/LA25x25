import { React, useRef, useState, useEffect } from "react";
import "./EffectGrid.css"

const EffectsGrid = (e) => {

    const loaded = e.effect

    const [climate, setclimate] = useState(false)
    const [health, sethealth] = useState(false)
    const [productivity, setproductivity] = useState(false)
    const [accessibility, setaccessibility] = useState(false)
    const [filtered, setfiltered] = useState(loaded)

    const filter = [accessibility && "Accessibility", climate && "Climate", health && "Health", productivity && "Productivity"]
    const filteredArray = loaded.filter((e) => 
        e.pillar.some((a) => filter.indexOf(a) === -1))


    useEffect(() => {
        setfiltered(filteredArray)
        console.log("taged")
    }, [climate, health, accessibility, productivity])

    return (
        <div className="Grid">

            <div className="GridMenu">
                <p>{e.intro}</p>
                <button onClick={() => { setclimate(c => !c); }} class={climate ? "selected" : ""}>Climate</button>
                <button onClick={() => { sethealth(h => !h); }} class={health ? "selected" : ""}>Health</button>
                <button onClick={() => { setaccessibility(a => !a); }} class={accessibility ? "selected" : ""}>Accessibility</button>
                <button onClick={() => { setproductivity(p => !p); }} class={productivity ? "selected" : ""}>Productivity</button>
            </div >

            {filtered && filtered.map((e) => {

                return (
                    <div className="GridItem">
                        {e.pillar.map((a) => {
                            return (
                                <>
                                    <sub className={
                                        (a === "Health" ? "healthy" : "") +
                                        (a === "Climate" ? "green" : "") +
                                        (a === "Productivity" ? "productive" : "") +
                                        (a === "Accessibility" ? "access" : "")}
                                    >{a}
                                    </sub><span> </span>
                                </>
                            )
                        })}

                        <p>{e.content}</p>
                        <a target={e.source === "#Data" ? "":"_blank"} href={e.source ? e.source : ""}>SOURCE</a>
                    </div>
                )
            })
            }
        </div >
    )

}

export default EffectsGrid;
