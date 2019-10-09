import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    state = {
        currentSortingCriteria: null
    }

    sortByTask = () =>{
        this.state.currentSortingCriteria === 'increasingTaskSort' ? 
        this.setState({currentSortingCriteria: 'decreasingTaskSort'})
        :
        this.setState({currentSortingCriteria: 'increasingTaskSort'});
        this.sortItems();
    }
    sortByDate = () =>{
        this.state.currentSortingCriteria === 'increasingDateSort' ? 
        this.setState({currentSortingCriteria: 'decreasingDateSort'})
        :
        this.setState({currentSortingCriteria: 'increasingDateSort'});
        this.sortItems();
    }
    sortByCompleted = () =>{
        this.state.currentSortingCriteria === 'increasingCompleteSort' ? 
        this.setState({currentSortingCriteria: 'decreasingCompleteSort'})
        :
        this.setState({currentSortingCriteria: 'increasingCompleteSort'});
        this.sortItems();
    }

    sortItems = () =>{
        this.props.todoList.items.sort(this.compare);
    }

    compare = (item1, item2) =>{
        if(this.state.currentSortingCriteria === 'decreasingTaskSort' ||
            this.state.currentSortingCriteria === 'decreasingDateSort' ||
            this.state.currentSortingCriteria === 'decreasingCompleteSort'){
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if(this.state.currentSortingCriteria === 'decreasingTaskSort' ||
            this.state.currentSortingCriteria === 'increasingTaskSort'){
                if (item1.description < item2.description){
                    return -1;
                }
                else if (item1.description > item2.description){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        if(this.state.currentSortingCriteria === 'decreasingDateSort' ||
            this.state.currentSortingCriteria === 'increasingDateSort'){
                if (item1.due_date < item2.due_date){
                    return -1;
                }
                else if (item1.due_date > item2.due_date){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        else if (this.state.currentSortingCriteria === 'decreasingCompleteSort' || 
        this.state.currentSortingCriteria === 'increasingCompleteSort'){
            if(item1.completed < item2.completed){
                return -1;
            }
            else if (item1.completed > item2.completed){
                return 1;
            }
            else{
                return 0;
            }
        }
    }

    render() {
        return (
            <div id="list_items_container" className = "list_item_header_card">
                <div className="list_item_header_card"></div>
                <div className="list_item_task_header"
                    onClick={this.sortByTask}>
                        Task</div>
                <div className="list_item_due_date_header"
                    onClick={this.sortByDate}>
                    Due Date</div>
                <div className="list_item_status_header"
                    onClick={this.sortByCompleted}>
                    Status</div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            listLength={this.props.todoList.items.length} />
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
