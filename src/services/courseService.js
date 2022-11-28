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

const addCourse = async (token, course) => {
  try {
    const url = `${API_URL}courses`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(course),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const deleteCourse = async (token, course) => {
  try {
    const url = `${API_URL}courses/${course.id}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    };
    const options = {
      method: 'DELETE',
      body: JSON.stringify(course),
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const addDataFromFile = async (
  token,
  file,
  courseId
) => {
  try {
    const url = `${API_URL}courses/upload/csv/${courseId}`;
    const bearerToken = 'Bearer ' + token;
    const myHeaders = {
      Authorization: bearerToken,
      // 'Content-Type': 'multipart/form-data',
    };
    const data = new FormData();
    data.append('csvFile', file);
    const options = {
      method: 'POST',
      body: data,
      headers: myHeaders,
    };

    const response = await fetch(url, options);
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log('Erorr', error);
  }
};

export {
  getCourses,
  addCourse,
  deleteCourse,
  addDataFromFile,
};
