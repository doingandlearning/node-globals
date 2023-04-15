{
  const ac = new AbortController();

  ac.signal.addEventListener("abort", () => console.log("Aborted!"), {
    once: true,
  });

  ac.abort();

  console.log(ac.signal.aborted); // Prints True
}

{
  const ac = new AbortController();

  new Promise((resolve, reject) => {
    ac.signal.addEventListener("abort", () => reject("Operation aborted."));
    setTimeout(() => resolve("Promise resolved."), 100);
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

  ac.abort();
}

{
  const ac = new AbortController();

  fetch("https://api.github.com/users", { signal: ac.signal })
    .then((data) => data.json())
    .then((data) => console.log(data))
    .catch((error) => {
      if (error.name === "AbortError") {
        console.log("The operation was aborted.");
      } else {
        console.log(error);
      }
    });

  ac.abort();
}
