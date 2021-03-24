var DaysNumberMap = new Map();
DaysNumberMap.set('Past Week', 7)
DaysNumberMap.set('Past Month', 30) 
DaysNumberMap.set('Past 3 Months', 90) 
DaysNumberMap.set('Past 6 Months', 180) 
DaysNumberMap.set('Past Year', 365) 
DaysNumberMap.set('Past 2 Years', 365*2) 

var month_number_name_map = new Map();
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
    var tempData = []
    for (var i = 0; i < data.length; i++)
    {
        if (data[i].launch_status === filter)
        {
            tempData.push(data[i]);
        }
    } 
    return tempData
}

export const getDateFilteredData = (filteredData, dateFilter, statusfilter) => {
    var tempData = []
    var days = DaysNumberMap.get(dateFilter)
    console.log('This is days' + days)
    var date = new Date();
    date.setDate(date.getDate() - days);
    var endDate = new Date(date.toISOString().split('T')[0]);
    console.log('this is enddate' + endDate)
    if (filteredData.length > 0)
    {
        console.log(statusfilter)
        if (statusfilter === null)
        {
            for (var i = 0; i < filteredData.length; i++)
            {
                let res = filteredData[i].launch_date_utc.split(" ");
                console.log('this is status date' + res)
                let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                console.log('this is tempstringdate' + tempStringDate)
                let currentdate = new Date(tempStringDate);
                console.log('this is current date' + currentdate)
                if (currentdate > endDate)
                {
                    tempData.push(filteredData[i])
                }
            }
        }
        else
        {
            for (var i = 0; i < filteredData.length; i++)
            {
                let res = filteredData[i].launch_date_utc.split(" ");
                console.log('this is status date' + res)
                let tempStringDate = res[2] + '-' + month_number_name_map.get(res[1]) + '-' + res[0]
                console.log('this is tempstringdate' + tempStringDate)
                let currentdate = new Date(tempStringDate);
                console.log('this is current date' + currentdate)
                if (currentdate > endDate && filteredData[i].launch_status === statusfilter)
                {
                    tempData.push(filteredData[i])
                }
            }
        }
    }
    return tempData
}