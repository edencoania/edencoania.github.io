import React from 'react';
import Navigation from './nav';
import { BASE_URL } from '../config';
import axios from 'axios';

function Contact() {
  return (
    <div className='contact'>
      <Navigation/>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:edencoania@gmail.com">edencoania@gmail.com</a>
      </p>
      <p>
        Phone: <a href="tel:+972525258159">052-525-8159</a>
      </p>
      <p>
        First Name: Eden
      </p>
      <p>
        Last Name: Coania
      </p>
      <p>
        <FileDownloader/>
      </p>
    </div>
  );
}

const FileDownloader = () => {
  const handleDownload = () => {
    window.open(`${BASE_URL}/download`, '_blank');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};
export default Contact;
