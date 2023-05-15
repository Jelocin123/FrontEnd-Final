import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Email from '../data/email.json';
import style from '../styles/modal.module.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

    const ModalComponent = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      resetForm();
      setShow(false);
    };
    const handleShow = () => setShow(true);
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        resetForm();
        setShow(false);
      
       
        if (!name || !email || !subject || !message) {
          alert("Please fill out all required fields.");
          return;
        }
      
        
        const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }
      
        
        alert("Form submitted successfully!");
        
        
      };
    const resetForm = () => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    };
  return (
    <>
      <article className="row justify-content-center  mt-lg-0">
        {Email.map((email) => (
          <button id={style.bg_none} className="col-lg-2 col-4 mt-4 text-center border-0" key={email.alt}>
            <img
              className="img-fluid"
              src={email.url}
              alt={email.alt}
              onClick={handleShow}
            />
            <figcaption id={style.figcaption}>{email.caption}</figcaption>
          </button>
        ))}
      </article>

      <Modal className='mt-4' id={style.border} show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Contact one of our colleagues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
  <Form.Label className='ms-1'>Name</Form.Label>
  <Form.Control
    className={style.formBg}
    type="text"
    placeholder="Enter your name"
    value={name}
    onChange={(event) => setName(event.target.value)}
    required
  />
</Form.Group>

<Form.Group controlId="formEmail">
  <Form.Label className='mt-2 ms-1'>Email address</Form.Label>
  <Form.Control
    className={style.formBg}
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  />
</Form.Group>

<Form.Group controlId="formSubject">
  <Form.Label className='mt-2 ms-1' >Subject</Form.Label>
  <Form.Control
    className={style.formBg}
    type="text"
    placeholder="Enter the subject"
    value={subject}
    onChange={(event) => setSubject(event.target.value)}
    required
  />
</Form.Group>

<Form.Group controlId="formMessage">
  <Form.Label className='mt-2 ms-1'>Message</Form.Label>
  <Form.Control
    className={style.formBg}
    as="textarea"
    rows={3}
    placeholder="Enter your message"
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    required
  />
</Form.Group>
            <div className='row justify-content-center'>
            <Button className='mt-3 border-0 col-2' id={style.bg_none} variant="primary" type="submit">
              <span 
              id={style.send}>Send
                <i 
              id={style.send} 
              className='bi bi-send ms-1'>
                </i>
              </span>
            </Button>
            </div>
          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default ModalComponent;
