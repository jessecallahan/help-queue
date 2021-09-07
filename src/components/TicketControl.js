import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withFirestore, isLoaded } from 'react-redux-firebase';
import * as a from './../actions';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      // editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicket !== null) {
      if (this.props.editing) {
        const { dispatch } = this.props;
        const action = a.toggleForm();
        dispatch(action);
      }

      this.setState({ selectedTicket: null })
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({ selectedTicket: firestoreTicket })
    });
  }

  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: 'tickets', doc: id });
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
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
  handleEditingTicketInList = (id) => {
    if (this.props.editing) {
      const action2 = {
        type: 'TOGGLE_EDITING'
      }
      this.props.dispatch(action2);
      // this.setState({ selectedTicket: null })
      this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
        const firestoreTicket = {
          names: ticket.get("names"),
          location: ticket.get("location"),
          issue: ticket.get("issue"),
          id: ticket.id
        }
        this.setState({ selectedTicket: firestoreTicket })
      });
    }
  }

  render() {
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      return (
        <React.Fragment>
          <h1>You must be signed in to access the queue.</h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser != null)) {

      let currentlyVisibleState = null;
      let buttonText = null;
      const { formVisibleOnPage, editing } = this.props;


      if (editing) {
        currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
        buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket !== null) {
        currentlyVisibleState = <TicketDetail ticket={this.state.selectedTicket}
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
        currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} />;
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

export default withFirestore(TicketControl);