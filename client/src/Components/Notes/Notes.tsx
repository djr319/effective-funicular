import "./Notes.css";
import { NoteAPI } from "Services";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "Context";
import { Note } from "Types";

function Notes(): JSX.Element {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const notes = await NoteAPI.getPersonalNotes(uid);
      const sortedNotes = notes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotes(sortedNotes);
    })();
  }, []);

  async function addNote(uid: string, note: string): Promise<void> {
    return NoteAPI.addNote(uid, note).then((newNotes) => {
      setNotes(
        newNotes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    });
  }

  async function deleteNote(uid: string, id: number): Promise<void> {
    NoteAPI.deleteNote(uid, id);
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  }

  async function handleAddNote(e: React.SyntheticEvent) {
    e.preventDefault();
    await addNote(uid, note);
    setNote("");
  }

  function handleDeleteNote(id: number) {
    return deleteNote(uid, id);
  }

  return (
    <div className="notes-container">
      <div className="notes-published">
        <div className="notes-list">
          {notes.map((note) => (
            <div className="note-item" key={note.id}>
              <span>{note.note}</span>
              <button
                className="delete-note"
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <form className="notes-add" onSubmit={handleAddNote}>
        <input
          className="notes-input"
          type="text"
          placeholder="Enter notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="add-note">Add</button>
      </form>
    </div>
  );
}

export default Notes;
