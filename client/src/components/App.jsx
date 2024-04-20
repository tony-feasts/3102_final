import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import { signUp, signIn, onAuthChange, signOutUser } from '../authService';

function App() {

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allNotes, setAllNotes] = useState([]);
  const [noteInput, setNoteInput] = useState({ title: "", content: "" });


  useEffect(() => {
    onAuthChange(setUser, () => setUser(null));
  }, []);

  useEffect(() => {
    if (user) {
      fetch('/api')
      .then(response => response.json())
      .then(setAllNotes);
    }
  }, [user]);

  function handleAuth(email, password) {
    signIn(email, password)
      .then(data => {
        setUser({ token: data.token });
      })
      .catch(() => {
        signUp(email, password)
          .then(data => setUser({ token: data.token, uid: data.user.uid }));
          });
  }

  function handleLogout() {
    signOutUser()
    setUser(null);
    setEmail('');
    setPassword(''); 
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNoteInput(prev => ({
      ...prev,
      [name]: value
    }));
  }
  function addNote(event) {
    event.preventDefault();
    if (user) {
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...noteInput, userId: user.uid }),
      })
      .then(response => response.json())
      .then(newNote => {
        setAllNotes(prevNotes => [...prevNotes, newNote]);
        setNoteInput({ title: "", content: "" });
      });
    }
  }


  function deleteNote(id) {
    fetch(`/api/${id}`, { method: 'DELETE' })
      .then(() => {
        setAllNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      });
  }

  function createNote(note) {
    return (
      <Note
        key={note._id}
        id={note._id}
        title={note.title}
        content={note.content}
        onDelete={deleteNote}
      />
    );
  }

  return (
    <div>
      <Header />
      {user ? (
        <div>
          <form className="create-note">
            <input
              name="title"
              onChange={handleChange}
              value={noteInput.title}
              placeholder="Title"
            />
            <textarea
              name="content"
              onChange={handleChange}
              value={noteInput.content}
              placeholder="Take a note..."
              rows="3"
            />
            <button onClick={addNote}>Add</button>
          </form>
          {allNotes.map(createNote)}
          <button onClick={handleLogout}>Log Out</button>
          <Footer />
        </div>
      ) : (
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              name="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          <button onClick={() => handleAuth(email, password)}>Log On</button>
          </form>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
