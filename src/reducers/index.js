import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import editingReducer from './editing-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTicketList: ticketListReducer,
  editing: editingReducer
});

export default rootReducer;