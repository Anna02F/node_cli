import { beforeEach, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  saveDB: jest.fn(),
  getDB: jest.fn(),
}));

const { insertDB, saveDB, getDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  saveDB.mockClear();
  getDB.mockClear();
});

describe("cli commands", () => {
  test("New note inserts note and returns it ", async () => {
    const note = {
      content: "test content",
      tags: ["test"],
      id: 1,
    };
    insertDB.mockResolvedValue(note);
    const result = await newNote(note.content, note.tags);
    expect(result.content).toEqual(note.content);
    expect(result.tags).toEqual(note.tags);
  });

  test("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };

    getDB.mockResolvedValue(db);

    const result = await getAllNotes(db);
    expect(result).toEqual(db.notes);
  });

  test("RemoveNote returns undefined if id is not found", async () => {
    const notes = [
      {
        content: "content1",
        tags: ["test1"],
        id: "1",
      },
      {
        content: "content2",
        tags: ["test2"],
        id: "2",
      },
    ];
    saveDB.mockResolvedValue(notes);
    const idToRemove = "3";
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});
