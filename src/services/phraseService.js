const API_URL = import.meta.env.VITE_API_URL;

const getPhrases = async (token, modelId) => {
  try {
    const url = `${API_URL}phrases/${modelId}`;
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

const addPhrase = async (
  token,
  phrase,
  modelId
) => {
  try {
    const url = `${API_URL}phrases/${modelId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(phrase),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const deletePhrase = async (token, phraseId) => {
  try {
    const url = `${API_URL}phrases/${phraseId}`;
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

export { getPhrases, addPhrase, deletePhrase };
