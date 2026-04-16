const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const errorDiv = document.getElementById("error-message");

    const wordEl = document.getElementById("word");
    const phoneticEl = document.getElementById("phonetic");
    const posEl = document.getElementById("part-of-speech");
    const definitionEl = document.getElementById("definition");
    const exampleEl = document.getElementById("example");
    const synonymsEl = document.getElementById("synonyms");
    const audioEl = document.getElementById("audio");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      fetchWord(input.value);
    });

    async function fetchWord(word) {
      try {
        errorDiv.textContent = "";
        errorDiv.classList.add("hidden");

        if (!word) {
          throw new Error("Please enter a word");
        }

        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!res.ok) {
          throw new Error("Word not found");
        }

        const data = await res.json();

        displayWord(data[0]);

      } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");
      }
    }

    function displayWord(data) {
      wordEl.textContent = data.word;
      phoneticEl.textContent = data.phonetic || "";

      const meaning = data.meanings[0];
      const def = meaning.definitions[0];

      posEl.textContent = meaning.partOfSpeech;
      definitionEl.textContent = def.definition;
      exampleEl.textContent = def.example || "No example available";

      const synonyms = def.synonyms || [];
      synonymsEl.textContent = synonyms.join(", ");

      const audio = data.phonetics.find(p => p.audio);
      if (audio) {
        audioEl.src = audio.audio;
      }
    }