let truths = [];
let lies = [];

async function loadFile(path) {
    const res = await fetch(path);

    if (!res.ok) {
        throw new Error(`Failed to load ${path} (${res.status})`);
    }

    return await res.text();
}

async function init() {
    try {
        // IMPORTANT: NO "davide/" here
        const truthsText = await loadFile("truths.txt");
        const liesText = await loadFile("lies.txt");

        truths = truthsText
            .split("\n")
            .map(l => l.trim())
            .filter(Boolean);

        lies = liesText
            .split("\n")
            .map(l => l.trim())
            .filter(Boolean);

        showRandom();

    } catch (err) {
        console.error(err);
        document.getElementById("sentence").innerText =
            "File loading failed (check console)";
    }
}

function showRandom() {
    const pool = [...truths, ...lies];

    if (pool.length === 0) {
        document.getElementById("sentence").innerText = "No data loaded";
        return;
    }

    const i = Math.floor(Math.random() * pool.length);
    document.getElementById("sentence").innerText = pool[i];
}
