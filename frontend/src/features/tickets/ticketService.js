import axios from "axios";

const API_URL = "/api/tickets/";

//Create new ticket

const createTicket = async (ticektData, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.post(API_URL, ticektData, config);

  return response.data;
};

//Get All Tickets of the User

const getTickets = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.get(API_URL, config);
  // console.log(response.data);

  return response.data;
};

//Get a particular ticket

const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  // console.log(response.data);

  return response.data;
};

//Close a particular ticket

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.put(
    API_URL + ticketId,
    {
      status: "closed",
    },
    config
  );
  // console.log(response.data);

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
