import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        return this.props.todoList.name;
    }
    changeListName = () =>{
        this.props.todoList.name = document.getElementById("list_name_textfield").value;
    }
    getListOwner() {
        return this.props.todoList.owner;
    }
    changeListOwner = () =>{
        this.props.todoList.owner = document.getElementById("list_owner_textfield").value
    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            onChange={this.changeListName}
                            />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield"
                            onChange={this.changeListOwner} 
                            />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} />
            </div>
        )
    }
}

export default ListScreen
