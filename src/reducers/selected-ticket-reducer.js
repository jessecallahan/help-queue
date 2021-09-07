export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
    case 'SELECT_TICKET':
      return Object.assign({}, state, {
        names: names,
        location: location,
        issue: issue,
        id: id,

      });
    case 'SET_TICKET_TO_NULL':
      return {};
    default:
      return state;

  };
};