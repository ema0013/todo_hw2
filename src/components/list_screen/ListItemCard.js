import React, { Component } from 'react'

export class ListItemCard extends Component {
    getCompletedDiv = () =>{
        return(
        this.props.listItem.completed ?
        <div className='list_item_card_completed'>
            Completed
        </div>
        :
        <div className='list_item_card_not_completed'>
            Pending
        </div>
        )
    }

    createUpDiv = () =>{
        return(
            this.props.itemIndex === 0 ?
            <div className='disabled list_item_card_up' 
            onClick={(event) => this.props.moveItemUp(event,this.props.itemIndex)}>
                &#x2191;
            </div>  
            :
            <div className='list_item_card_up' 
            onClick={(event) => this.props.moveItemUp(event,this.props.itemIndex)}>
                &#x2191;
            </div>  
        )
    }

    createDownDiv = () =>{
        return(
            this.props.itemIndex >= this.props.listLength - 1 ?
            <div className='disabled list_item_card_down' 
            onClick={(event) => this.props.moveItemDown(event,this.props.itemIndex)}>
                &#x2193;
            </div>  
            :
            <div className='list_item_card_down'
            onClick={(event) => this.props.moveItemDown(event,this.props.itemIndex)} >
                &#x2193;
            </div>  
        )
    }

    render() {
        return (
            <div className='list_item_card' onClick={this.props.editItem.bind(this,this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.getCompletedDiv()}
                {this.createUpDiv()}
                {this.createDownDiv()}
                <div className='list_item_card_delete' 
                onClick={(event) => this.props.deleteCurrentItem(event,this.props.itemIndex)}>
                    &#xd7;
                </div>
            </div>
        )
    }
}

export default ListItemCard
