import React , { Component }from 'react';
class TodoListItem extends Component {
    constructor(props) {
        super(props);
    }

    createTasks(item){
        let cl;
        if(item.toggle===true)
        {
            cl=" row list1 list-group-item list-group-item-warning";
        }
        else
        {
            cl="row list1 list-group-item list-group-item";
        }
        return(
            <div>
                <li key={item.key} className={cl}>
                    <div className="col-sm-10"> {item.text}</div>

                </li>
            </div>
        );
    }

    render() {

        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(this.createTasks);
        return (
            <div>
                <ul className="theList">
                    {listItems}
                </ul>
            </div>
        );
    }
}
export default TodoListItem;

