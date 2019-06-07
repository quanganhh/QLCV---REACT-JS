import React, { Component } from 'react';

class Sort extends Component {
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" aria-haspopup="true" 
                            aria-expanded="false"
                        
                        >
                        Sắp xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a role="button" className="sort-selected">
                                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <br/>
            </div>
        );
    }
}
export default Sort;
