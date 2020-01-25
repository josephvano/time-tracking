import React                                from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import uuiidv4                              from 'uuid/v4';
import EditableTimer                        from './components/EditableTimer';
import ToggleableTimerForm                  from './components/ToggleableTimerForm';

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

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm />
          {
            timers.map( ({title, project, id, elapsed, isRunning}) => (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer  : {
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
