import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function run() {
  try {
    const configDoc = await getDoc(doc(db, 'config', 'general'));
    console.log("CONFIG:", configDoc.data());

    const candidatesSnap = await getDocs(collection(db, 'candidates'));
    const candidates = candidatesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log("CANDIDATES:", candidates.map(c => ({ name: c.name, position: c.position, voteCount: c.voteCount })));

    const mesasSnap = await getDocs(collection(db, 'mesas'));
    const mesas = mesasSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log("MESAS:", mesas.map(m => ({ name: m.name, grade: m.grade })));

    const statsDoc = await getDoc(doc(db, 'stats', 'general'));
    console.log("STATS:", statsDoc.data());

    process.exit(0);
  } catch (e) {
    console.error("ERROR:", e);
    process.exit(1);
  }
}

run();
