import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import RadioGroup from 'react-radio';
import styles from './Matchup.css';
import { getLogo, getMugshot, getTimestamp, diffPatch, updateMatchupData, getPlayDetails, getPlayer } from '../../api/mlb/main';

class Matchup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canBet: false,
      pitch: null,
      bet: null,
      shotClockInterval: null,
      playInterval: null,
      over: false,
      count: { strikes: '0', balls: '0' },
      linescore: {},
      details: null,
      shotClock: 0,
      result: null,
      value: 1.00
    }
  }

  componentDidMount() {
    const matchup = this.props.matchup;
    if (matchup.status.status !== 'In Progress' || matchup.away_file_code !== 'was') {
      this.setState({ over: true })
    } else {
      console.log('matchup: ', matchup);
      this.updatePlay(matchup)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.playInterval)
    clearInterval(this.state.shotClockInterval)
  }

  newDiffPatch = (game_pk, timestamp, done) => {
      diffPatch(game_pk, timestamp).then((res) => {
        done(res)
      })
  };

  updatePlay = (matchup) => {
    const timestamp = getTimestamp()
    const playInterval = setInterval(() => {
      this.newDiffPatch(matchup.game_pk, timestamp, (res) => {
        updateMatchupData(matchup.game_pk).then((linescore) => {
          this.setState({
            linescore: linescore
          })
        })
        if (!Array.isArray(res)) {
          console.log('weird data')
          clearInterval(playInterval)
          this.updatePlay(matchup)
          return;
        }
        console.log('new res len: ', res.length);
        if (res.length) {
          const play = _.find(res[0].diff, (obj, i) => { if(obj.op === 'add' && obj.path.indexOf('/liveData/plays/allPlays') > -1 ) { return obj } })
          console.log('play: ', play)
          if (play) {
            if (play.value.playEvents.length) {

              var cp = play.value.playEvents[play.value.playEvents.length - 1]
              if (!cp.isPitch) {
                console.log('not a pitch');
                clearInterval(playInterval)
                this.updatePlay(matchup)
                return;
              }
              var call = cp.details.call
              var count = cp.count

              var event = null;
              if (call === 'S') {
                event = 'Strike'
              } else if (call === 'B' && cp.details.description != 'Intent Ball') {
                event = 'Ball'
              } else {
                event = 'Push'
              }

              var result = null;

              if (!this.state.bet) {
                result = null
              } else if (event === 'Push') {
                result = 'Push'
              } else if (event === this.state.bet) {
                result = 'Win'
              } else if (this.state.bet && event !== this.state.bet) {
                result = 'Lose'
              } else {
                result = null
              }

              if (result === 'Win' || result === 'Lose') {
                this.props.updateScore(result, this.state.value)
              }

              this.setState({
                details: cp.details,
                count: count,
                result: result,
                bet: null
              })

              this.startShotClock()
            } else {
              this.setState({
                count: { strikes: "0", balls: "0" }
              })
            }

            if (play.value.about.isComplete) {
              console.log("PLAY COMPLETED: ", play)
            }
            clearInterval(playInterval)
            this.updatePlay(matchup)
            return;
          }
        }
      })
    }, 2500)
    this.setState({
      playInterval: playInterval
    })
  };

  resetShotClock = () => {
    this.setState({
      shotClock: 8
    })
    this.startShotClock()
  };

  startShotClock = () => {
    this.setState({
      shotClock: 8
    })
    const shotClockInterval = setInterval(() => {
      var newNum = this.state.shotClock - 1;
      if (newNum === 0) {
        this.setState({
          canBet: false,
          shotClock: 0
        })
        clearInterval(shotClockInterval)
      } else {
        this.setState({
          canBet: true,
          shotClock: newNum
        })
      }
    }, 1000)
    this.setState({
      shotClockInterval: shotClockInterval
    })
  };

  renderBalls = () => {
    const balls = [1,2,3,4].map((ball, i) => {
      return React.createElement('i', { key: i, className: `ball ${this.state.count.balls >= ball ? 'active' : ''}` })
    })
    return balls;
  };

  renderStrikes = () => {
    const strikes = [1,2,3].map((strike, i) => {
      return React.createElement('i', { key: i, className: `strike ${this.state.count.strikes >= strike ? 'active' : ''}` })
    })

    return strikes;
  };

  betMade = (value, e) => {
    // if (!this.state.canBet) { return; }

    this.setState({
      pitch: value
    })
  };

  placeBet = () => {
    if (!this.state.pitch || !this.state.canBet) { return; }
    this.setState({
      bet: this.state.pitch
    })
  };

  renderResult = (result) => {
    const win = { color: '#4CAF50' }
    const lose = { color: '#F44336' }
    const push = { color: '#607D8B' }
    switch (result) {
      case 'Win':
        return <i><FontAwesome name='check' style={win} /></i>
        break;
      case 'Lose':
        return <i><FontAwesome name='times' style={lose} /></i>
        break;
      case 'Push':
        return <i><FontAwesome name='plus' style={push} /><FontAwesome name='minus' style={push} /></i>
        break;
      default:
        return null
        break;
    }
  };

  valueChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    if (this.state.over) { return <span></span>; }
    const over = this.state.over ? { opacity: 0.3, background: '#000' } : null
    const cantBetGroupClass = this.state.canBet ? null : { opacity: 0.3  }
    const lockStyle = { color: '#F0E68C' }
    return (
      <div className={styles.matchupContainer} style={over}>
        <header className={styles.matchupHeader}>
          <div className={styles.matchupHeaderSection}>
            <span className={styles.betValue}>
              {this.state.bet ? `$${this.state.value} - ${this.state.bet}` : 'No bet'}
            </span>
          </div>
          <div className={styles.matchupHeaderSection}>
            <span>
              {
                this.renderResult(this.state.result)
              }
            </span>
          </div>
          <div className={styles.matchupHeaderSection}>
            <span className={styles.shotClockDigit}>
              {this.state.shotClock === 0 ? <FontAwesome name='lock' style={lockStyle} /> : this.state.shotClock}
            </span>
          </div>
        </header>

        <section className={styles.matchupTitle}>
          <div>
            <img src={getLogo(this.props.matchup.away_file_code)} />
            <span>{this.props.matchup.away_team_city}</span>
            <span>
              {
                this.state.linescore.linescore ?
                this.state.linescore.linescore.r.away : null
              }
            </span>
          </div>
          vs.
          <div>
            <img src={getLogo(this.props.matchup.home_file_code)} />
            <span>{this.props.matchup.home_team_city}</span>
            <span>
              {
                this.state.linescore.linescore ?
                this.state.linescore.linescore.r.home : null
              }
            </span>
          </div>
        </section>
        <div className={styles.pitcher}>
            {
              this.state.linescore.pitcher ?
              <span>
                <img src={getMugshot(this.state.linescore.pitcher.id)} />
                <div>
                  <description>Pitching</description>
                  <dets>{this.state.linescore.pitcher.name_display_roster} #{this.state.linescore.pitcher.number}</dets>
                </div>
              </span>
              : null
            }
        </div>
        <div className={styles.batter}>
          {
            this.state.linescore.batter ?
            <span>
              <img src={getMugshot(this.state.linescore.batter.id)} />
              <div>
                <description>At bat</description>
                <dets>{this.state.linescore.batter.name_display_roster} #{this.state.linescore.batter.number} {this.state.linescore.batter.pos}</dets>
              </div>
            </span>
            : null
          }
        </div>
        <div className={styles.countDetails}>
        {
          this.state.count ?
          <div>
            <div className={styles.balls}>
              B {this.renderBalls() }
            </div>
            <div className={styles.strikes}>
              S {this.renderStrikes() }
            </div>
            <p className={styles.detailsDescription}>
            {
              this.state.details ? `${this.state.details.displayName} - ${this.state.details.description}` : null
            }
            </p>
          </div>
          :
          <FontAwesome name='refresh fa-spin' />
        }
        </div>
        <div>
          <form className={styles.betForm} style={cantBetGroupClass}>
            <RadioGroup className='radio' name="bets" onChange={this.betMade} selectedValue={this.state.pitch}>
              <div>
                <label htmlFor={`strike-${this.props.matchup.id}`} className={this.state.pitch === 'Strike' ? 'checked' : null}>Strike</label>
                <input type="radio" id={`strike-${this.props.matchup.id}`} value="Strike" />
              </div>
              <div>
                <label htmlFor={`ball-${this.props.matchup.id}`} className={this.state.pitch === 'Ball' ? 'checked' : null}>Ball</label>
                <input type="radio" id={`ball-${this.props.matchup.id}`} value="Ball" />
              </div>
            </RadioGroup>
            <div className={styles.valueContainer}>
              <span className='fa fa-usd'></span>
              <input
                type='number'
                autofocus='true'
                defaultValue={this.state.value}
                min='1'
                max='5'
                onChange={this.valueChange}
              />
            </div>
            <div className='buttonContainer small'>
              <div className='buttonSecondary alert' onClick={this.placeBet}>
                Place bet
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    socket: store.socket,
    wallet: store.wallet
  };
}

export default connect(mapStateToProps)(Matchup);
