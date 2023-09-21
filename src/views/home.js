import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeView = () => {
  return (
    <div className='home-view'>
      <div className='flex-center-view'>
        <Link className='btn all-contacts-btn' to='/all-contacts'>
          Button A
        </Link>
        <Link className='btn us-contacts-btn' to='/us-contacts'>
          Button B
        </Link>
      </div>
    </div>
  );
};

export default HomeView;
