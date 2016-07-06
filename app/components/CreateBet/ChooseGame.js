import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Game from './Game';
import styles from './ChooseGame.css';

class ChooseGame extends Component {
   constructor(props, context) {
      super(props, context);
   }

   gameClicked = (game) => {
      this.props.saveValues({
        game: game
      });

      this.props.nextStep()
   };

   render() {
      return (
         <div className={styles.container}>
            {
              this.props.games.map((game, i) => {
                return <Game game={game} key={i} gameClicked={this.gameClicked} />
              })
            }
         </div>
      );
   }
}

function mapStateToProps(store) {
  return {
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(ChooseGame);
