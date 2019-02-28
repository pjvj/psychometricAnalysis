import React, {Component} from "react";
import ButtonItem from './buttons';
import TodoListItem from './TodoListItem';

class TodoList extends Component {
    constructor(props) {
        super(props);
        let i = 1;
        this.state = {
            items: [
                /*{"text": "Buy new sweatshirt", "key": i++, "toggle": false},
                {"text": "Begin promotional phase", "key": i++, "toggle": false},
                {"text": "Read an article", "key": i++, "toggle": false},
                {"text": "Try not to fall asleep", "key": i++, "toggle": false},
                {"text": "Watch Sherlock", "key": i++, "toggle": false},
                {"text": "Begin QA for the product", "key": i++, "toggle": false},
                {"text": "Propose the one you love", "key": i, "toggle": false}*/
            ]
        };


        let from = JSON.parse(localStorage.getItem('object'));
        if (from !== null && from !== undefined) {
            this.state = {
                items: from
            };
        }
        else
            localStorage.setItem('object', JSON.stringify(this.state.items));
        console.log("ye uper h");
        console.log(this.state.items);
        this.addItem = this.addItem.bind(this);
    }


    addItem(term) {
        if (term !== "") {

            let newItem = {
                "text": term,
                "key": Date.now(),
                "toggle": false
            };

            let userdata = JSON.parse(localStorage.getItem('object'));
            userdata.push(newItem);
            let data = userdata;

            this.setState({items: data});
            localStorage.setItem('object', JSON.stringify(data));
            console.log("ye neeche h");
            console.log(this.setState({items: data}));
            this.inputElement.value = "";
        }
    }


    triggerChange(event) {

        if (event.key === 'Enter')
            this.addItem(document.getElementById('save1').value);
    }

    render() {

        let today = new Date();
        let month = today.getMonth();
        if (month === 0)
            month = "Jan";
        else if (month === 1)
            month = "Feb";
        else if (month === 2)
            month = "Mar";
        else if (month === 3)
            month = "Apr";
        else if (month === 4)
            month = "May";
        else if (month === 5)
            month = "Jun";
        else if (month === 6)
            month = "Jul";
        else if (month === 7)
            month = "Aug";
        else if (month === 8)
            month = "Sep";
        else if (month === 9)
            month = "Oct";
        else if (month === 10)
            month = "Nov";
        else if (month === 11)
            month = "Dec";

        let day = today.getDay();
        if (day === 1)
            day = "Monday";
        else if (day === 2)
            day = "Tuesday";
        else if (day === 3)
            day = "Wednesday";
        else if (day === 4)
            day = "Thursday";
        else if (day === 5)
            day = "Friday";
        else if (day === 6)
            day = "Saturday";
        else if (day === 7)
            day = "Sunday";

        return (
            <div className="card">
                <div className="row">

                    <div className="dated col-md-6">
                        <div className="date col-md-3">
                            {today.getDate()}
                        </div>
                        <div className="monthyear col-md-3">
                            <div className="row">{month}</div>
                            <div className="row">{today.getFullYear()}</div>
                        </div>
                        <div className="day col-md-3">{day}</div>
                    </div>
                </div>

                <div className="card-body">
                    <h3 className="card-title">My List : </h3>
                </div>
                <div className="container">
                    <ul className="list-group">
                        <div className="row">
                            <div className="col-sm-9">
                                <TodoListItem entries={this.state.items}/></div>
                            <div className="col-sm-2">
                                <ButtonItem entries={this.state.items} onChangeToggle={(item) => {

                                    let current = item;
                                    let currentState = this.state.items;
                                    //console.log(state);
                                    for (let i = 0; i < currentState.length; i++) {
                                        if (currentState[i]["key"] === current) {
                                            let newToggle = currentState[i]["toggle"];
                                            newToggle = !(newToggle);
                                            currentState[i]["toggle"] = newToggle;
                                        }
                                    }
                                    this.setState({items: currentState});
                                    console.log("toggle change");
                                    console.log(this.state.items);

                                }}/>
                            </div>
                        </div>
                    </ul>
                </div>
                <div>
                    <input className="input1" id="save1" ref={(a) => this.inputElement = a}
                           placeholder="enter task" onKeyPress={(event) => this.triggerChange(event)}/>
                </div>

                <div className="card-body">
                    <button className="btn btn-warning"
                            onClick={() => this.addItem(document.getElementById('save1').value)}>Add
                    </button>
                </div>

            </div>

        );
    }
}

export default TodoList;

