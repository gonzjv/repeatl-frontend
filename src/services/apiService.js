const getCourses = async () => {
  try {
    const response = await fetch(
      `http://localhost:4000/courses`
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
      `http://localhost:4000/collections/${courseId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erorr', error);
  }
};

export { getCourses, getCollections };
