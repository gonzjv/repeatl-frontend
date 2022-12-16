const API_URL = import.meta.env.VITE_API_URL;

const getProgressWord = async (
  collectionId,
  userId,
  token
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const options = {
    headers: myHeaders,
  };
  const url = `${API_URL}progressWord/${userId}.${collectionId}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const createProgressWord = async (
  progress,
  token
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}progressWord/`;
  const reqData = progress;
  console.log('reqData', reqData);
  const options = {
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: myHeaders,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const updateProgressWord = async (
  token,
  progress
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}progressWord/`;
  console.log('progress', progress);
  const reqData = {
    id: progress.id,
    wordStep: progress.wordStep,
    sectionStep: progress.sectionStep,
  };
  const options = {
    method: 'PUT',
    body: JSON.stringify(reqData),
    headers: myHeaders,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('data:', data);
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

export {
  createProgressWord,
  getProgressWord,
  updateProgressWord,
};
