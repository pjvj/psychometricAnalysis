import React,{Component} from 'react';

export default class CreateTest extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            phase1:[{question:"gyugyggugug ",answer:"hbhbhjjhbj"}]
        }
    }
    handleChange=(e)=>{
        console.log(e.target.name);
        let phase  = this.state.phase1;
        let name = e.target.name;
        if(name.split('question').length>1)
        {
            let index = parseInt(name.split('question')[1]);
            phase[index].question=e.target.value;
            
        }
        else if(name.split('answer').length>1)
        {
            let index = parseInt(name.split('answer')[1]);
            phase[index].answer=e.target.value;
            
        }
        else if(name.split("add").length>1)
        {
            phase.push({question:'',answer:''});
           
        }
        else if(name.split('delete').length>1)
        {
            let index = parseInt(name.split('delete')[1]);
            phase=phase.splice(index,1);
            
        }
        this.setState({
            phase:phase
        });
        
    }
    render()
    {
        return(<div>
            <input placeholder="Test Name"></input>
            <input placeholder="Test Description"></input>
            <button name="add" onClick={this.handleChange}>Add Row</button>
            <table>
                <tbody>
                {this.state.phase1.map((value,key)=>{
                    return (<tr  key ={key}>
                        <td><input  name={"question"+key} placeholder="Question" value={value.question} onChange={this.handleChange} /></td>
                        <td><input  name={"answer"+key} placeholder="Answer" value ={value.answer} onChange={this.handleChange}/></td>
                        <td><button name={"delete"+key} onClick={this.handleChange}>Delete</button></td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>);
    }

}