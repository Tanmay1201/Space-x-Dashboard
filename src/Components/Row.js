import './Row.css'

const Row = ({ data, index, handleClick }) => {
    let inputStyle = {

    }
    
    if (data.launch_status === 'Failed')
    {
        inputStyle = {
            backgroundColor: '#ffb3b3',
            borderRadius: '45%',
            color: 'Red', 
            padding: '5%',
            
        }
    }
    else  if (data.launch_status === 'Success')
    {
        inputStyle = {
            backgroundColor: '#b3ffcc',
            borderRadius: '45%',
            color: 'Green', 
            padding: '5%',
        }
    }
    else {
        inputStyle = {
            backgroundColor: '#fff0b3',
            borderRadius: '45%',
            color:'#ff9900', 
            padding: '5%',
        }
    }
    function handleClickRow(e) {
        handleClick(index)
    }
    return (
        <>
            <tr onClick={handleClickRow} className="Row">
                <td>{index + 1}</td>
                <td>{data.launch_date_utc}</td>
                <td id="location">{data.location}</td>
                <td id="mission">{data.mission_name}</td>
                <td>{data.orbit}</td>
                <td ><div id="status" style={inputStyle}>{data.launch_status}</div></td>
                <td>{data.rocket}</td>
            </tr>
            
        </>
    )
}

export default Row