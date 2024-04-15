import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
//import notes from "../notes";

function App() {
  const [noteInput, setNoteInput] = useState({
    title: "",
    content: "",
  });

  const [allNotes, setAllNotes] = useState([]); // used to be notes

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setAllNotes(data));
  }, []);

  function handleChange(event) {
    const { value, name } = event.target;
    setNoteInput((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          content: prevValue.content,
        };
      } else if (name === "content") {
        return {
          title: prevValue.title,
          content: value,
        };
      }
    });
  }

  function addNote(event) {
    event.preventDefault();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteInput),
    })
    .then(response => response.json())
    .then (newNote => {
      setAllNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    });

    setNoteInput({
      title: "",
      content: "",
    });
  }

  function deleteNote(id) {
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
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
      <Footer />
    </div>
  );
}

export default App;
