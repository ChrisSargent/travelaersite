import React, {Component} from 'react';

import css from '../../lib/css';
import Member from '../member';
import TeamStore from '../../stores/TeamStore';

require('./_team.sass');

export default class Team extends Component {
  constructor() {
    super();
    this.requestTeam = this.requestTeam.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestTeam();
    TeamStore.on('change', this.requestTeam);
  }

  componentWillUnmount() {
    TeamStore.removeListener('change', this.requestTeam);
  }

  requestTeam() {
    const team = TeamStore.getTeam();
    team && (this.setState({team: team}));
  }

  render() {
    if (!this.state.team)
      return null

    const {team} = this.state;
    const {compName} = this.props;

    const teamMap = team.map((member) => {
      return (
        <li key={member.id} className={css.item}>
          <Member {...member}/>
        </li>
      );
    });

    return (
      <div className={css.block + compName}>
        <h1 className={css.title}>Our Team</h1>
        <ul className={css.list + compName}>
          {teamMap}
        </ul>
      </div>
    );
  }
}
