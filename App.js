import React                                from 'react';
import {KeyboardAvoidingView, StyleSheet, ScrollView, Text, View} from 'react-native';
import uuiidv4                              from 'uuid/v4';
import EditableTimer                        from './components/EditableTimer';
import ToggleableTimerForm                  from './components/ToggleableTimerForm';
import {newTimer}                           from "./utils/TimerUtils";

export default class App extends React.Component {
  state = {
    timers: [
      {
        title    : 'Mow the lawn',
        project  : 'House Chores',
        id       : uuiidv4(),
        elapsed  : 5456099,
        isRunning: true
      },
      {
        title    : 'Bake squash',
        project  : 'Kitchen Chores',
        id       : uuiidv4(),
        elapsed  : 1273998,
        isRunning: false
      }
    ]
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000; //ms

    this.intervalId = setInterval(() => {
      const {timers}      = this.state;

      this.setState({
        timers: timers.map(timer => {
          const {elapsed, isRunning} = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  handleForRemove = (attrs) => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== attrs.id)
    });
  };

  handleForSubmit = (attrs) => {
    const {timers} = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const {title, project} = attrs;

          return {
            ...timer,
            title,
            project
          }
        }

        return timer;
      })
    })
  };

  handleCreateFormSubmit = (timer) => {
    const {timers} = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  };

  toggleTimer = (timerId) => {
    const { timers } = this.state;
    this.setState({
      timers: timers.map( timer => {
        const {id, isRunning} = timer;

        if(id === timerId){
          return {
            ...timer,
            isRunning: !isRunning
          }
        }

        return timer;
      })
    })
  };

  render() {
    const {timers} = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {
              timers.map(({title, project, id, elapsed, isRunning}) => (
                <EditableTimer
                  key={id}
                  id={id}
                  title={title}
                  project={project}
                  elapsed={elapsed}
                  isRunning={isRunning}
                  onFormSubmit={this.handleForSubmit}
                  onRemove={this.handleForRemove}
                  onStartPress={this.toggleTimer}
                  onStopPress={this.toggleTimer}
                />
              ))
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer  : {
    flex: 1
  },
  timerListContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop       : 35,
    paddingBottom    : 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA'
  },
  title         : {
    fontSize  : 18,
    fontWeight: 'bold',
    textAlign : 'center'
  },
  timerList     : {
    paddingBottom: 15,
  },
  container     : {
    flex           : 1,
    backgroundColor: '#fff',
    alignItems     : 'center',
    justifyContent : 'center',
  },
});
