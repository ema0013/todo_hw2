import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

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
    todoItem:null
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
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
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

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          deleteCurrentList={this.deleteCurrentList}
          showDialog={this.showDialog}
          hideDialog={this.hideDialog}
          goItemScreen={this.goItemScreen}
          editItem={this.editItem.bind(this)}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          loadList={this.loadList.bind(this)}
          todoItem={this.state.todoItem}
          currentList={this.state.currentList}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;