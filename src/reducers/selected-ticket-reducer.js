export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case 'SELECT_TICKET':
      return Object.assign({}, state, {
        selectedTicket: {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    default:
      return state;
  }
};