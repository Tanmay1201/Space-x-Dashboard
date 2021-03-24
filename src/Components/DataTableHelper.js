import { indexfetch } from '../Actions/Index_Selection_Action'
import { useEffect} from 'react'
import { connect } from "react-redux"
import Row from './Row'
import Pagination from 'react-router-pagination'
import { useHistory, useParams } from "react-router-dom";
import './DataTableHelper.css'

const DataTableHelper = ({ records, updateIndex, handlePageChange, totalPages, match, currentpage }) => {
    
    
    var pageNumber = currentpage
    useEffect(() => {
        console.log("value of 'match' changed to", match);
    }, [match]);

    function handleRowClick(e) {
        updateIndex(e)
    }
    let history = useHistory();
    let params = useParams();
    function handlePageClick(page) {
        
        
        let url = `/data/status/${params.status}/${page}`
        console.log(url)
        history.push(url);
        handlePageChange(page)
    }
    
    return (
        <div>
            <div className="data_table">
                <table>
                    <tr>
                        <th>No:</th>
                        <th>Launched(UTC)</th>
                        <th className="Location">Location</th>
                        <th className="Mission">Mission</th>
                        <th>Orbit</th>
                        <th>Launch Status</th>
                        <th>Rocket</th>
                    </tr> 
                    
                        {
                            records && records.map((data,index) => (
                                <Row data={data} index={index} handleClick={ handleRowClick}/>
                            ))
                        }
                </table>   
            </div>
            <div className='Paginate'>
                <Pagination match={match} totalPages={totalPages} pageNumber={pageNumber} spread={3} onClick={ handlePageClick}/>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateIndex: (e) => dispatch(indexfetch(e))
    }
}


export default  connect(null, mapDispatchToProps)(DataTableHelper)