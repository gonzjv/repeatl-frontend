const API_URL = import.meta.env.VITE_API_URL;

const getWordSections = async (
  token,
  collectionId
) => {
  try {
    const url = `${API_URL}wordSections/${collectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
    };
    const response = await fetch(url, {
      headers: myHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const addWordSection = async (
  token,
  wordSection,
  collectionId
) => {
  try {
    const url = `${API_URL}wordSections/${collectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(wordSection),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const deleteWordSection = async (
  token,
  wordSection
) => {
  try {
    const url = `${API_URL}wordSections/${wordSection.id}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      // 'Content-Type': 'application/json',
    };
    const options = {
      method: 'DELETE',
      // body: JSON.stringify(collection),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const addWord = async (
  token,
  word,
  wordSectionId
) => {
  try {
    const url = `${API_URL}words/${wordSectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(word),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const getWordArr = async (
  token,
  wordSectionId
) => {
  try {
    const url = `${API_URL}words/${wordSectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
    };
    const response = await fetch(url, {
      headers: myHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const deleteWord = async (token, wordId) => {
  try {
    const url = `${API_URL}words/${wordId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      // 'Content-Type': 'application/json',
    };
    const options = {
      method: 'DELETE',
      // body: JSON.stringify(collection),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

export {
  getWordSections,
  addWordSection,
  deleteWordSection,
  getWordArr,
  addWord,
  deleteWord,
};
