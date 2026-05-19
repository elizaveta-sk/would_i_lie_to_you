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
        // WE ARE INSIDE /davide/, so use direct filenames
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
            "Loading failed (check console)";
    }
}

function showRandom() {
    let pool;

    const pickTruth = Math.random() < 0.5;

    if (pickTruth && truths.length > 0) {
        pool = truths;
    } else if (lies.length > 0) {
        pool = lies;
    } else {
        // fallback if one file is empty
        pool = truths.length ? truths : lies;
    }

    const i = Math.floor(Math.random() * pool.length);
    document.getElementById("sentence").innerText = pool[i];
}
