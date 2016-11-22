import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class TeamStore extends EventEmitter {
  constructor() {
    super();
    this.team = [];
    this.fetchingTeam = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getTeam() {
    return this.team;
  }

  getLoading() {
    return this.fetchingTeam;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_TEAM':
        // console.log('TeamStore | handleActions | Fetch Team');
        this.fetchingTeam = true;
        break;

      case 'RECEIVE_TEAM':
        // console.log('TeamStore | handleActions | Receive Team');
        this.team = action.team;
        this.team.sort(function(a, b) {
          return parseFloat(a.menu_order) - parseFloat(b.menu_order);
        });
        this.fetchingTeam = false;
        break;

      default:
    }
    this.emit('change');
  }

}

const teamStore = new TeamStore();

export default teamStore;
