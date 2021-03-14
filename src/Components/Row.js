const Row = ({ data, index }) => {
    
    let inputStyle = {

    }
    
    if (data.launch_status === 'Failed')
    {
        
    }
    return (
        <>
            <tr>
                <td>{ index+1}</td>
                    <td>{data.mission_name}</td>
                
                <td>{data.launch_date_utc}</td>
                 <td>{data.location}</td>
                 <td>{data.orbit}</td>
                 <td className="status">{data.launch_status}</td>
                         <td>{data.rocket}</td>
                    </tr>
        </>
    )
}

export default Row