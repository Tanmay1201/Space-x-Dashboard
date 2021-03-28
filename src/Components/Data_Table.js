import {useEffect, useState} from "react"
import { connect } from "react-redux"
import { fetchData } from "../Actions/Fetch_Launch_Data_Action"
import { Extract_Table_Data } from "../Reducers/Fetch_Launch_Data_Reducer"
import Filters from './Filters'
import {fetchDataByStatus, getDateFilteredData} from './DataTableService'
import DataTableHelper from './DataTableHelper'
import { indexfetch } from '../Actions/Index_Selection_Action'
import Loader from '../Components/Loader'
import queryString from 'query-string'
import './Data_Table.css'

let statusMap = new Map();
statusMap.set('Upcoming Launches', 'Upcoming')
statusMap.set('Successful Launches', 'Success') 
statusMap.set('Failed Launches', 'Failed') 

const Data_Table = (props) => {
    
    
    useEffect(() => {
        const timer =setTimeout(() => {
            fetchLaunchesData();
        }, 4300); 
        return () => clearTimeout(timer);
    }, [])
    
    let status = ''
    let currentRecords = []
    let match = ''
    let { fetchLaunchesData, filteredData } = props
    let successfulLaunches = []
    let failedLaunches = []
    let upcomingLaunches = []
    let totalPages = 1

    const values = queryString.parse(props.location.search)
    console.log(values.daterange)
    let tempDateRange = {
        staticDate: null,
            startDate: null,
            endDate: null
    }
    if (values.daterange !== undefined && values.daterange.includes('To'))
    {
        console.log('In if')
        tempDateRange = {
            staticDate: null,
            startDate: values.daterange.substring(0, values.daterange.indexOf('To')-1),
            endDate: values.daterange.substring(values.daterange.indexOf('To')+3, values.daterange.length)
        }
    }
    else if(values.daterange !== undefined && values.daterange === 'All')
    {
        values.daterange = undefined
    }
    else if (values.daterange !== undefined)
    {
        tempDateRange = {
            staticDate: values.daterange,
            startDate: null,
            endDate: null
        }    
    }
    const[daterangeFilter, setDateRangeFilter] = useState((values.daterange !== undefined) ? tempDateRange : '')
    const [pageLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState((values.pageNumber !== undefined) ? values.pageNumber : 1)
    console.log(currentPage)
    const [offSet, setoffSet] = useState((currentPage - 1) * pageLimit)
    console.log(offSet)
    const [statusFilter, setstatusFilter] = useState('')
    
    if (values.status !== undefined)
    {
        status = values.status    
    }

    console.log(daterangeFilter)

    if (filteredData.length > 0) 
    {
        successfulLaunches = fetchDataByStatus(filteredData, 'Success');
        failedLaunches = fetchDataByStatus(filteredData, 'Failed');
        upcomingLaunches = fetchDataByStatus(filteredData, 'Upcoming');   
    }
    
    console.log(daterangeFilter)
    if (status === '' && daterangeFilter === '')
    {
        if (filteredData.length > 0)
        {
            currentRecords = (filteredData.slice(offSet, offSet + pageLimit))  
            totalPages = filteredData.length / pageLimit + 1
        }
        match = {
            path: `/data?pageNumber=:pageNumber`,
            params: {
                statusFilter: ''
            }
        }
    }
    else if(status !== '' && daterangeFilter === '')
    {
        if (filteredData.length > 0 && status === 'Upcoming Launches') 
        {
            currentRecords = (upcomingLaunches.slice(offSet, offSet + pageLimit))  
            totalPages = upcomingLaunches.length / pageLimit + 1
        }
        else if (filteredData.length > 0 && status === 'Successful Launches') 
        {
            currentRecords = (successfulLaunches.slice(offSet, offSet + pageLimit))  
            totalPages = successfulLaunches.length / pageLimit + 1
        }
        else if (filteredData.length > 0 && status === 'Failed Launches') 
        {
            currentRecords = (failedLaunches.slice(offSet, offSet + pageLimit))
            totalPages = failedLaunches.length / pageLimit
        }
        match = {
            path: `/data?status=${status}&pageNumber=:pageNumber`,
            params: {
                statusFilter: statusFilter
            }
        }
    }
    else if((status === '' || status === 'None') && daterangeFilter !== '')
    {
        let tempData = getDateFilteredData(filteredData, daterangeFilter, null)
        if (tempData.length > 0)
        {
            currentRecords = (tempData.slice(offSet, offSet + pageLimit))  
            totalPages = tempData.length / pageLimit + 1    
        }
        let initialValueToSet;
        if (daterangeFilter.startDate !== null)
        {
            initialValueToSet = daterangeFilter.startDate.toString().substring(0, 15) + ' To '  + daterangeFilter.endDate.toString().substring(0, 15)    
        }
        else
        {
            initialValueToSet = daterangeFilter.staticDate
        }
        match = {
            path: `/data?daterange=${initialValueToSet}&pageNumber=:pageNumber`,
            params: {
                daterange: daterangeFilter
            }
        }
    }
    else if(status !== '' && daterangeFilter !== '')
    {
        if (filteredData.length > 0 && status === 'Upcoming Launches') 
        {
            let tempData = getDateFilteredData(filteredData, daterangeFilter, 'Upcoming')
            if (tempData.length > 0)
            {
                currentRecords = (tempData.slice(offSet, offSet + pageLimit))  
                totalPages = Math.ceil(tempData.length / pageLimit) 
            }
        }
        else if (filteredData.length > 0 && status === 'Successful Launches') 
        {
            let tempData = getDateFilteredData(filteredData, daterangeFilter, 'Success')
            currentRecords = (tempData.slice(offSet, offSet + pageLimit))  
            totalPages = Math.ceil(tempData.length / pageLimit)
        }
        else if (filteredData.length > 0 && status === 'Failed Launches') 
        {
            let tempData = getDateFilteredData(filteredData, daterangeFilter, 'Failed')
            currentRecords = (tempData.slice(offSet, offSet + pageLimit))
            totalPages = Math.ceil(tempData.length / pageLimit) 
        }
        let initialValueToSet1;
        if (daterangeFilter.startDate !== null)
        {
            initialValueToSet1 = daterangeFilter.startDate.toString().substring(0, 15) + ' To '  + daterangeFilter.endDate.toString().substring(0, 15)    
        }
        else
        {
            initialValueToSet1 = daterangeFilter.staticDate
        }
        match = {
            path: `/data?daterange=${initialValueToSet1}&status=${status}&pageNumber=:pageNumber`,
            params: {
                daterange: initialValueToSet1,
                statusFilter: statusFilter
            }
        }
    }

    function FilterData(dataRangeFilter, statusFilter)
    {
        setoffSet(0)
        if (dataRangeFilter == null && statusFilter != null)
        {
            setstatusFilter(statusFilter)
        }
        else if (dataRangeFilter != null && statusFilter == null)
        {
            setDateRangeFilter(dataRangeFilter)       
        }
        else
        {
            setstatusFilter(statusFilter)
            setDateRangeFilter(dataRangeFilter) 
        }
    }
    
    function handlePageChange(page)
    {
        console.log(page)
        
        let tempOffSet = (page - 1) * pageLimit
        console.log(tempOffSet)
        setCurrentPage(page)
        setoffSet(tempOffSet)
        
    }
    if (filteredData.length > 0) {
        return (
            <div>
                <Filters currentPage={ currentPage} FilterData={FilterData}/>
                {currentRecords.length > 0} ? <DataTableHelper records={currentRecords} handlePageChange={handlePageChange} filter={status} totalPages={totalPages} match={ match} currentpage={currentPage}/> : <p></p>
            </div>
            
        )
    }
    else {
        return (
            <div className="Loader">
                <Loader />
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
