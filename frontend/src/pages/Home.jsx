import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createOrUpdateNote = (e) => {
        e.preventDefault();
        if (editingNote) {
            // Update existing note
            api
                .put(`/api/notes/update/${editingNote.id}/`, { content, title })
                .then((res) => {
                    if (res.status === 200) alert("Note updated!");
                    else alert("Failed to update note.");
                    setEditingNote(null); // Reset editing state
                    getNotes();
                })
                .catch((err) => alert(err));
        } else {
            // Create new note
            api
                .post("/api/notes/", { content, title })
                .then((res) => {
                    if (res.status === 201) alert("Note created!");
                    else alert("Failed to make note.");
                    getNotes();
                })
                .catch((err) => alert(err));
        }
    };

    const startEditing = (note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
    };


    return (
        <div>
            <div>
                <h2>Notas</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onEdit={startEditing} key={note.id} />
                ))}
            </div>
            <h2>{editingNote ? "Editar una nota" : "Crear una nota"}</h2>
            <form onSubmit={createOrUpdateNote}>
                <label htmlFor="title">Título:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Contenido:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value={editingNote ? "Actualizar nota" : "Crear nota"}></input>
                {editingNote && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingNote(null);
                            setTitle("");
                            setContent("");
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
}

export default Home;