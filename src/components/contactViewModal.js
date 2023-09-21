import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from 'react-bootstrap';

// router-dom
import { Link, useHistory } from 'react-router-dom';

// npm
import { Scrollbars } from 'react-custom-scrollbars';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getContactDataAPI } from '../api/contact';
import { CONTACT_TYPES } from '../constants/contactTypes.js';
import { addContact, updateContact } from '../redux/actions/contactActions';

// components
import DetailedContactView from './contactDetailedViewModal';

let timeoutTime;
const ContactViewModal = ({ type }) => {
  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.contact.contacts);
  const filteredContacts = useSelector((state) => state.contact._contacts);
  const [openModal, setOpenModal] = useState(true);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDetailedModal, setOpenDetailedModal] = useState(true);
  const scrollViewData = useRef(null);
  const history = useHistory();

  const updateStoreData = (data, setData) => {
    dispatch(setData(data));
  };

  const onKeyEnter = (event) => {
    if (event.key === 'Enter') {
      if (timeoutTime) clearTimeout(timeoutTime);
      fetchContactData();
      scrollViewData.current.scrollToTop();
    }
  };

  const fetchContactData = useCallback(async () => {
    const data = await getContactDataAPI({
      query: searchText,
      page: 1,
      countryId: type === CONTACT_TYPES.TYPE_B ? '226' : '',
      setLoading,
    });

    if (data.contacts) {
      updateStoreData(Object.values(data.contacts), addContact);
    } else {
      updateStoreData([], addContact);
    }
    // eslint-disable-next-line
  }, [type, searchText]);

  const loadAndShowMoreData = async () => {
    const data = await getContactDataAPI({
      query: searchText,
      page: pagination + 1,
      countryId: type === CONTACT_TYPES.TYPE_B ? '226' : '',
      setLoading,
    });
    setPagination(pagination + 1);
    dispatch(
      addContact(
        allContacts.concat(data.contacts ? Object.values(data.contacts) : [])
      )
    );
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    history.push('/');
  };

  const closeDetailedModal = () => {
    setOpenModal(true);
    setOpenDetailedModal(false);
  };

  const handleOnlyEvenChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleDetailedModal = () => {
    setOpenModal(false);
    setOpenDetailedModal(true);
  };

  const handleContactSearch = (e) => {
    setSearchText(e.target.value);
    if (timeoutTime) clearTimeout(timeoutTime);
    timeoutTime = setTimeout(() => {
      scrollViewData.current.scrollToTop();
      fetchContactData();
    }, 500);
  };

  useEffect(() => {
    setSearchText('');
    setOnlyEven(false);
    fetchContactData();
    // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    if (allContacts.length) {
      updateStoreData({ onlyEven }, updateContact);
    }
    // eslint-disable-next-line
  }, [allContacts, onlyEven]);

  useEffect(() => {
    scrollViewData.current.scrollToTop();
  }, [onlyEven]);

  return (
    <>
      <DetailedContactView
        openDetailedModal={openDetailedModal}
        closeDetailedModal={closeDetailedModal}
      />
      <Modal show={openModal} onHide={handleCloseModal} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title> Modal {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: 'relative' }}>
          <div className='container'>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Search contact...'
                onChange={handleContactSearch}
                value={searchText}
                onKeyDown={onKeyEnter}
              />
            </InputGroup>
          </div>
          {loading && (
            <div className='loading-view'>
              <div className='loader'></div>
            </div>
          )}
          <Scrollbars
            style={{ height: 'calc(100vh - 330px)' }}
            ref={scrollViewData}
            onScrollFrame={({ top }) => {
              if (top === 1) {
                loadAndShowMoreData();
              }
            }}
            hideTracksWhenNotNeeded
          >
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              {!!filteredContacts.length &&
                filteredContacts.map((item, index) => (
                  <tbody key={index}>
                    <tr key={item.id} onClick={() => handleDetailedModal()}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone_number}</td>
                    </tr>
                  </tbody>
                ))}
            </Table>
            {!filteredContacts.length && !loading && (
              <div className='no-data-found'>
                <h4>No data found</h4>
              </div>
            )}
          </Scrollbars>
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type='checkbox'
            id='checkboxA'
            label='Only even'
            checked={onlyEven}
            onChange={handleOnlyEvenChange}
          />
          <div>
            <Link className='btn all-contacts-btn' to='/all-contacts'>
              All Contacts
            </Link>
            <Link className='btn us-contacts-btn' to='/us-contacts'>
              US Contacts
            </Link>
            <Button className='cls-btn-modal' onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactViewModal;
