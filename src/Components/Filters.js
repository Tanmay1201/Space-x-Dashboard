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
    const { FilterData, filterValueURL } = props
    console.log(location)
    const values = queryString.parse(location.search)
    console.log(values)
    let history = useHistory();
    const classes = useStyles();
    const [CurrentSelectedTimePeroid, setCurrentSelectedTimePeroid] = useState((values.daterange !== undefined) ? values.daterange : 'All')
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
            if (CurrentSelectedTimePeroid !== 'All') {
                history.push(`/data?daterange=${CurrentSelectedTimePeroid}&status=${event.target.value}`);
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
    function handleDateFilter(filter)
    {
        FilterData(filter,null)
        setCurrentSelectedTimePeroid(filter)
        if (statusFilter !== undefined)
        {
            history.push(`/data?daterange=${filter}&status=${statusFilter}`);
        }
        else
        {
            history.push(`/data/?daterange=${filter}`);
        }        
    }
    return (
        <div className='Filters'>
                        <div className='Calender'>
                            <CalendarTodayOutlinedIcon fontSize='medium' color='action' id='calenderIcon'/>
                            <span id='name'>{CurrentSelectedTimePeroid}</span>
                            <LaunchIcon fontSize='inherit' color='action' id='launchIcon' onClick={handleTimePeriodChange} />
                            <DateFilter openModal={openModal} closeModal={closeModal} handleDateFilter={handleDateFilter }></DateFilter>
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