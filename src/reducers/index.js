import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import editingReducer from './editing-reducer';
import selectedTicketReducer from './selected-ticket-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer,
  editing: editingReducer,
  selectedTicket: selectedTicketReducer

});

export default rootReducer;