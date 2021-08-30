import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // selectedTicket: null,
      // editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    // New code will go here.
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });

    handleClick = () => {
      if (Object.keys(this.props.selectedTicket).length !== 0) {
        if (this.props.editing) {
          const { dispatch } = this.props;
          const action = a.toggleForm();
          dispatch(action);
        }

        const action = {
          type: 'SET_TICKET_TO_NULL'
        }

        this.props.dispatch(action);
      } else {
        const { dispatch } = this.props;
        const action = a.toggleForm();
        dispatch(action);
      }
    }

    handleAddingNewTicketToList = (newTicket) => {
      const { dispatch } = this.props;
      const action = a.addTicket(newTicket);
      dispatch(action);
      const action2 = a.toggleForm();
      dispatch(action2);
    }

    handleChangingSelectedTicket = (id) => {
      const { dispatch } = this.props;
      const selectedTicket = this.props.masterTicketList[id];
      const action = {
        type: 'SELECT_TICKET',
        id: selectedTicket.id,
        names: selectedTicket.names,
        location: selectedTicket.location,
        issue: selectedTicket.issue,
      }
      dispatch(action);

      // this.setState({ selectedTicket: selectedTicket })
    }

    handleDeletingTicket = (id) => {
      const { dispatch } = this.props;
      const action = a.deleteTicket(id);
      dispatch(action);
      const action3 = {
        type: 'SET_TICKET_TO_NULL'
      }

      this.props.dispatch(action3);
      // this.setState({ selectedTicket: null });
    }

    handleEditClick = () => {
      console.log("handleEditClick reached!");
      if (!this.props.editing) {
        const { dispatch } = this.props;
        const action = {
          type: 'TOGGLE_EDITING'
        }
        dispatch(action);
      }
      // this.setState({ editing: true });
    }
    handleBuyingTicketInList = (ticketToEdit) => {
      const editedMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== this.state.selectedTicket.id).concat(ticketToEdit);
      this.setState({
        masterTicketList: editedMasterTicketList,
        selectedTicket: ticketToEdit
      });
    }
    handleEditingTicketInList = (ticketToEdit) => {
      const { dispatch } = this.props;
      const { id, names, location, issue } = ticketToEdit;
      const action = {
        type: 'ADD_TICKET',
        id: id,
        names: names,
        location: location,
        issue: issue,
      }
      dispatch(action);
      if (this.props.editing) {
        const action2 = {
          type: 'TOGGLE_EDITING'
        }
        dispatch(action2);
      }
      // this.setState({
      //   // editing: false,
      //   selectedTicket: null
      // });
      const action3 = {
        type: 'SET_TICKET_TO_NULL'
      }
      dispatch(action3);
    }

    render() {
      let currentlyVisibleState = null;
      let buttonText = null;
      const { formVisibleOnPage, editing, masterTicketList, selectedTicket } = this.props;

      if (editing) {
        currentlyVisibleState = <EditTicketForm ticket={selectedTicket} onEditTicket={this.handleEditingTicketInList} />
        buttonText = "Return to Ticket List";
      } else if (Object.keys(this.props.selectedTicket).length !== 0) {
        currentlyVisibleState = <TicketDetail ticket={selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
          onClickingBuy={this.handleBuyingTicketInList}
        />
        buttonText = "Return to Ticket List";
      }
      else if (formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList ticketList={masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
        buttonText = "Add Ticket";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }

  }

  TicketControl.propTypes = {
    masterTicketList: PropTypes.object,
    formVisibleOnPage: PropTypes.bool,
    editing: PropTypes.bool,
    selectedTicket: PropTypes.object
  };

  const mapStateToProps = state => {



    return {
      masterTicketList: state.masterTicketList,
      formVisibleOnPage: state.formVisibleOnPage,
      editing: state.editing,
      selectedTicket: state.selectedTicket
    }
  }
  TicketControl = connect(mapStateToProps)(TicketControl);

  export default TicketControl;