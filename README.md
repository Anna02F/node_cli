# Notes CLI and HTTP Server

A CLI-based note-taking app for managing notes, alongside an HTTP server to handle requests and serve a basic UI, built using Node.js.

Project Background

> This project was developed during my Node.js course on Frontend Masters, providing hands-on experience with Node.js core modules in building a practical, server-side solution. 

Tools and technologies used:

- *Node.js* `fs` and `http` modules
- *Jest* for testing
- *[Yargs](https://www.npmjs.com/package/yargs)* for managing CLI commands
- Custom *HTTP server* for handling requests and serving a simple website

## Commands

To see all available commands and options, run `note --help` .
```
note new <note>: Create a new note
note all: Retrieve all notes
note find <filter>: Get notes that match the filter
note remove <id>: Remove a note by ID
note web [port]: Launch a website to view notes (default port is 3000)
note clean: Remove all notes
```

### Getting started
1. Clone repo
```
git clone https://github.com/your-username/node_cli.git
cd node_cli
```
2. Install dependencies
```
npm install
```
3. See all commands for the `note` CLI
```
note --help
```
4. Create a new note
```
note new "Read articles" --tags "Work"
```
5. Start the HTTP server
```
note web
```
6. If port `3000` is already in use, you can specify another port
```
note web 4000
```
