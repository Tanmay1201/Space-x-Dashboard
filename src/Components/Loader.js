import './Loader.css'
const Loader = () => {
    return (
        <div>
            <div id="reusable-rocket">
                <div id="logo-container">
                    <div className="logo" id="usa"></div>
                    <div className="logo" id="logo-s"></div>
                    <div className="logo" id="logo-p"></div>
                    <div className="logo" id="logo-a"></div>
                    <div className="logo" id="logo-c"></div>
                    <div className="logo" id="logo-e"></div>
                    <div className="logo" id="logo-x"></div>
                </div>
                    
                <div className="nitrogen-thruster" id="l-thruster"></div>
                <div className="nitrogen-thruster" id="m-thruster"></div>
                <div className="nitrogen-thruster" id="r-thruster"></div>

                <div className="grid-fin" id="l-fin"></div>
                <div className="grid-fin" id="r-fin"></div>

                <div className="hydraulic-ram" id="l-hydraulic"></div>
                <div className="landing-leg" id="l-leg"></div>
                <div className="hydraulic-ram" id="m-hydraulic"></div>
                <div className="landing-leg" id="m-leg"></div>
                <div className="hydraulic-ram" id="r-hydraulic"></div>
                <div className="landing-leg" id="r-leg"></div>

                <div className="merlin-engine" id="l-engine"></div>
                <div className="merlin-engine" id="m-engine"></div>
                <div className="merlin-engine" id="r-engine"></div>
                </div>

                <div id="barge">
                <div id="barge-circle"></div>
                </div>
        </div>
    )
}

export default Loader