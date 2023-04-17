{
  const ac = new AbortController();

  ac.signal.addEventListener("abort", () => console.log("Aborted!"), {
    once: true,
  });

  ac.abort();

  console.log(ac.signal.aborted);
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

  async function cancellablePromise(signal) {
    try {
      const data = await new Promise((resolve, reject) => {
        signal.addEventListener("abort", () =>
          reject("Operation aborted inside function.")
        );
        setTimeout(() => resolve("Promise resolved."), 100);
      });
      console.log(data.toUpperCase());
    } catch (error) {
      console.log(error);
    }
  }
  cancellablePromise(ac.signal);
  ac.abort();
}

{
  const ac = new AbortController();

  async function printGithubData(signal) {
    try {
      const response = await fetch("https://api.github.com/user", { signal });
      if (!response.ok) {
        throw new Error(`Problem with request. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("The request was aborted."); // Or even fail silently.
      } else {
        console.log(error);
      }
    }
  }
  printGithubData(ac.signal);
  ac.abort();
}
