import { indexfetch } from '../Actions/Index_Selection_Action'
import { connect } from "react-redux"
import Row from './Row'
import Pagination from 'react-router-pagination'
import { useHistory, useParams } from "react-router-dom";
import './DataTableHelper.css'

const DataTableHelper = ({ records, updateIndex, handlePageChange, totalPages, match, currentpage }) => {
    
    
    let pageNumber = currentpage

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
                    <thead>
                    <tr>
                        <th style={{width:'20px'}}>No:</th>
                        <th style={{width:'20px'}}>Launched(UTC)</th>
                        <th style={{width:'20px'}} className="Location">Location</th>
                        <th style={{width:'20px'}} className="Mission">Mission</th>
                        <th style={{width:'20px'}}>Orbit</th>
                        <th style={{width:'20px'}}>Launch Status</th>
                        <th style={{width:'20px'}}>Rocket</th>
                    </tr> 
                    </thead>
                    <tbody>
                        {
                            records && records.map((data,index) => (
                                <Row data={data} key={ index}index={index} handleClick={ handleRowClick}/>
                            )) 
                        }
                    </tbody>
                </table>   
            </div>
            
            {
                records.length === 0 ? <div className='NoData'><span>No Results found for the specifies filter</span></div>: ''
                }
                
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