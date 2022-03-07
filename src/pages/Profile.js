import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <>
      <Header title="Profile" renderSearch={ false } />
      <Footer />
    </>
  );
}

export default Profile;
