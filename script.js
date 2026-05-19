let truths = [];
let lies = [];
let currentPerson = "";

async function init(person) {
    currentPerson = person;

    try {
        // IMPORTANT: no leading "/" here
        const truthsText = await fetch(`${person}/truths.txt`).then(r => r.text());
        const liesText = await fetch(`${person}/lies.txt`).then(r => r.text());

        truths = truthsText
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        lies = liesText
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        if (truths.length === 0 && lies.length === 0) {
            document.getElementById("sentence").innerText =
                "No data loaded (check txt files)";
            return;
        }

        showRandom();

    } catch (err) {
        console.error("File loading error:", err);

        document.getElementById("sentence").innerText =
            "Error loading files (check console)";
    }
}

function showRandom() {
    const hasTruths = truths.length > 0;
    const hasLies = lies.length > 0;

    if (!hasTruths && !hasLies) {
        document.getElementById("sentence").innerText = "No data loaded";
        return;
    }

    // equal probability if both exist
    let pool;

    if (hasTruths && hasLies) {
        pool = Math.random() < 0.5 ? truths : lies;
    } else {
        pool = hasTruths ? truths : lies;
    }

    const index = Math.floor(Math.random() * pool.length);

    document.getElementById("sentence").innerText =
        pool[index] || "Empty line";
}