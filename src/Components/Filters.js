import {useState} from 'react'
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import LaunchIcon from '@material-ui/icons/Launch';
import DateFilter from './DateFilter'
import queryString from 'query-string'
import './Filters.css'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
        minWidth: 120,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Filters = (props) => {
    let location = useLocation()
    const { FilterData } = props
    console.log(location)
    const values = queryString.parse(location.search)
    console.log(values)
    let history = useHistory();
    const classes = useStyles();
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
    else if(values.daterange !== undefined)
    {
        tempDateRange = {
            staticDate: values.daterange,
            startDate: null,
            endDate: null
        }
    }
    let initialValueToSet;
    if (tempDateRange.startDate !== null)
    {
        initialValueToSet = tempDateRange.startDate.toString().substring(0, 15) + ' To '  + tempDateRange.endDate.toString().substring(0, 15)    
    }
    else
    {
        initialValueToSet = tempDateRange.staticDate
    }
    const [CurrentSelectedTimePeriod, setCurrentSelectedTimePeriod] = useState((values.daterange !== undefined) ? initialValueToSet : 'All')
    const [openModal, setOpenModal] = useState(false)
    const [statusFilter, setstatusFilter] = useState(values.status)
    const handleChange = (event) => {
        setstatusFilter(event.target.value);
        FilterData(null,event.target.value)
        if (event.target.value === '')
        {
            history.push('/data');
        }
        else
        {
            if (CurrentSelectedTimePeriod !== 'All') {
                if (CurrentSelectedTimePeriod.staticDate != null)
                {
                    history.push(`/data?daterange=${CurrentSelectedTimePeriod.staticDate}&status=${event.target.value}`);
                }
                else
                {
                    console.log(CurrentSelectedTimePeriod)
                    history.push(`/data?daterange=${CurrentSelectedTimePeriod}&status=${event.target.value}`);
                }
            }
            else {
                history.push(`/data/?status=${event.target.value}`);
            }
        }
    };
    function handleTimePeriodChange(){
        setOpenModal(true)
    }
    function closeModal()
    {
        setOpenModal(false)
    }
    function handleCustomRange(startDate, endDate)
    {
        let dateRange = {
            staticDate: null,
            startDate: startDate,
            endDate: endDate
        }
        FilterData(dateRange, null)
        setCurrentSelectedTimePeriod(startDate.toString().substring(0, 15) + ' To '  + endDate.toString().substring(0, 15))
        console.log(startDate.toString().substring(0, 15))
        if (statusFilter !== undefined)
        {
            history.push(`/data?daterange=${startDate.toString().substring(0, 15)} To ${endDate.toString().substring(0, 15)}&status=${statusFilter}`);
        }
        else
        {
            history.push(`/data/?daterange=${startDate.toString().substring(0, 15)} To ${endDate.toString().substring(0, 15)}`);
        }
    }

    function handleDateFilter(filter)
    {
        let dateRange = {
            staticDate: filter,
            startDate: null,
            endDate: null
        }
        FilterData(dateRange,null)
        setCurrentSelectedTimePeriod(filter)
        if (statusFilter !== undefined)
        {
            history.push(`/data?daterange=${dateRange.staticDate}&status=${statusFilter}`);
        }
        else
        {
            history.push(`/data/?daterange=${filter}`);
        }        
    }
    return (
        <div className='Filters'>
                        <div className='Calender'>
                            <CalendarTodayOutlinedIcon fontSize='default' color='action' id='calenderIcon'/>
                            <span id='name'>{CurrentSelectedTimePeriod}</span>
                            <LaunchIcon fontSize='inherit' color='secondary' id='launchIcon' onClick={handleTimePeriodChange} />
                            <DateFilter openModal={openModal} closeModal={closeModal} handleDateFilter={handleDateFilter} handleCustomRange={handleCustomRange }></DateFilter>
                        </div>
                        <div className='StatusFilter'>
                            <FilterListOutlinedIcon fontSize='large' color='action' id='statusIcon'/>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-placeholder-label-label">
                                    All Launches
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={values.status}
                                onChange={handleChange}
                                displayEmpty
                                className={classes.selectEmpty}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Upcoming Launches'}>Upcoming Launches</MenuItem>
                                <MenuItem value={'Successful Launches'}>Successful Launches</MenuItem>
                                <MenuItem value={'Failed Launches'}>Failed Launches</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
        </div>
    )
}

export default Filters