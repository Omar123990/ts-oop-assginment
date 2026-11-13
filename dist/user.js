"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Q1
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    // Q5
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(v) {
        if (v >= 18 && v <= 60) {
            this._age = v;
        }
        else {
            throw new Error("Age must be between 18 and 60");
        }
    }
    // Q5
    addNoteBook(notebook) {
        this.notebooks.push(notebook);
        console.log(`NoteBook "${notebook.title}" added to ${this.name}`);
    }
    removeNoteBook(notebookId) {
        const index = this.notebooks.findIndex((nb) => nb.id === notebookId);
        if (index !== -1) {
            this.notebooks.splice(index, 1);
            console.log(`NoteBook with ID ${notebookId} removed from ${this.name}`);
        }
        else {
            console.log(`NoteBook with ID ${notebookId} not found`);
        }
    }
    displayInfo() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
        console.log(`Age: ${this._age}`);
        console.log(`Notebooks Count: ${this.notebooks.length}`);
    }
}
// Q2
class Admin extends User {
    role = "Admin";
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(action, noteTitle) {
        console.log(`Admin ${this.name} performed '${action}' on note: "${noteTitle}"`);
    }
    displayInfo() {
        console.log("--- Admin Info ---");
        super.displayInfo();
        console.log(`Role: ${this.role}`);
    }
}
// Q3 & Q6
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        const shortContent = this.content.length > 20
            ? `${this.content.substring(0, 20)}...`
            : this.content;
        return `${this.title} (By: ${this.author.name})\n${shortContent}`;
    }
}
// Q4
class NoteBook {
    id;
    title;
    description;
    notes = [];
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    addNote(noteId, title, content, author) {
        const newNote = new Note(noteId, title, content, author);
        this.notes.push(newNote);
        console.log(`Note added: ${newNote.preview()}`);
    }
    removeNote(noteId) {
        const noteIndex = this.notes.findIndex((note) => note.id === noteId);
        if (noteIndex !== -1) {
            this.notes.splice(noteIndex, 1);
            console.log(`Note removed: ${noteId}`);
        }
        else {
            console.log("Note not found");
        }
    }
    displayNotes() {
        console.log(`=== ${this.title} ===`);
        this.notes.forEach((note) => console.log(note.preview()));
    }
}
// Q7
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
        console.log("Item added to storage.");
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            console.log("Item removed from storage.");
        }
        else {
            console.log("Item not found in storage.");
        }
    }
    getAllItems() {
        return this.items;
    }
}
// Testing
const user1 = new User(1, "Omar", "oalash55@gmail.com", "12345678", "01224084982", 20);
const admin1 = new Admin(2, "Ahmed", "admin@site.com", "admin999", "01000000000", 30);
const studyNotebook = new NoteBook(10, "TypeScript Course", "Notes for TypeScript learning.");
const workNotebook = new NoteBook(20, "Backend Tasks", "Notes for backend development.");
studyNotebook.addNote(101, "OOP Basics", "Classes, Inheritance, Composition, Aggregation, and Association.", user1);
studyNotebook.addNote(102, "Access Modifiers", "Public, Private, and Protected in TypeScript.", user1);
user1.addNoteBook(studyNotebook);
user1.addNoteBook(workNotebook);
console.log("\n--- User Info ---");
user1.displayInfo();
console.log("\n--- Notebook Notes ---");
studyNotebook.displayNotes();
console.log("\n--- Admin Actions ---");
admin1.displayInfo();
admin1.manageNotes("delete", "Outdated Note");
console.log("\n--- Generic Storage ---");
const userStorage = new Storage();
userStorage.addItem(user1);
userStorage.addItem(admin1);
console.log("Users Count in Storage:", userStorage.getAllItems().length);
const notebookStorage = new Storage();
notebookStorage.addItem(studyNotebook);
notebookStorage.addItem(workNotebook);
notebookStorage.removeItem(workNotebook);
console.log("Notebooks Count in Storage:", notebookStorage.getAllItems().length);
//# sourceMappingURL=user.js.map