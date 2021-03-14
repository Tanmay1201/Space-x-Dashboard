export function Extract_Table_Data(state){
    var extracted_data = []
    var tempDataObj = null
    for (var i = 0; i < state.FetchLaunchData.length; i++)
    {
        tempDataObj = {
            mission_name: state.FetchLaunchData.data[i].mission_name
        }
        extracted_data.push(tempDataObj)
    }
}
