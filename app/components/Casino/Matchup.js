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
    this.state = { canBet: false, bet: null, shotClockInterval: null, playInterval: null, over: false, count: { strikes: '0', balls: '0' }, linescore: {}, details: null, shotClock: 0, result: null }
  }

  componentDidMount() {
    const matchup = this.props.matchup;
    if (matchup.status.status !== 'In Progress' || matchup.id !== '2016/07/27/tbamlb-lanmlb-1') {
      this.setState({ over: true })
    } else {
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

              if (event === 'Push') {
                result = 'Phew. Push'
              } else if (event === this.state.bet) {
                result = 'You win!'
              } else if (this.state.bet && event !== this.state.bet) {
                result = 'You lose'
              } else {
                result = 'You didnt bet'
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
    if (!this.state.canBet) { return; }
    console.log('checked: ', value)

    this.setState({
      bet: value
    })
  };

  render() {
    if (this.state.over) { return <span></span>; }
    const over = this.state.over ? { opacity: 0.3, background: '#000' } : null
    const cantBetGroupClass = this.state.canBet ? null : { opacity: 0.3  }
    return (
      <div className={styles.matchupContainer} style={over}>
        <div className={styles.shotClock}>
          <span className={styles.shotClockDigit}>{this.state.shotClock}</span>
        </div>
        <div className={styles.bet}>
          <span className={styles.betValue}>Your bet: {this.state.bet}</span>
        </div>
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
          <p>{this.state.result}</p>
          <form style={cantBetGroupClass}>
            <RadioGroup className='radio' name="bets" onChange={this.betMade} value={this.state.bet}>
              <input type="radio" value="Strike" />Strike
              <input type="radio" value="Ball" />Ball
            </RadioGroup>
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
