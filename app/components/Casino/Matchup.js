import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from './Matchup.css';
import { getLogo, getMugshot, getTimestamp, diffPatch, updateMatchupData, getPlayDetails, getPlayer } from '../../api/mlb/main';

class Matchup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { canBet: false, shotClockInterval: null, playInterval: null, over: false, count: null, linescore: {}, batter: null, pitcher: null, details: null, lastPlay: {}, outs: null, shotClock: 0 }
  }

  componentDidMount() {
    const matchup = this.props.matchup;
    if (matchup.status.status !== 'In Progress') {
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
            batter: linescore.batter,
            pitcher: linescore.pitcher,
            linescore: linescore
          })
        })
        console.log('new res: ', res);
        if (res.length) {
          const play = _.find(res[0].diff, (obj, i) => { if(obj.op === 'add' && obj.path.indexOf('/liveData/plays/allPlays') > -1 ) { return obj } })
          console.log('play: ', play)
          if (play) {
            getPlayer(matchup.id, play.value.matchup.batter)
            getPlayer(matchup.id, play.value.matchup.pitcher)
            if (play.value.playEvents.length) {
              var cp = play.value.playEvents[play.value.playEvents.length - 1]
              var call = cp.details.call
              var count = cp.count

              if (call === 'S') {
                console.log('strike')
              } else if (call === 'B' && cp.details.description !== 'Intent Ball') {
                console.log('ball')
              } else if (call === 'B' && cp.details.description === 'Intent Ball') {
                console.log('push')
              } else if (call === 'X') {
                console.log('push')
              } else {
                console.log('wtf is this?')
                console.log('wtf: ', call)
              }
              this.setState({
                count: count
              })
              this.startShotClock()

              // switch(call) {
              //   case n:
              //   code block
              //   break;
              //   case n:
              //   code block
              //   break;
              //   default:
              //   default code block
              // }
            }

            if (play.value.about.isComplete) {
              console.log("PLAY COMPLETED: ", play)
            }
            clearInterval(playInterval)
            this.updatePlay(matchup)
            return;
          } else {
            this.setState({
              count: { strikes: "0", balls: "0" }
            })
          }
        }
      })
    }, 2000)
    this.setState({
      playInterval: playInterval
    })
  };

  resetShotClock = () => {
    this.setState({
      shotClock: 10
    })
    this.startShotClock()
  };

  startShotClock = () => {
    this.setState({
      shotClock: 10
    })
    const shotClockInterval = setInterval(() => {
      var newNum = this.state.shotClock - 1;
      if (newNum === 0) {
        this.setState({
          canBet: false,
          shotClock: this.state.shotClock - 1
        })
        clearInterval(shotClockInterval)
      } else {
        this.setState({
          canBet: true,
          shotClock: this.state.shotClock - 1
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

  render() {
    if (this.state.over) { return <span></span>; }
    const over = this.state.over ? { opacity: 0.3, background: '#000' } : null
    return (
      <div className={styles.matchupContainer} style={over} onClick={() => console.log('linescore: ', this.props.matchup)}>
        <div className={styles.shotClock}>
          <span className={styles.shotClockDigit}>{this.state.shotClock}</span>
        </div>
        <section className={styles.matchupTitle}>
          <span>
            <img src={getLogo(this.props.matchup.away_file_code)} />
            {this.props.matchup.away_team_city}
          </span>
          vs.
          <span>
            <img src={getLogo(this.props.matchup.home_file_code)} />
            {this.props.matchup.home_team_city}
          </span>
        </section>
        <div className={styles.pitcher}>
            {
              this.state.linescore.pitcher ?
              <span>
                <img src={getMugshot(this.state.linescore.pitcher.id)} />
                <div>
                  <description>Pitching</description>
                  <dets>{this.state.linescore.pitcher.name_display_roster} #{this.state.pitcher.number}</dets>
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
        <div>
        {
          this.state.count ?
          <div>
            <div className={styles.balls}>
              B {this.renderBalls() }
            </div>
            <div className={styles.strikes}>
              S {this.renderStrikes() }
            </div>
          </div>
          :
          <FontAwesome name='refresh fa-spin' />
        }
        <p>
        {
          this.state.details ? `${this.state.details.displayName} - ${this.state.details.description}` : null
        }
        </p>
        <p>{this.state.lastPlay.des}</p>
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
