const API_URL =
  'https://repeatl-backend.onrender.com';

const getCourses = async () => {
  try {
    const response = await fetch(
      `${API_URL}/courses`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

const getCollections = async (courseId) => {
  try {
    const response = await fetch(
      `${API_URL}/collections/${courseId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

export { getCourses, getCollections };
