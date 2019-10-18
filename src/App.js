import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jsTPS/jsTPS.js';

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    dialogVisible:false,
    todoItem:null,
    tps: new jsTPS()
  }

  showDialog = () =>{
    let dialog = document.getElementById("modal_yes_no_dialog");
    dialog.classList.add("is_visible");
    this.setState({dialogVisible:true});
  }
  hideDialog = () =>{
    let dialog = document.getElementById("modal_yes_no_dialog");
    dialog.classList.remove("is_visible");
    this.setState({dialogVisible:false});
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN},()=>this.state.tps.clearAllTransactions());
    this.setState({currentList: null},()=>console.log(this.state.tps.toString()));
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN}, () => {console.log(this.state.currentScreen)});
    this.setState({currentList: todoListToLoad}, () => {console.log(this.state.currentList)});
    
  }

  deleteCurrentList = () =>{
    let indexOfListToRemove = this.state.todoLists.indexOf(this.state.currentList);
    if(indexOfListToRemove >= 0)
      this.state.todoLists.splice(indexOfListToRemove,1);
    this.setState({todoLists:this.state.todoLists},this.goHome);
  }

  goItemScreen = () => {
    // this one is called for a new item
    this.setState({todoItem:null});
    this.setState({currentScreen:AppScreen.ITEM_SCREEN});
    
  }

  editItem = (itemtoEdit) =>{
    // this one is called for editing items
    this.setState({currentScreen:AppScreen.ITEM_SCREEN});
    this.setState({todoItem:itemtoEdit});
  }

  undoTransaction(){
    this.state.tps.undoTransaction();
    this.setState({tps:this.state.tps});
  }

  redoTransaction(){
    this.state.tps.doTransaction();
    this.setState({tps:this.state.tps});
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          deleteCurrentList={this.deleteCurrentList}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          goItemScreen={this.goItemScreen}
          editItem={this.editItem.bind(this)}
          tps={this.state.tps}
          undoTransaction={this.undoTransaction.bind(this)}
          redoTransaction={this.redoTransaction.bind(this)}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          loadList={this.loadList.bind(this)}
          todoItem={this.state.todoItem}
          currentList={this.state.currentList}
          tps={this.state.tps}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;