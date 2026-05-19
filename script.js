let truths = [];
let lies = [];
let currentPerson = "";

async function loadFile(path) {
    const res = await fetch(path);

    if (!res.ok) {
        throw new Error(`Failed to load ${path} (${res.status})`);
    }

    return await res.text();
}

async function init(person) {
    currentPerson = person;

    try {
        // IMPORTANT: relative paths from index.html inside /davide or /liz
        const basePath = `./${person}`;

        const truthsText = await loadFile(`${basePath}/truths.txt`);
        const liesText = await loadFile(`${basePath}/lies.txt`);

        truths = truthsText
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        lies = liesText
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        showRandom();

    } catch (err) {
        console.error("Loading error:", err);

        document.getElementById("sentence").innerText =
            "Error loading files (check console + file paths)";
    }
}

function showRandom() {
    const pool = [...truths, ...lies];

    if (pool.length === 0) {
        document.getElementById("sentence").innerText =
            "No data loaded";
        return;
    }

    const index = Math.floor(Math.random() * pool.length);

    document.getElementById("sentence").innerText = pool[index];
}
