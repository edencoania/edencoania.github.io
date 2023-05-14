import React from 'react';
import Navigation from './nav';

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
        <a href="file:///C:/Users/eran1/Downloads/Eden's%20Resume.pdf" download>Download Resume</a>
      </p>
    </div>
  );
}

export default Contact;
