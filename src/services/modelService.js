const API_URL = import.meta.env.VITE_API_URL;

const getModelSections = async (
  token,
  modelSubCollectionId
) => {
  try {
    const url = `${API_URL}modelSections/${modelSubCollectionId}`;
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

const addCollection = async (
  token,
  collection,
  courseId
) => {
  try {
    const url = `${API_URL}collections/${courseId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(collection),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const deleteModelSection = async (
  token,
  modelSection
) => {
  try {
    const url = `${API_URL}modelSections/${modelSection.id}`;
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

export { getModelSections, deleteModelSection };
