import React, {Component} from 'react';
import axios from "axios";
import {Pagination} from "react-bootstrap";
import HitItem from "./HitItem";
import SearchHitForm from "./SearchHitForm";
import {keyboard} from "@testing-library/user-event/dist/keyboard";
class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hits:[],
            currentPage:1,
            pageSize:10,
            currentKeyword:'Nature',
            totalPages:1,
            pages:[]
        }
    }

    componentDidMount() {
        this.getHits(this.state.currentKeyword);
    }

    getHits(keyword) {
        let url = "https://pixabay.com/api/?key=41457716-b5857a2d5a330eaf201a879d1&q="
            + keyword + "&page=" + this.state.currentPage
            + "&per_page=" + this.state.pageSize;
        axios.get(url).then((response) => {
            let totalP = (response.data.totalHits % this.state.pageSize === 0)
                                    ? response.data.totalHits / this.state.pageSize
                                    : 1 + response.data.totalHits % this.state.pageSize
            this.setState({
                hits:response.data.hits,
                totalPages: totalP,
                pages:new Array(totalP).fill(0),
                currentKeyword:keyword
            });
        }).catch((error => {
            console.log(error);
        }))
    }

    search = (keyword) => {

        this.getHits(keyword);
    }

    goToPage = (page) => {
        this.setState({
            currentPage:page
        }, () => {
            this.getHits(this.state.currentKeyword)
        });

    }
    render() {
        return (
            <div>
                <SearchHitForm onSearch={this.search} />
                <div className="row">
                {
                    this.state.hits.map((hit, index) =>
                        <HitItem hit={hit} key={hit.id}/>
                    )
                }
                </div>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => this.goToPage(this.state.currentPage - 1)}
                        disabled={this.state.currentPage === 1} />
                    {
                        this.state.pages.slice(0, 7).map((page, index) => (
                            <Pagination.Item
                                key={`${page}_${index}`}
                                active={index + 1 === this.state.currentPage}
                                onClick={() => this.goToPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))
                    }
                    {this.state.totalPages > 7 && <Pagination.Ellipsis />}
                    {this.state.totalPages > 7 && (
                        <Pagination.Item onClick={() => this.goToPage(this.state.totalPages)}>
                            {this.state.totalPages}
                        </Pagination.Item>
                    )}
                    <Pagination.Next
                        onClick={() =>this.goToPage(this.state.currentPage + 1)}
                        disabled={this.state.currentPage === this.state.totalPages} />
                </Pagination>

            </div>
        );
    }
}

export default Gallery;