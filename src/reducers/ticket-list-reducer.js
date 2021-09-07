import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {

    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[action.id];
      return newState;
    // case c.UPDATE_TIME:
    //   const newTicket = Object.assign({}, state[id], { formattedWaitTime });
    //   const updatedState = Object.assign({}, state, {
    //     [id]: newTicket
    //   });
    //   return updatedState;
    default:
      return state;
  }
};
