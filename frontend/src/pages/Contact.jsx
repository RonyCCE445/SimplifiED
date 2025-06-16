import React from 'react';

const Contact = () => {
  return (
    <div className="page contact">
      <h1>Contact Me</h1>

      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

        <button type="submit">Send Message</button>
      </form>

      <div className="social-links">
        <p>Or reach out to me directly:</p>
        <ul>
          <li><a href="https://www.linkedin.com/in/koustavchakraborty24/" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/RonyCCE445" target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href="https://www.instagram.com/koustav_c_24/" target="_blank" rel="noreferrer">Instagram</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
