import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const [noteInput, setNoteInput] = useState({
    title: "",
    content: "",
  });

  const [allNotes, setAllNotes] = useState(notes);

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
    setAllNotes((prevNotes) => {
      const newNote = {
        key: Date.now(),
        id: Date.now(),
        title: noteInput.title,
        content: noteInput.content,
      };
      return prevNotes.concat(newNote);
    });

    setNoteInput({
      title: "",
      content: "",
    });
  }

  function deleteNote(id) {
    setAllNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function createNote(note) {
    return (
      <Note
        key={note.key}
        id={note.key}
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
