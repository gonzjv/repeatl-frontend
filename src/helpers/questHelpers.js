const countPhrases = (section) => {
  let result = 0;
  section.models.forEach((model) => {
    result += model.phrases.length;
  });

  return result;
};

export { countPhrases };
