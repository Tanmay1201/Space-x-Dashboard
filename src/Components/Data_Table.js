import {useEffect} from "react"
import { connect } from "react-redux"
import { fetchData } from "../Actions/Fetch_Launch_Data_Action"
import { Extract_Table_Data } from "../Reducers/Fetch_Launch_Data_Reducer"
import Loader from "react-loader-spinner";
import Row from './Row'
import {indexfetch} from '../Actions/Index_Selection_Action'
import './Data_Table.css'


const Data_Table = ({ fetchLaunchesData, filteredData, updateIndex }) => {
    
    useEffect(() => {
        async function fetchData() 
        {
            fetchLaunchesData();
        }
        
        fetchData()
        console.log(fetchData())
        console.log('This is ' + filteredData)
    }, [])
    console.log('Length' + filteredData)
    function handleRowClick(e) {
        console.log('Index' + e)
        updateIndex(e)
    }
    if (filteredData.length > 0) {
        {
            
            return (
                <div>
                    <div className="data_table">
                        <table>
                            <tr>
                                <th>No:</th>
                                <th>Launched(UTC)</th>
                                <th className="Location">Location</th>
                                <th className="Mission">Mission</th>
                                <th>Orbit</th>
                                <th>Launch Status</th>
                                <th>Rocket</th>
                            </tr>
                            
                            
                         {
                             
                        filteredData && filteredData.map((data,index) => (
                            <Row data={data} index={index} handleClick={ handleRowClick}/>
                        ))
                                
                            }
                             </table>   
                    </div>
                   
                </div>
            )
        }
    }
    else {
        return (
            <div className="Loader">
            <Loader 
                type="BallTriangle"
                color="#005288"
                height={100}
                width={100} 

                />
                </div>
        );
    }    
}

const mapStateToProps = state => {
    return {
        launchData: state.FetchLaunchData,
        filteredData:  Extract_Table_Data(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchLaunchesData: () => dispatch(fetchData()),
        updateIndex: (e) => dispatch(indexfetch(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data_Table);
