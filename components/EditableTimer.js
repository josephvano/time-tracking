import React from 'react';

import TimerForm from "./TimerForm";
import Timer     from "./Timer";

export default class EditableTimer extends React.Component {
  state = {
    editFormOpen: false
  };

  constructor(props) {
    super(props);
  }

  handleEditPress = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    const {onFormSubmit} = this.props;

    onFormSubmit(timer);

    this.closeForm();
  };

  openForm() {
    this.setState({editFormOpen: true});
  }

  closeForm() {
    this.setState({editFormOpen: false});
  }

  render() {
    const {
            id,
            title,
            project,
            elapsed,
            isRunning,
            onRemove,
            onStartPress,
            onStopPress
          } = this.props;

    const {editFormOpen} = this.state;

    if (editFormOpen) {
      return <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={this.handleSubmit}
        onFormClose={this.handleFormClose}
      />
    }

    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
        onRemovePress={onRemove}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    )
  }

}
