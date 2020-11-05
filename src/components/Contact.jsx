import React, { useState } from 'react';
import '../styles/contact.scss';
function Contact() {

  const [request, setRequest] = useState();
  const [name, setName] = useState();
  const [subject, setSubject] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (request && subject) {
      window.location = (`mailto:lorem@ipsum.com?subject=${subject}&body=${request.replace(/(?:\r\n|\r|\n)/g, '%0D%0A')}`);
    } else {
      alert("Please state request and subject!");
    }
  }

  function handleName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubject(e) {
    e.preventDefault();
    setSubject(e.target.value);
  }

  function handleMessageBody(e) {
    e.preventDefault();
    setRequest(e.target.value);
  }

  return (
    <section className="contact">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" name="name" onChange={handleName} value={name || ""}></input>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" onChange={handleSubject} value={subject || ""}></input>
        <label htmlFor="messageBody" >Request:</label>
        <textarea id="messageBody" name="request" value={request || ""} onChange={handleMessageBody}></textarea>
        <input type="submit" value="Submit"></input>
      </form>
    </section>
  );
}

export default Contact;