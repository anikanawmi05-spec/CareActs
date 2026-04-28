const fs = require('fs');
const path = require('path');

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

const content = fs.readFileSync('tips.js', 'utf8');

let tips = [];
let moodTips = [];

try {
    // Evaluate the content of tips.js to get the variables
    const data = eval(`(function() {
        ${content};
        return {
            tips: typeof tips !== 'undefined' ? tips : [], 
            moodTips: typeof moodTips !== 'undefined' ? moodTips : []
        };
    })()`);
    
    tips = data.tips;
    moodTips = data.moodTips;
} catch (e) {
    console.error("Error evaluating tips.js:", e);
    process.exit(1);
}

console.log(`Found ${tips.length} tips and ${moodTips.length} mood tips.`);

// 1. Save Moods
fs.writeFileSync(path.join('data', 'moods.json'), JSON.stringify(moodTips));
console.log('Saved moods.json');

// 2. Group and Save Relationships
const grouped = {};
tips.forEach(t => {
    // Create a safe filename (e.g. "Father / Mother" -> "father___mother")
    const key = t.relation.toLowerCase().replace(/[\/\s]+/g, '_');
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
});

for (const [key, items] of Object.entries(grouped)) {
    fs.writeFileSync(path.join('data', `${key}.json`), JSON.stringify(items));
    console.log(`Saved ${key}.json (${items.length} tips)`);
}

console.log('Split complete!');
