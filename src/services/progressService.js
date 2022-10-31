const API_URL = import.meta.env.VITE_API_URL;

const getProgress = async (
  subCollectionId,
  userId
) => {
  try {
    const response = await fetch(
      `${API_URL}progressModels/${userId}.${subCollectionId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const createProgress = async (
  progress,
  token
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}progressModels/`;
  const reqData = progress;
  const options = {
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: myHeaders,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('response', data);
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

export { getProgress, createProgress };
