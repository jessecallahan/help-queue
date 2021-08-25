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
});
