// src/utils/storage.js
export const saveData = async (key, data) => {
  // chrome.storage.local (if available)
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    chrome.storage.local.set({ [key]: data });
  }
  // fallback localStorage
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadData = async (key) => {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        if (result[key]) resolve(result[key]);
        else resolve(JSON.parse(localStorage.getItem(key)));
      });
    });
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};
