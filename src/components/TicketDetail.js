import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props) {
  const { ticket } = props;

  // function handleBuy(event) {
  //   event.preventDefault();
  //   props.onClickingBuy({ names: ticket.names, location: ticket.location, issue: ticket.issue, quantity: ticket.quantity - 1, id: ticket.id });
  // }

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <p><em>quantity: {ticket.quantity}</em></p>
      {/* <button onClick={handleBuy}>Buy</button> */}
      <button onClick={props.onClickingEdit}>Update Ticket</button>
      <button onClick={() => props.onClickingDelete(ticket.id)}>Delete Ticket</button>
      <hr />
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingBuy: PropTypes.func
}

export default TicketDetail;