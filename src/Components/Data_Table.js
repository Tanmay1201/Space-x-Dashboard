import {useEffect, useState} from "react"
import { connect } from "react-redux"
import { fetchData } from "../Actions/Fetch_Launch_Data_Action"
import { Extract_Table_Data } from "../Reducers/Fetch_Launch_Data_Reducer"
import Loader from "react-loader-spinner";

//import Pagination from './Pagination'
import Filters from './Filters'
import Row from './Row'
import { indexfetch } from '../Actions/Index_Selection_Action'
import Pagination from  'react-router-pagination'
import './Data_Table.css'

var statusMap = new Map();
statusMap.set('Upcoming Launches', 'Upcoming')
statusMap.set('Successful Launches', 'Success') 
statusMap.set('Failed Launches', 'Failed') 

const Data_Table = ({ fetchLaunchesData, filteredData, updateIndex }) => {
    
    const [currentRecords, setcurrentRecords] = useState([])
    const [manualFilteredData, setManualFiltereData] = useState([])
    const [statusFilter, setstatusFilter] = useState('')
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
    function onPageChanged(data) {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        console.log({ statusFilter })
        
        if (statusFilter == '') 
        {
            const currentRecords = filteredData.slice(offset, offset + pageLimit);
            setcurrentRecords(currentRecords)
        }
        else if (statusFilter == 'Upcoming Launches')
        {
            console.log(statusFilter)
            setcurrentRecords(statusFilteredData(filteredData, offset, pageLimit, 'Upcoming'))
        }
        else if (statusFilter == 'Successful Launches')
        {
            setcurrentRecords(statusFilteredData(filteredData, offset, pageLimit, 'Success'))
        }
        else
        { 
            setcurrentRecords(statusFilteredData(filteredData, offset, pageLimit, 'Failed'))
        }
        
    }
    function statusFilteredData(filteredData, offset, pageLimit, filter)
    {
        const tempData = [];
        for (var i = 0; i < filteredData.length; i++)
        {
            if (filteredData[i].launch_status === filter)
            {
                tempData.push(filteredData[i])
            }    
        }
        console.log(tempData)
        return(tempData.slice(offset, offset + pageLimit))
    }

    function FilterData(value)
    {
        /*console.log('This is filter' + value)
        if (value !== '') {
            const newStatus = { statusFilter: value };
        setstatusFilter(newStatus); 
        var statusEquivalent;
        console.log('This is status'+ newStatus)
        if (statusMap.has(value))
        {
            statusEquivalent = statusMap.get(value)    
        }
        console.log(statusEquivalent)
        const tempcurrentRecords = []
        for (var i = 0; i < filteredData.length; i++)
        {
            if (filteredData[i].launch_status === statusEquivalent)
            {
                console.log(filteredData[i])
                tempcurrentRecords.push(filteredData[i])
            }    
        }
        console.log(tempcurrentRecords)
        setcurrentRecords(tempcurrentRecords)
        }
        else {
            setcurrentRecords(filteredData)
            <Pagination totalRecords={filteredData.length} pageLimit={12} pageNeighbours={1} onPageChanged={onPageChanged} />
        }*/
        
    }
    console.log('Data'+currentRecords)
    if (filteredData.length > 0) {
        {
            return (
                <div>
                    <Filters FilterData={ FilterData}/>
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
                    <div className='Paginate'>
                        <Pagination totalPages={12} pageNumber={2} spread={4} format='center'/>
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
