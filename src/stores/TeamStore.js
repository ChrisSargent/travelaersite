import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as SiteActions from '../actions/SiteActions';

class TeamStore extends EventEmitter {
  constructor() {
    super();
    this.team = [];
    this.teamCache = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getTeam() {
    if (this.teamCache.length > 0) {
      return this.teamCache;
    } else {
      SiteActions.fetchTeam();
      return false;
    }
  }

  updateCache() {
    this.teamCache = this.team;
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_TEAM':
        // console.log('TeamStore | handleActions | Fetch Team');
        // this.emit('change');
        break;

      case 'RECEIVE_TEAM':
        // console.log('TeamStore | handleActions | Receive Team');
        this.team = action.team;
        this.team.sort(function(a, b) {
          return parseFloat(a.menu_order) - parseFloat(b.menu_order);
        });
        this.updateCache();
        this.emit('change');
        break;

      default:
    }
  }

}

const teamStore = new TeamStore();
export default teamStore;
