import {useEffect, useMemo, useState} from "react"
import { connect } from "react-redux"
import { fetchData } from "../Actions/Fetch_Launch_Data_Action"
import { Extract_Table_Data } from "../Reducers/Fetch_Launch_Data_Reducer"
import { COLUMNS } from './Columns'
import {useTable} from 'react-table'
import Loader from "react-loader-spinner";
import Row from './Row'
import './Data_Table.css'


const Data_Table = ({ fetchLaunchesData, filteredData, launchData }) => {
    
    useEffect(() => {
        async function fetchData() 
        {
            fetchLaunchesData();
        }
        
        fetchData()
        console.log(fetchData())
        console.log('This is ' + filteredData)
    }, [])
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => filteredData, [])
    const table_instance = useTable({
        columns,
        data
    })

    console.log('Length' + filteredData)
    if (filteredData.length > 0) {
        {
            
            return (
                <div>
                    <div className="data_table">
                        <table>
                            <tr>
                                <th>No:</th>
                                <th>Launched(UTC)</th>
                                <th>Location</th>
                                <th>Mission</th>
                                <th>Orbit</th>
                                <th>Launch Status</th>
                                <th>Location</th>
                            </tr>
                            
                            
                         {
                             
                        filteredData && filteredData.map((data,index) => (
                            <Row data={data} index={index}/>
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
        fetchLaunchesData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Data_Table);
