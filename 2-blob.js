// What is a blob in Node.js?
// Where is it used in Node?
// Why would I use it in day to day development?

// Creating and reading from a blob
{
  const blob = new Blob([
    "hello",
    "how are you?",
    new ArrayBuffer(8),
    Buffer.from("This is a buffer"),
  ]);

  blob.text().then((data) => console.log(data));

  async function printPromise(input) {
    console.log(await input);
  }

  printPromise(blob.text());

  blob.arrayBuffer().then((data) => console.log(data));
  printPromise(blob.arrayBuffer());

  blob
    .stream()
    .getReader()
    .read()
    .then((data) => console.log(data));
}

// Using a blob with fs
{
  const fs = require("fs/promises");
  const { Blob } = require("buffer");

  async function saveBlobToFile(blob, filePath) {
    const buffer = Buffer.from(await blob.arrayBuffer());
    await fs.writeFile(filePath, buffer);
  }

  async function readBlobFromFile(filePath) {
    const buffer = await fs.readFile(filePath);
    return new Blob([buffer]);
  }

  async function main() {
    const blob = new Blob(["Hello, world!"]);
    await saveBlobToFile(blob, "example.txt");

    const newBlob = await readBlobFromFile("example.txt");
    console.log(await newBlob.text()); // Output: 'Hello, world!'
  }

  main();
}
