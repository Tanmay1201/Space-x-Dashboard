import {useState} from 'react'
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Filters = ({FilterData}) => {
    const classes = useStyles();
    const [statusFilter, setstatusFilter] = useState('')
    const handleChange = (event) => {
        setstatusFilter(event.target.value);
        console.log(event.target.value)
        FilterData(event.target.value)
    };

    return (
        <div className='Filters'>
                        <div>
                            <CalendarTodayOutlinedIcon fontSize='small' color='action' />
                        </div>
                        <div>
                            <FilterListOutlinedIcon fontSize='large' color='action' />
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                    Launches
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-placeholder-label-label"
                                id="demo-simple-select-placeholder-label"
                                value={statusFilter}
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