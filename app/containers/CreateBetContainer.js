import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchGames } from '../actions/soccer';
import ChooseGame from '../components/CreateBet/ChooseGame';
import ChooseTeam from '../components/CreateBet/ChooseTeam';
import ConfirmBet from '../components/CreateBet/ConfirmBet';


class CreateBetContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { step: 1, games: null, game: null, team: null, line: null, value: null };
  }

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

  render() {
    switch (this.state.step) {
      case 1:
        return <ChooseGame nextStep={this.nextStep} previousStep={this.previousStep} />
      case 2:
        return <ChooseTeam nextStep={this.nextStep} previousStep={this.previousStep} />
      case 3:
        return <ConfirmBet nextStep={this.nextStep} previousStep={this.previousStep} />
    }
  }
}

// CreateBetContainer.need = [() => { return fetchGames(); }];

CreateBetContainer.contextTypes = {
  router: function () {
    return React.PropTypes.func.isRequired;
  }
};

CreateBetContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(CreateBetContainer);


