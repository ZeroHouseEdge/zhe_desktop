import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Font from './Font';

class Casino extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { interval: null, letters: props.word.split('').filter(w => w.trim().length), on: false }
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({
        on: !this.state.on
      })
    }, 1000)

    this.setState({
      interval: interval
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  calcLights = (letter) => {
    const lights = Font[letter.toUpperCase()].map((light, i) => {
      return React.createElement('i', { key: i, className: `light ${this.state.on ? 'on' : null}`, style: { left: `${light.x}%`, bottom: `${light.y}%` } })
    });
    return lights
  };

   render() {
      return (
        <h1 className='casino'>
          {
            this.state.letters.map((letter, i) => {
              return <span key={i}>
                      {letter}
                      {this.calcLights(letter)}
                     </span>
            })
          }
        </h1>
      );
   }
}

function mapStateToProps(store) {
  return {
    socket: store.socket,
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Casino);
