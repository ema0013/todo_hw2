import React, { Component } from 'react'
import PropTypes from 'prop-types';
import editItem_Transaction from '../../jsTPS/transactions/editItem_Transaction';

export class ItemScreen extends Component {

    state = {
        description:this.props.todoItem === null ? "": this.props.todoItem.description,
        assigned_to:this.props.todoItem === null ? "": this.props.todoItem.assigned_to,
        due_date:this.props.todoItem === null ? "": this.props.todoItem.due_date,
        completed:this.props.todoItem === null ? false: this.props.todoItem.completed
    }

    handleInputChange(event){
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
           [name]:value
       });
       
    }

    submit = () =>{
        var newItem = {
            description:this.state.description,
            assigned_to:this.state.assigned_to,
            due_date:this.state.due_date,
            completed:this.state.completed
        };
        if(this.props.todoItem === null){
            newItem.key = this.props.currentList.items.length;
            this.props.currentList.items.push(newItem);
        }
        else{
            newItem.key = this.props.todoItem.key;
            this.props.tps.addTransaction( new editItem_Transaction(this.props.currentList,newItem,this.props.todoItem));
        }
        this.props.loadList(this.props.currentList);
    }

    render() {
        return (
            <div>
                <h3 id="item_heading">Item</h3>
        <div id="item_form_container">
            <div id="item_description_prompt" className="item_prompt">Description:</div>
            <input id="item_description_textfield" className="item_input" name="description" type="input" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.description}/>
            <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
            <input id="item_assigned_to_textfield" className="item_input" type="input" name="assigned_to" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.assigned_to}/>
            <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
            <input id="item_due_date_picker" className="item_input" type="date" name="due_date" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.due_date}/>
            <div id="item_completed_prompt" className="item_prompt">Completed:</div>
            <input id="item_completed_checkbox" className="item_input" type="checkbox" name="completed" onChange={this.handleInputChange.bind(this)} checked={this.state.completed}/>
        </div>
        <button id="item_form_submit_button" className="item_button"        onClick={this.submit}>Submit</button>
        <button id="item_form_cancel_button" className="item_button"
            onClick={this.props.loadList.bind(this,this.props.currentList)}>Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
