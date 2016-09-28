import dispatcher from "../../dispatcher";
import { EventEmitter } from "events";

class NavStore extends EventEmitter {
  constructor() {
    super()
    this.data = {
      menu: [],
      fetchingMenu: true
    };
  }

  menu() {
    console.log('NavStore | menu');
    return this.data;
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_MENU": {
        console.log("Fetch Menu");
        this.data.fetchingMenu = true;
        this.emit("change");
        break;
      }
      case "RECEIVE_MENU": {
        console.log("Receive Menu");
        this.data.menu = action.menu;
        this.data.fetchingMenu = false;
        this.emit("change");
        break;
      }
      default: {
        break;
      }
    }
  }
}

const navStore = new NavStore();
dispatcher.register(navStore.handleActions.bind(navStore));

export default navStore;
