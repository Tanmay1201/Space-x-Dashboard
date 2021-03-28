let DaysNumberMap = new Map();
DaysNumberMap.set('Past Week', 7)
DaysNumberMap.set('Past Month', 30) 
DaysNumberMap.set('Past 3 Months', 90) 
DaysNumberMap.set('Past 6 Months', 180) 
DaysNumberMap.set('Past Year', 365) 
DaysNumberMap.set('Past 2 Years', 365*2) 

let month_number_name_map = new Map();
month_number_name_map.set('Jan', '01')
month_number_name_map.set('Feb', '02') 
month_number_name_map.set('Mar', '03') 
month_number_name_map.set('Apr', '04') 
month_number_name_map.set('May', '05') 
month_number_name_map.set('Jun', '06') 
month_number_name_map.set('Jul', '07') 
month_number_name_map.set('Aug', '08') 
month_number_name_map.set('Sep', '09') 
month_number_name_map.set('Oct', '10') 
month_number_name_map.set('Nov', '11') 
month_number_name_map.set('Dev', '12') 

export const fetchDataByStatus = (data, filter) => {
    let tempData = []
    for (let i = 0; i < data.length; i++)
    {
        if (data[i].launch_status === filter)
        {
            tempData.push(data[i]);
        }
    } 
    return tempData
}

export const getDateFilteredData = (filteredData, dateFilter, statusfilter) => {
    let tempData = []
    console.log(dateFilter)
    if (dateFilter.staticDate != null && dateFilter.startDate == null && dateFilter.endDate == null)
    {
        if (dateFilter.staticDate === 'All')
        {
            if (statusfilter === null)
            {
                return filteredData
            }
            else
            {
                for (let i = 0; i < filteredData.length; i++)
                {
                    if(filteredData[i].launch_status === statusfilter)
                    {
                        tempData.push(filteredData[i])
                    }
                }
            }
            return tempData
        }
        let days = DaysNumberMap.get(dateFilter.staticDate)
        let date = new Date();
        date.setDate(date.getDate() - days);
        let end_Date = new Date(date.toISOString().split('T')[0]);
        if (filteredData.length > 0)
        {
            if (statusfilter === null)
            {
                for (let i = 0; i < filteredData.length; i++)
                {
                    let res = filteredData[i].launch_date_utc.split(" ");
                    let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                    let currentdate = new Date(tempStringDate);
                    if (currentdate > end_Date)
                    {
                        tempData.push(filteredData[i])
                    }
                }
            }
            else
            {
                for (let i = 0; i < filteredData.length; i++)
                {
                    let res = filteredData[i].launch_date_utc.split(" ");
                    let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                    let currentdate = new Date(tempStringDate);
                    if (currentdate > end_Date && filteredData[i].launch_status === statusfilter)
                    {
                        tempData.push(filteredData[i])
                    }
                }
            }
        }      
    }
    else 
    {
        if (dateFilter !== undefined)
        {
            let start_Date = new Date(dateFilter.startDate)
            let end_Date = new Date(dateFilter.endDate)
            if (filteredData.length > 0)
            {
                if (statusfilter === null)
                {
                    for (let i = 0; i < filteredData.length; i++)
                    {
                        let res = filteredData[i].launch_date_utc.split(" ");
                        let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                        let currentdate = new Date(tempStringDate);
                        if (currentdate < end_Date && currentdate > start_Date)
                        {
                            tempData.push(filteredData[i])
                        }
                    }
                }
                else
                {
                    for (let i = 0; i < filteredData.length; i++)
                    {
                        let res = filteredData[i].launch_date_utc.split(" ");
                        let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                        let currentdate = new Date(tempStringDate);
                        if (currentdate < end_Date && currentdate > start_Date && filteredData[i].launch_status === statusfilter)
                        {
                            tempData.push(filteredData[i])
                        }
                    }
                }
            }    
        }
               
    }
    return tempData
}