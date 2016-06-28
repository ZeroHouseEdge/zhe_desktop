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

   render() {
      return (
         <div className={styles.container}>
            <div className={styles.header}>
              <h3>Choose a game</h3>
            </div>
            {
              this.props.games.map((game, i) => {
                return <Game game={game} key={i} />
              })
            }
            <div className={styles.buttons}>
              <div className='buttonContainer circleContainer'>
                <div className='buttonSecondary circle' onClick={this.props.previousStep}>
                  <FontAwesome name='arrow-left' />
                </div>
              </div>
              <div className='buttonContainer circleContainer'>
                <div className='buttonPrimary circle'  onClick={this.props.nextStep}>
                  <FontAwesome name='arrow-right' />
                </div>
              </div>
            </div>
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
