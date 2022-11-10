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

const addModelSection = async (
  token,
  modelSection,
  modelSubCollectionId
) => {
  try {
    const url = `${API_URL}modelSections/${modelSubCollectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(modelSection),
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

const addModel = async (
  token,
  model,
  modelSectionId
) => {
  try {
    const url = `${API_URL}models/${modelSectionId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(model),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const getModels = async (
  token,
  modelSectionId
) => {
  try {
    const url = `${API_URL}models/${modelSectionId}`;
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

export {
  getModelSections,
  deleteModelSection,
  addModelSection,
  addModel,
  getModels,
};
