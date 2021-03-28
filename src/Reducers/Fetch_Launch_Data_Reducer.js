import { DATA_FETCH_FAILURE, DATA_FETCH_REQUEST, DATA_FETCH_SUCCESS } from "../Actions/ActionTypes"

const initialState = {
    loading: false,
    data: [],
    error: []
}
let month_number_name_map = new Map();
month_number_name_map.set('01', 'Jan')
month_number_name_map.set('02', 'Feb') 
month_number_name_map.set('03', 'Mar') 
month_number_name_map.set('04', 'Apr') 
month_number_name_map.set('05', 'May') 
month_number_name_map.set('06', 'Jun') 
month_number_name_map.set('07', 'Jul') 
month_number_name_map.set('08', 'Aug') 
month_number_name_map.set('09', 'Sep') 
month_number_name_map.set('10', 'Oct') 
month_number_name_map.set('11', 'Nov') 
month_number_name_map.set('12','Dev') 

const Fetch_Launch_Data = (state = initialState, action) => {
    switch (action.type) {
        case DATA_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DATA_FETCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: []
            }
        case DATA_FETCH_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state
    }   
}

const Extract_Table_Data = (state) => {
    let extracted_data = []
    let tempDataObj = null
    let temp = state.FetchLaunchData.data
    if (temp != null)
    {
        for (let i = 0; i < temp.length; i++)
        {
            let date = temp[i].launch_date_utc.substring(8, 10);
            if (month_number_name_map.has(temp[i].launch_date_utc.substring(5, 7)))
            {
                date += ' '+month_number_name_map.get(temp[i].launch_date_utc.substring(5, 7))    
            }
            date += ' '+temp[i].launch_date_utc.substring(0, 4)
            date += ' at'
            date += ' '+temp[i].launch_date_utc.substring(11, 16)

            let launchStatus = '';
            if (temp[i].upcoming === false)
            {
                if (temp[i].launch_success === false)  
                {
                    launchStatus = 'Failed'
                }    
                else
                {
                    launchStatus = 'Success'    
                }
            }
            else
            {
                launchStatus = 'Upcoming'    
            }
            tempDataObj = {
                number: i+1,
                mission_name: temp[i].mission_name,
                launch_date_utc: date,
                location: temp[i].launch_site.site_name,
                orbit: temp[i].rocket.second_stage.payloads[0].orbit,
                launch_status: launchStatus,
                rocket: temp[i].rocket.rocket_name
            }
            extracted_data.push(tempDataObj)
        }
    }
    return extracted_data;
}

const Extract_Modal_Data = (state) => {
    let extracted_data = []
    let tempDataObj = null
    let temp = state.FetchLaunchData.data
    if (temp != null)
    {
        for (let i = 0; i < temp.length; i++)
        {
            let date = temp[i].launch_date_utc.substring(8, 10);
            if (month_number_name_map.has(temp[i].launch_date_utc.substring(5, 7)))
            {
                date += ' '+month_number_name_map.get(temp[i].launch_date_utc.substring(5, 7))    
            }
            date += ' '+temp[i].launch_date_utc.substring(0, 4)
            date += ' '+temp[i].launch_date_utc.substring(11, 16)

            let launchStatus = '';
            if (temp[i].upcoming === false)
            {
                if (temp[i].launch_success === false)  
                {
                    launchStatus = 'Failed'
                }    
                else
                {
                    launchStatus = 'Success'    
                }
            }
            else
            {
                launchStatus = 'Upcoming'    
            }
            tempDataObj = {
                launch_status: launchStatus,
                wikipedia_link: temp[i].links.wikipedia,
                article_link: temp[i].links.article_link,
                video_link: temp[i].links.video_link,
                details: temp[i].details,
                flight_number: temp[i].flight_number,
                mission_name: temp[i].mission_name,
                rocket_type: temp[i].rocket.rocket_type,
                rocket_name: temp[i].rocket.rocket_name,
                manufacturer: temp[i].rocket.second_stage.payloads[0].manufacturer,
                nationality: temp[i].rocket.second_stage.payloads[0].nationality,
                launch_date_utc: date,
                payload_type: temp[i].rocket.second_stage.payloads[0].payload_type,
                orbit: temp[i].rocket.second_stage.payloads[0].orbit,
                launch_site: temp[i].launch_site.site_name
                
            }
            extracted_data.push(tempDataObj)
        }
    }
    return extracted_data;
}

export  {Fetch_Launch_Data, Extract_Table_Data, Extract_Modal_Data};

