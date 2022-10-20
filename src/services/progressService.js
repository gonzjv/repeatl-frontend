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

const createProgress = async (progress) => {
  const options = {};
  const url = `${API_URL}progressModels/`;
  const reqData = progress;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('response', data);
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

export { getProgress, createProgress };
