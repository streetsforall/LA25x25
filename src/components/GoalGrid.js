import React, { useState, useEffect, useRef } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


function GoalGrid(content) {

    const goals = content ? content.content : ""
    return (
        <div className="goalGrid">
            <div className="goal healthy">
                {documentToReactComponents(goals.healthy.json)}
            </div>

            <div className="goal access">
            {documentToReactComponents(goals.accessability.json)}
            </div>

            <div className="goal green">
            {documentToReactComponents(goals.climate.json)}
            </div>

            <div className="goal productive">
            {documentToReactComponents(goals.productivity.json)}
            </div>

            <div className="goal">
            {documentToReactComponents(goals.measurables.json)}

            </div>
        </div>
    );
}

export default GoalGrid;