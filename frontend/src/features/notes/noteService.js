import axios from "axios";

const API_URL = "/api/tickets/";

//Get Notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);
  // console.log(response.data);

  return response.data;
};

//Create a ticket Note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.post(
    API_URL + ticketId + "/notes",
    { text: noteText },
    config
  );
  // console.log(response.data);

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
