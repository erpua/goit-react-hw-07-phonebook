import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
};

const addContact = ({ name, number }) => async dispatch => {
  dispatch(addContactRequest());
  const contact = { name, number };
  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

const updateContact = ({ name, number, id }) => async dispatch => {
  dispatch(updateContactRequest());
  const update = { name, number };
  try {
    const { data } = await axios.patch(`/contacts/${id}`, update);
    dispatch(updateContactSuccess(data));
  } catch (error) {
    dispatch(updateContactError(error));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};

export { addContact, deleteContact, fetchContacts, updateContact };
