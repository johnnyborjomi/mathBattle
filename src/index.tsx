import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles/style.scss";
import * as app from './components/app';


ReactDOM.render(
    <>
        <div className="game-field in-start">
            <div className="score-text">Score: <span className="score"></span></div>
            <h1>Math Battle!</h1>
            <div className="buttons buttons--start">
                <button className="start">start</button>
            </div>
        </div>
        <div className="game-field in-game hidden">
            <div className="score-text">Score: <span className="score"></span></div>
            <div className="formula">
        
            </div>
            <div className="timeline">
                <div className="line"></div>
            </div>
            
            <div className="buttons">
                <button className="correct">yes</button>
                <button className="wrong">no</button>
            </div>
        </div>
    </>,
    document.body.querySelector('.app')
);

app.a();






