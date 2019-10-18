import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import ItemDown_Transaction from '../../jsTPS/transactions/ItemDown_Transaction'
import ItemUp_Transaction from '../../jsTPS/transactions/ItemUp_Transaction'
import ItemDelete_Transaction from '../../jsTPS/transactions/ItemDelete_Transaction'

export class ListItemsTable extends Component {
    state = {
        currentSortingCriteria: null
    }

    sortByTask = () =>{
        this.state.currentSortingCriteria === 'increasingTaskSort' ? 
        this.setState({currentSortingCriteria: 'decreasingTaskSort'},this.sortItems)
        :
        this.setState({currentSortingCriteria: 'increasingTaskSort'},this.sortItems);
    }
    sortByDate = () =>{
        this.state.currentSortingCriteria === 'increasingDateSort' ? 
        this.setState({currentSortingCriteria: 'decreasingDateSort'},this.sortItems)
        :
        this.setState({currentSortingCriteria: 'increasingDateSort'},this.sortItems);
    }
    sortByCompleted = () =>{
        this.state.currentSortingCriteria === 'increasingCompleteSort' ? 
        this.setState({currentSortingCriteria: 'decreasingCompleteSort'},this.sortItems)
        :
        this.setState({currentSortingCriteria: 'increasingCompleteSort'},this.sortItems);
    }

    sortItems = () =>{
        this.props.todoList.items.sort(this.compare);
        this.setState({currentSortingCriteria:this.state.currentSortingCriteria});
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

    deleteCurrentItem = (event,currentIndex) =>{
        event.stopPropagation();
        this.props.tps.addTransaction(new ItemDelete_Transaction(this.props.todoList, currentIndex));
        this.setState({currentSortingCriteria:this.state.currentSortingCriteria});
    }

    moveItemUp = (event,currentIndex) =>{
        event.stopPropagation();
        this.props.tps.addTransaction(new ItemUp_Transaction(this.props.todoList, currentIndex));
        this.setState({currentSortingCriteria:this.state.currentSortingCriteria});
    }

    moveItemDown = (event,currentIndex) =>{
        event.stopPropagation();
        this.props.tps.addTransaction(new ItemDown_Transaction(this.props.todoList,currentIndex));
        this.setState({currentSortingCriteria:this.state.currentSortingCriteria});
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
                            itemIndex={this.props.todoList.items.indexOf(todoItem)}
                            listItem={todoItem}
                            listLength={this.props.todoList.items.length}
                            deleteCurrentItem={this.deleteCurrentItem.bind(this)} 
                            moveItemUp={this.moveItemUp.bind(this)}
                            moveItemDown={this.moveItemDown.bind(this)}
                            editItem={this.props.editItem}
                            tps={this.props.tps}/>
                    ))
                }
                <div id="list_item_add" className="list_item_add_card"
                    onClick={this.props.goItemScreen}>
                    +
                </div>
            </div>
        )
    }
}

export default ListItemsTable
