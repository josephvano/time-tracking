import React from 'react';
import {
  View,
  StyleSheet
}            from 'react-native';

import TimerForm   from "./TimerForm";
import TimerButton from "./TimerButton";

export default class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({isOpen: true});
  };

  handleFormSubmit = (timer) => {
    const { onFormSubmit } = this.props;
    onFormSubmit(timer);

    this.handleFormClose();
  };

  handleFormClose = () => {
    this.setState({isOpen: false});
  };

  render() {
    const {isOpen} = this.state;

    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          />
        ) : (
          <TimerButton title="+" color="black" onPress={this.handleFormOpen}/>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container    : {
    paddingVertical: 10
  },
  buttonPadding: {
    paddingHorizontal: 15
  }
});
