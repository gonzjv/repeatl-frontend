const API_URL = import.meta.env.VITE_API_URL;

const getCollectionState = async (
  courseStateId,
  collectionId,
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
  const url = `${API_URL}collectionState/${courseStateId}.${collectionId}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const addCollectionState = async (
  courseStateId,
  collectionId,
  token
) => {
  const bearerToken = 'Bearer ' + token;
  const myHeaders = {
    'Content-Type': 'application/json',
    Authorization: bearerToken,
  };
  const url = `${API_URL}collectionState/${courseStateId}.${collectionId}`;
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

// const updateProgress = async (
//   token,
//   progress
// ) => {
//   const bearerToken = 'Bearer ' + token;
//   const myHeaders = {
//     'Content-Type': 'application/json',
//     Authorization: bearerToken,
//   };
//   const url = `${API_URL}progressModels/`;
//   console.log('progress', progress);
//   const reqData = {
//     id: progress.id,
//     modelStep: progress.modelStep,
//     phraseStep: progress.phraseStep,
//     sectionStep: progress.sectionStep,
//   };
//   const options = {
//     method: 'PUT',
//     body: JSON.stringify(reqData),
//     headers: myHeaders,
//   };
//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log('data:', data);
//     return data;
//   } catch (error) {
//     console.log('Erorr:', error);
//   }
// };

export { getCollectionState, addCollectionState };
