import React, {Component} from 'react';
import {Pagination} from "react-bootstrap";

class CustomPagination extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {currentPage, totalPages, onPageChange, pages} = this.props
        return (
            <Pagination>
                <Pagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1} />
                {
                    pages.slice(0, 7).map((page, index) => (
                        <Pagination.Item
                            key={`${page}_${index}`}
                            active={index + 1 === currentPage}
                            onClick={() => onPageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))
                }
                {totalPages > 7 && <Pagination.Ellipsis />}
                {totalPages > 7 && (
                    <Pagination.Item onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                )}
                <Pagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages} />
            </Pagination>
        );
    }
}
export default CustomPagination;