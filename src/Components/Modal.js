import { connect } from "react-redux"
import { Extract_Modal_Data } from "../Reducers/Fetch_Launch_Data_Reducer"
import CancelIcon from '@material-ui/icons/Cancel';
import YouTubeIcon from '@material-ui/icons/YouTube';
import BookIcon from '@material-ui/icons/Book';
import { indexfetch } from '../Actions/Index_Selection_Action'
import './Modal.css'

const Modal = ({ index_data, launch_description, updateIndex }) => {
    
    console.log('This is index data' + index_data)
    function closeModal(e) {
        updateIndex(-1)
    }
    if (index_data > -1 && launch_description && index_data < launch_description.length) {
        let inputStyle = {}
        if (launch_description) {
            if (launch_description[index_data].launch_status === 'Failed')
            {
                inputStyle = {
                    backgroundColor: '#ffb3b3',
                    borderRadius: '45%',
                    color: 'Red',
                    padding: '8px',
                    fontSize: '12px',
                    marginLeft: '3px'
                }
            }
            else  if (launch_description[index_data].launch_status === 'Success')
            {
                inputStyle = {
                    backgroundColor: '#b3ffcc',
                    borderRadius: '45%',
                    color: '#009900',
                    padding: '8px',
                    fontSize: '12px',
                    marginLeft: '3px'
                }
            }
            else {
                inputStyle = {
                    backgroundColor: '#fff0b3',
                    borderRadius: '45%',
                    color: '#ffad33',
                    padding: '8px',
                    fontSize: '12px',
                    marginLeft: '3px'
                }
            }   
        }
        return (
         <div className='modal display-block'>
                <div className="modal-main">
                    <div className='Header'>
                        <div className="MissionStatus">
                            <div className="Mission_Name">
                                {launch_description[index_data].mission_name}
                                <span className="Status" style={inputStyle}>{launch_description[index_data].launch_status}</span>
                            </div >
                        </div>
                        <div className='CloseButton'>
                            <CancelIcon color='secondary' onClick={closeModal} className='closeIcon' />
                        </div>
                    </div>
                    <div className="Rocket_Name">
                        <span>{launch_description[index_data].rocket_name}</span>
                    </div>
                    <div className="Links"> 
                        
                        <a href={launch_description[index_data].article_link}><BookIcon color='secondary' /></a>
                        <a href={launch_description[index_data].wikipedia_link}><button>W</button></a>
                        <a href={launch_description[index_data].video_link}><YouTubeIcon color='primary' /></a>
                    </div>
                    <div className="Description">
                        <span>{launch_description[index_data].details && launch_description[index_data].details.length>250 ? launch_description[index_data].details.substr(0,250)+ '...' : launch_description[index_data].details}</span> <a href={launch_description[index_data].wikipedia_link}>Wikipedia</a>
                    </div>
                    <div className="Details">
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Flight Number</span>
                            </div>
                            <div className="Mapping">
                                <span className='Value'>{launch_description[index_data].flight_number}</span>
                            </div>
                            
                        </div>
                        <hr />
                        <div className="DataPayload">
                        <div className="Key">
                        <span>Mission Name</span>
                            </div>
                            <div className="Mapping">
                            <span className='Value'>{launch_description[index_data].mission_name}</span>
                            </div>
                            
                        </div>
                        <hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Rocket Type</span>
                            </div>
                            <div className="Mapping">
                                <span className='RocketTypeValue'>{launch_description[index_data].rocket_type}</span>
                            </div>
                            
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Rocket Name</span>
                            </div>
                            <div className="Mapping">
                                <span className='RocketNameValue'>{launch_description[index_data].rocket_name}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Manufacturer</span>
                            </div>
                            <div className="Mapping">
                                <span className='ManufacturerValue'>{launch_description[index_data].manufacturer}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Nationality</span>
                            </div>
                            <div className="Mapping">
                                <span className='NationalityValue'>{launch_description[index_data].nationality}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Launch Date</span>
                            </div>
                            <div className="Mapping">
                                <span className='LaunchDateValue'>{launch_description[index_data].launch_date_utc}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Payload Type</span>
                            </div>
                            <div className="Mapping">
                                <span className='PayloadValue'>{launch_description[index_data].payload_type}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Orbit</span>
                            </div>
                            <div className="Mapping">
                                <span className='OrbitValue'>{launch_description[index_data].orbit}</span>
                            </div>
                        </div><hr />
                        <div className="DataPayload">
                            <div className="Key">
                                <span>Launch Site</span>
                            </div>
                            <div className="Mapping">
                                <span className='LaunchSiteValue'>{launch_description[index_data].launch_site}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        )
    }
    else {
        return null
    }
    
}

const mapStateToProps = state => {
    return {
        index_data: state.IndexSelection.currentSelectedIndex,
        launch_description: Extract_Modal_Data(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateIndex: (e) => dispatch(indexfetch(e))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Modal)