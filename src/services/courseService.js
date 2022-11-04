const API_URL = import.meta.env.VITE_API_URL;

const getCourses = async (token) => {
  try {
    const url = `${API_URL}courses`;
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

export { getCourses };
