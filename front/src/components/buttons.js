import React, {Component} from 'react';

class ButtonItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeToggle=this.props.onChangeToggle.bind(this);
    }

    render() {

        let todoEntries = this.props.entries;
        let buttonItems = todoEntries.map((item) =>{
            let cl;
            if(item.toggle===true)
            {
                cl="button2";
            }
            else
            {
                cl="button1";
            }
            return(
                <div>
                    <li>
                        <button key={item.key} className={cl} onClick={()=>{this.props.onChangeToggle(item.key)}}/>
                    </li>
                </div>
            );
        });
        return (
            <div>
                <ul className="theList">
                    {buttonItems}
                </ul>
            </div>

        );
    }
}
export default ButtonItem;