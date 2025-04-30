import { DB_NAME, STORE_NAME } from "../constants";
export const saveToIndexedDB = (key, value) => {
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore(STORE_NAME);
  };
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, key);
    tx.oncomplete = () => db.close();
  };
}

export const loadFromIndexedDB = (key, callback) => {
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore(STORE_NAME);
  };
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(key);
    getReq.onsuccess = () => {
      callback(getReq.result);
      db.close();
    };
  };
}
