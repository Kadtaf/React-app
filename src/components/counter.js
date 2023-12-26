import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            counter:1,
            list:[0]
        }
    }

    compute=(op) => {
        let sign = op === '+' ? 1 : -1;
        if (this.state.counter === 1 && op === '-') sign = 0;
        let c = this.state.counter + sign;
        this.setState({
            counter: c,
            list:new Array(c).fill(0)
        });
        console.log(this.state.counter);
    }

    render() {
        return (
            <div className='card m-3'>
                <div className='card-header'>
                    <strong>
                        {this.props.title?this.props.title : 'Default title'} : {this.state.counter}
                    </strong>
                </div>
                <div className='card-body'>
                    {
                        this.state.list.map((v, index) =>
                            <span key={`${v}_${index}`}>
                                {index}
                                <img className="m-2" width={100} src={this.props.image ? this.props.image : "images/zen5.jpg"} alt={this.props.title}/>
                            </span>

                        )
                    }
                </div>
                <div className="m-auto">
                    <button onClick={() => this.compute('+')} className="btn btn-dark m-2">+</button>
                    <button onClick={() => this.compute('-')} className="btn btn-dark m-2">-</button>
                </div>
            </div>
        )
    }
}

export default Counter;