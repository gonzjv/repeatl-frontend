const API_URL = import.meta.env.VITE_API_URL;

const getModelState = async (
  modelSectionStateId,
  modelId,
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
  const url = `${API_URL}modelState/${modelSectionStateId}.${modelId}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const addModelState = async (
  modelSectionStateId,
  modelId,
  token
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}modelState/${modelSectionStateId}.${modelId}`;
  const options = {
    method: 'POST',
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

const completeModel = async (
  token,
  modelStateId
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}wordState/`;
  const reqData = {
    modelStateId: modelStateId,
  };
  const options = {
    method: 'PUT',
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

export {
  getModelState,
  addModelState,
  completeModel,
};
