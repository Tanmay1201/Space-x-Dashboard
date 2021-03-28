export function Extract_Table_Data(state){
    let extracted_data = []
    let tempDataObj = null
    for (let i = 0; i < state.FetchLaunchData.length; i++)
    {
        tempDataObj = {
            mission_name: state.FetchLaunchData.data[i].mission_name
        }
        extracted_data.push(tempDataObj)
    }
}
