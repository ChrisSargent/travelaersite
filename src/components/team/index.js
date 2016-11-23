import React, {Component} from 'react';
import css from '../../lib/css';

// Stores & Actions
import * as TeamActions from '../../actions/TeamActions';
import TeamStore from '../../stores/TeamStore';

// Components
import Member from '../member';

require('./_team.sass');

export default class Team extends Component {
  constructor() {
    super();
    this.requestTeam = this.requestTeam.bind(this);
    this.state = {
      team: TeamStore.getTeam()
    };
  }

  componentWillMount() {
    TeamActions.fetchTeam();
    TeamStore.on('change', this.requestTeam);
  }

  componentWillUnmount() {
    TeamStore.removeListener('change', this.requestTeam);
  }

  requestTeam() {
    this.setState({team: TeamStore.getTeam()});
  }

  render() {
    const {team} = this.state;

    const teamMap = team.map((member) => {
      return (
        <li key={member.id} className="item">
          <Member {...member} />
        </li>
      );
    });

    return (
      <section className="team-section">
        <h1 className={css.title}>Our Team</h1>
        <ul className="team-list">
          {teamMap}
        </ul>
      </section>
    );
  }
}
