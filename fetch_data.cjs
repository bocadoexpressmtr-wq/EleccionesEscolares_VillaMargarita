const https = require('https');

const projectId = "gen-lang-client-0241030757";
const databaseId = "ai-studio-6680ca9c-ea81-4e95-bd35-3ecabc665f62";
const apiKey = "AIzaSyCE6pxvxJF8aBf4ydhlg-1D-ToW16wbRSY";
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents`;

function fetchDocs(collection) {
  return new Promise((resolve, reject) => {
    https.get(`${baseUrl}/${collection}?key=${apiKey}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const [mesas, candidates, config, stats] = await Promise.all([
      fetchDocs('mesas'),
      fetchDocs('candidates'),
      fetchDocs('config/general'),
      fetchDocs('stats/general')
    ]);
    
    console.log("MESAS RAW:", JSON.stringify(mesas, null, 2));
    console.log("CANDIDATES RAW:", JSON.stringify(candidates, null, 2));
    console.log("CONFIG RAW:", JSON.stringify(config, null, 2));
    console.log("STATS RAW:", JSON.stringify(stats, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
