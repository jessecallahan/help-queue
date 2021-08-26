import selectedTicketReducer from '../../reducers/selected-ticket-reducer';

describe("selectedTicketReducer", () => {
  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1
  };

  test('Should return default state if there is no action type passed in to the reducer', () => {
    expect(selectedTicketReducer({}, { type: null })).toEqual({});
  });

  test('Should successfully add ticketData to selectedTicket', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: 'SELECT_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(selectedTicketReducer({}, action)).toEqual({
      selectedTicket: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });
  test('Should set ticket to null when given null object', () => {
    const action2 = {
      type: 'SET_TICKET_TO_NULL'
    }

    const { names, location, issue, id } = ticketData;
    action = {
      type: 'SELECT_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    const state = selectedTicketReducer({}, action);

    expect(selectedTicketReducer(state, action2)).toEqual({
      selectedTicket: null
    });

  });

});
  // test('Should set ticket to null when given null object', () => {
  //   const { names, location, issue, id } = ticketData;
  //   action = {
  //     type: 'SELECT_TICKET',
  //     names: names,
  //     location: location,
  //     issue: issue,
  //     id: id
  //   };
  //   const state = selectedTicketReducer({}, action)
  //   const action2 = {
  //     type: 'SELECT_TICKET',
  //     names: null,
  //     location: null,
  //     issue: null,
  //     id: null
  //   }
  //   const state2 = selectedTicketReducer({ state }, action2)
  //   expect(state2).toEqual(null);
  // })

