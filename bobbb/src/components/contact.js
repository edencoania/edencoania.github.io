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
        <ResumeDownloader/>
      </p>
    </div>
  );
}

const ResumeDownloader = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/download`, {
        responseType: 'blob', // Set the response type to 'blob' to receive the file as a Blob object
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Resume</button>
    </div>
  );
};


export default Contact;
