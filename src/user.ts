// Q1
class User {
  public id: number;
  public name: string;
  protected email: string;
  private password: string;
  public phone: string;
  private _age!: number;
  // Q5
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  public get age(): number {
    return this._age;
  }

  public set age(v: number) {
    if (v >= 18 && v <= 60) {
      this._age = v;
    } else {
      throw new Error("Age must be between 18 and 60");
    }
  }

  // Q5
  public addNoteBook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
    console.log(`NoteBook "${notebook.title}" added to ${this.name}`);
  }

  public removeNoteBook(notebookId: number): void {
    const index = this.notebooks.findIndex((nb) => nb.id === notebookId);
    if (index !== -1) {
      this.notebooks.splice(index, 1);
      console.log(`NoteBook with ID ${notebookId} removed from ${this.name}`);
    } else {
      console.log(`NoteBook with ID ${notebookId} not found`);
    }
  }

  public displayInfo(): void {
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
  private role: string = "Admin";

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }

  public manageNotes(
    action: "create" | "delete" | "update",
    noteTitle: string,
  ): void {
    console.log(
      `Admin ${this.name} performed '${action}' on note: "${noteTitle}"`,
    );
  }

  public override displayInfo(): void {
    console.log("--- Admin Info ---");
    super.displayInfo();
    console.log(`Role: ${this.role}`);
  }
}

// Q3 & Q6
class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public author: User,
  ) {}

  public preview(): string {
    const shortContent =
      this.content.length > 20
        ? `${this.content.substring(0, 20)}...`
        : this.content;
    return `${this.title} (By: ${this.author.name})\n${shortContent}`;
  }
}

// Q4
class NoteBook {
  private notes: Note[] = [];

  constructor(
    public id: number,
    public title: string,
    public description: string,
  ) {}

  public addNote(
    noteId: number,
    title: string,
    content: string,
    author: User,
  ): void {
    const newNote = new Note(noteId, title, content, author);
    this.notes.push(newNote);
    console.log(`Note added: ${newNote.preview()}`);
  }

  public removeNote(noteId: number): void {
    const noteIndex = this.notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      console.log(`Note removed: ${noteId}`);
    } else {
      console.log("Note not found");
    }
  }

  public displayNotes(): void {
    console.log(`=== ${this.title} ===`);
    this.notes.forEach((note) => console.log(note.preview()));
  }
}

// Q7
class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
    console.log("Item added to storage.");
  }

  public removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log("Item removed from storage.");
    } else {
      console.log("Item not found in storage.");
    }
  }

  public getAllItems(): T[] {
    return this.items;
  }
}

// Testing
const user1 = new User(
  1,
  "Omar",
  "oalash55@gmail.com",
  "12345678",
  "01224084982",
  20,
);
const admin1 = new Admin(
  2,
  "Ahmed",
  "admin@site.com",
  "admin999",
  "01000000000",
  30,
);

const studyNotebook = new NoteBook(
  10,
  "TypeScript Course",
  "Notes for TypeScript learning.",
);
const workNotebook = new NoteBook(
  20,
  "Backend Tasks",
  "Notes for backend development.",
);

studyNotebook.addNote(
  101,
  "OOP Basics",
  "Classes, Inheritance, Composition, Aggregation, and Association.",
  user1,
);
studyNotebook.addNote(
  102,
  "Access Modifiers",
  "Public, Private, and Protected in TypeScript.",
  user1,
);

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
const userStorage = new Storage<User>();
userStorage.addItem(user1);
userStorage.addItem(admin1);
console.log("Users Count in Storage:", userStorage.getAllItems().length);

const notebookStorage = new Storage<NoteBook>();
notebookStorage.addItem(studyNotebook);
notebookStorage.addItem(workNotebook);
notebookStorage.removeItem(workNotebook);
console.log(
  "Notebooks Count in Storage:",
  notebookStorage.getAllItems().length,
);
