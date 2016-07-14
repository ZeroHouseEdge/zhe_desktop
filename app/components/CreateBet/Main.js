import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ChooseGame from './ChooseGame';
import ChooseTeam from './ChooseTeam';
import ConfirmBet from './ConfirmBet';
import styles from './Main.css';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { step: 1, game: {}, team: '', line: 0, value: 0 };
  }

  saveValues = (data) => {
    this.setState(data);
  };

  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  previousStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  finished = () => {
    var data = {
      author_id: this.props.wallet.pubkey,
      original_date: this.state.game.original_date,
      game_data_directory: this.state.game.game_data_directory,
      gameday_id: this.state.game.gameday,
      home_team_name: this.state.game.home_team_name,
      away_team_name: this.state.game.away_team_name,
      home_file_code: this.state.game.home_file_code,
      away_file_code: this.state.game.away_file_code,
      spread: this.state.line,
      value: this.state.value
    };

    const original_side = this.state.team === this.state.game.home_team_name ? 'home' : 'away';
    original_side === 'home' ? data.home_id = this.props.wallet.pubkey : data.away_id = this.props.wallet.pubkey;

    data.original_side = original_side;
    if (original_side === 'home') {
      data.home_pubkey = this.props.wallet.payout_pubkey
    } else {
      data.away_pubkey = this.props.wallet.payout_pubkey
    }

    this.props.done(data);
  };

  showStep = () => {
    switch (this.state.step) {
      case 1:
        return <ChooseGame games={this.props.soccer.games} saveValues={this.saveValues} nextStep={this.nextStep} />
      case 2:
        return <ChooseTeam game={this.state.game} saveValues={this.saveValues} nextStep={this.nextStep} previousStep={this.previousStep} />
      case 3:
        return <ConfirmBet data={this.state} finished={this.finished} previousStep={this.previousStep} />
    }
  };

  showHeader = () => {
    switch (this.state.step) {
      case 1:
        return "Choose a game";
      case 2:
        return "Create your bet";
      case 3:
        return "Confirm your bet";
    }
  };

  render() {
    const progress = {
      width : (this.state.step / 3 * 100) + '%',
    }
    return (
      <main>
        <header className={styles.header}>
          <h3>{this.showHeader()}</h3>
          <div className={styles.progress} style={progress}></div>
        </header>
        {this.showStep()}
      </main>
    );
  }
}

Main.propTypes = {
  soccer: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired
};

function mapStateToProps(store) {
  return {
    soccer: store.soccer,
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Main);
