import { useState } from 'react';
import Button from './Button';

export default function BookingModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState('Pre-seed / Bootstrapped');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your intro call request has been submitted to the Shriyu Nexus Solutions team.');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      onClose();
    }
  };

  return (
    <div className={`modal-backdrop active`} id="modalBackdrop" onClick={handleBackdropClick}>
      <div className="modal-window">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">&times;</button>
        <div className="modal-head">
          <h3>Book an Introductory Call</h3>
          <p>Schedule a 20-minute strategic consultation with the Shriyu Nexus Solutions team.</p>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">Your Name</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Sarah Jenkins" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="workEmail">Work Email</label>
            <input 
              type="email" 
              id="workEmail" 
              placeholder="sarah@startup.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="companyStage">Company Stage</label>
            <select 
              id="companyStage" 
              value={stage} 
              onChange={e => setStage(e.target.value)}
            >
              <option>Pre-seed / Bootstrapped</option>
              <option>Seed Stage</option>
              <option>Series A / Scaling</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="projectNotes">Tell us about your goals</label>
            <textarea 
              id="projectNotes" 
              rows="3" 
              placeholder="We are building a SaaS product and need branding & web app UI/UX..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            ></textarea>
          </div>
          <Button type="submit" variant="orange" className="btn-submit-form" full>
            Request Call Slot 🚀
          </Button>
        </form>
      </div>
    </div>
  );
}
