import CancelIcon from '@material-ui/icons/Cancel';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './DateFilter.css'
const DateFilter = ({ openModal, closeModal,handleDateFilter }) => {
    var allStaticilters = [];
    allStaticilters.push('Past Week')
    allStaticilters.push('Past Month')
    allStaticilters.push('Past 3 Months')
    allStaticilters.push('Past 6 Months')
    allStaticilters.push('Past Year')
    allStaticilters.push('Past 2 Years')

    function handleClose()
    {
        closeModal(false)
    }
    function setDateFilter(data) {
        handleDateFilter(data)
        closeModal(false)
    }
    if (openModal)
    {
        return (
        <div className='filter display-block'>
            <div className="filter-main">
                <div className='StandardFilter'> 
                    {
                            allStaticilters && allStaticilters.map((data, index) => (
                                <span onClick={() => setDateFilter(data)}>{ data }</span>  
                        ))
                    }
                            
                </div>
                <hr />
                    <div className='CustomFilter'>
                        <Calendar className='Calender1'/>
                        <Calendar className='Calender1'/>
                    <CancelIcon color='secondary' onClick={handleClose} className='closeIcon' />  
                </div>
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