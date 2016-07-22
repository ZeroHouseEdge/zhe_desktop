import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from './Matchup.css';
import { getLogo, getMugshot, getTimestamp, diffPatch, updateMatchupData } from '../../api/mlb/main';

class Matchup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { interval: null, over: false, count: null, batter: null, pitcher: null }
  }

  componentDidMount() {
    const matchup = this.props.matchup;
    if (matchup.winning_pitcher) {
      this.setState({ over: true })
    } else {
      console.log(matchup)
      this.updateMatchup(matchup)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  newDiffPatch = (game_pk, timestamp, done) => {
      diffPatch(game_pk, timestamp).then((res) => {
        done(res)
      })
  };

  updateMatchup = (matchup) => {
    const timestamp = getTimestamp()
    const interval = setInterval(() => {
      this.newDiffPatch(matchup.game_pk, timestamp, (res) => {
        console.log(res)
        if (res.length) {
          const pitch = _.find(res[0].diff, (obj, i) => { if(obj.value && obj.value.isPitch && obj.op === 'add') { return obj } })
          updateMatchupData(matchup.game_pk).then((res) => {
            this.setState({
              batter: res.batter,
              pitcher: res.pitcher
            })
          })
          console.log('pitch: ', pitch)
          if(pitch) {
            this.setState({
              count: pitch.value.count
            })
          }
          clearInterval(interval)
          this.updateMatchup(matchup)
          return;
        }
      })
    }, 5000)
    this.setState({
      interval: interval
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
      <div className={styles.matchupContainer} style={over}>
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
              this.state.pitcher ?
              <span>
                <img src={getMugshot(this.state.pitcher.id)} />
                <div>
                  <description>Pitching</description>
                  <dets>{this.state.pitcher.name_display_roster} #{this.state.pitcher.number}</dets>
                </div>
              </span>
              : null
            }
        </div>
        <div className={styles.batter}>
          {
            this.state.batter ?
            <span>
              <img src={getMugshot(this.state.batter.id)} />
              <div>
                <description>At bat</description>
                <dets>{this.state.batter.name_display_roster} #{this.state.batter.number} {this.state.batter.pos}</dets>
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
