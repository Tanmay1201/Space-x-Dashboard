import './Loader.css'
const Loader = () => {
    return (
        <div>
            <div id="reusable-rocket">
                <div id="logo-container">
                    <div class="logo" id="usa"></div>
                    <div class="logo" id="logo-s"></div>
                    <div class="logo" id="logo-p"></div>
                    <div class="logo" id="logo-a"></div>
                    <div class="logo" id="logo-c"></div>
                    <div class="logo" id="logo-e"></div>
                    <div class="logo" id="logo-x"></div>
                </div>
                    
                <div class="nitrogen-thruster" id="l-thruster"></div>
                <div class="nitrogen-thruster" id="m-thruster"></div>
                <div class="nitrogen-thruster" id="r-thruster"></div>

                <div class="grid-fin" id="l-fin"></div>
                <div class="grid-fin" id="r-fin"></div>

                <div class="hydraulic-ram" id="l-hydraulic"></div>
                <div class="landing-leg" id="l-leg"></div>
                <div class="hydraulic-ram" id="m-hydraulic"></div>
                <div class="landing-leg" id="m-leg"></div>
                <div class="hydraulic-ram" id="r-hydraulic"></div>
                <div class="landing-leg" id="r-leg"></div>

                <div class="merlin-engine" id="l-engine"></div>
                <div class="merlin-engine" id="m-engine"></div>
                <div class="merlin-engine" id="r-engine"></div>
                </div>

                <div id="barge">
                <div id="barge-circle"></div>
                </div>
        </div>
    )
}

export default Loader