import React, {Component} from 'react';
import button from "bootstrap/js/src/button";

class SearchHitForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            keyWordValue:''
        }
    }

    setKeyword= (event) => {
        this.setState({
            keyWordValue:event.target.value
        })
    }

    doSearch=(event) => {
        event.preventDefault();
        this.props.onSearch(this.state.keyWordValue);
    }

    render() {
        return (
            <form onSubmit={this.doSearch}>
                <div className="row container p-2">
                    <div className="col">
                        <input type="text"
                               value={this.state.keyWordValue}
                               onChange={this.setKeyword}
                               className="form-control"
                               placeholder="Keyword"/>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success" type="submit">Search</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchHitForm;