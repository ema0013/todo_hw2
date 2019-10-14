import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import { tsImportEqualsDeclaration } from '@babel/types';

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
                <ListTrash showDialog = {this.props.showDialog}/>
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
                <ListItemsTable todoList={this.props.todoList} 
                    goItemScreen={this.props.goItemScreen}
                    editItem={this.props.editItem}/>
                <div className="modal" id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                    <div className="modal_dialog">
                        <header className="dialog_header">
                            Delete list?
                        </header>
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                        </section>
                            <button id='dialog_yes_button'
                            onClick={this.props.deleteCurrentList}
                            >Yes</button>
                            <button id="dialog_no_button" 
                            onClick={this.props.hideDialog}>No</button>
                        <footer className='dialog_footer'>
                            The list will not be retreivable.
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListScreen
