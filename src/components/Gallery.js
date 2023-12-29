import React, {Component} from 'react';
import axios from "axios";
import {Pagination} from "react-bootstrap";
import HitItem from "./HitItem";
import SearchHitForm from "./SearchHitForm";
import CustomPagination from "./CustomPagination";

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
        const PIXABAY_API_KEY = '41457716-b5857a2d5a330eaf201a879d1';
        let url = "https://pixabay.com/api/?key=" + PIXABAY_API_KEY + "&q="
            + keyword + "&page=" + this.state.currentPage
            + "&per_page=" + this.state.pageSize;
        axios.get(url).then((response) => {
            let totalP = (response.data.totalHits % this.state.pageSize === 0)
                                    ? response.data.totalHits / this.state.pageSize
                                    : 1 + Math.floor(response.data.totalHits / this.state.pageSize);

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
            this.setState({
                currentPage:1,
                pages:[]
            }, () => {
                this.getHits(keyword);
            })

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
                <CustomPagination
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}
                    onPageChange={this.goToPage}
                    pages={this.state.pages}
                />

            </div>
        );
    }
}

export default Gallery;