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
    // console.log('TeamStore | getTeam');
    return this.team;
  }

  getTeamLoading() {
    return this.fetchingTeam;
  }

  handleActions(action) {
    var self = this; // To use in the timeout
    switch (action.type) {
      case 'FETCH_TEAM':
        // console.log('TeamStore | handleActions | Fetch Team');
        this.fetchingTeam = true;
        break;

      case 'RECEIVE_TEAM':
        // console.log('TeamStore | handleActions | Receive Team');
        this.team = action.team;
        this.fetchingTeam = false;
        break;

      default:
        return true;
    }
    // TODO: Find a way to take this out of the timeout
    // Needs to be in a setTimeout to prevent error: Invariant Violation: Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.
    // Tried for several hours using dispatcher.waitFor but no dice
    setTimeout(function() {
      self.emit('change');
    });
    return true;
  }

}

const teamStore = new TeamStore();

export default teamStore;
