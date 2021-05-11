import {useState} from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './DateFilter.css'
const DateFilter = ({ openModal, closeModal, handleDateFilter, handleCustomRange }) => {
    const [CustomStartDate, setCustomStartDate] = useState(new Date())
    const [CustomEndDate, setCustomEndDate] = useState(new Date())
    let allStaticFilters = [];
    allStaticFilters.push('All')
    allStaticFilters.push('Past Week')
    allStaticFilters.push('Past Month')
    allStaticFilters.push('Past 3 Months')
    allStaticFilters.push('Past 6 Months')
    allStaticFilters.push('Past Year')
    allStaticFilters.push('Past 2 Years')

    function handleClose()
    {
        closeModal(false)
    }
    function setDateFilter(data) {
        handleDateFilter(data)
        closeModal(false)
    }
    function setStartDate(startDay)
    {
        setCustomStartDate(startDay)
    }
    function setEndDate(endDay)
    {
        setCustomEndDate(endDay)
    }
    function handleCustomDateRangeChange()
    {
        handleCustomRange(CustomStartDate, CustomEndDate);
        closeModal(false)
    }
    if (openModal)
    {
        return (
        <div className='filter display-block'>
            <div className="filter-main">
                <div className='StandardFilter'> 
                    {
                            allStaticFilters && allStaticFilters.map((data) => (
                                <span onClick={() => setDateFilter(data)}>{ data }</span>  
                        ))
                    }
                </div>
                <hr />
                
                    <div className='CustomFilter'>
                        <div>
                        <div className='headerD'>
                            <div>
                                <h3>SELECT DATE RANGES MANUALLY</h3>
                            </div>
                            <div className='SetRange'>
                                <Button variant="contained" color="primary" onClick={handleCustomDateRangeChange}>
                                    Apply Date Range
                                </Button>
                            </div>
                                
                            </div>
                            
                            <div className='CalenderD'>
                                <Calendar className='CalenderStart' value={CustomStartDate } onClickDay={(day) => setStartDate(day)} />
                                <hr />
                                <Calendar className='CalenderEnd' value={CustomEndDate } onClickDay={(day) => setEndDate(day)} />
                            </div>
                            
                        </div>
                       
                    </div>
                    <div><CancelIcon color='secondary' onClick={handleClose} className='closeIcon' />  </div> 
            </div>
        </div>
    )
    }
    else
    {
        return null
    }
}

export default DateFilter