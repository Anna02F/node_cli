import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

const interpolate = (html, data) => {
  // {{notes }}  -> data.notes
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `<li class='note'><span>${
        note.content
      }</span><p class='tags'>${note.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("")}</p></li>`;
    })
    .join("\n");
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./index.html", import.meta.url).pathname;
    const templateHtml = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(templateHtml, { notes: formatNotes(notes) });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);
  const address = `http://localhost:${port}`;
  server.listen(port, () => {
    console.log(`Server is running on ${address}`);

    open(address);
  });
};
