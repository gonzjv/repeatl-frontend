const API_URL = import.meta.env.VITE_API_URL;

const getUser = async (userId) => {
  try {
    const response = await fetch(
      `${API_URL}users/${userId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const addUser = async (user) => {
  const options = {};
  const url = `${API_URL}users/`;
  const reqData = user;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

const loginUser = async (user) => {
  const url = `${API_URL}users/login`;
  const reqData = user;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log('Erorr:', error);
  }
};

export { getUser, addUser, loginUser };
