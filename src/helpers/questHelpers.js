const countPhrases = (section) => {
  let result = 0;
  section.models.forEach((model) => {
    result += model.phrases.length;
  });

  return result;
};

const countNotCompletedPhraseAmount = (
  progress,
  section
) => {
  const currentModelPhrases = section.models[
    progress.modelStep
  ].phrases.slice(progress.phraseStep).length;

  const notCompletedModels = section.models.slice(
    progress.modelStep + 1
  );

  let result = 0;

  notCompletedModels.forEach((model) => {
    result += model.phrases.length;
  });

  result += currentModelPhrases;

  return result;
};

const getPercentage = (amount, notCompleted) => {
  return Math.floor(
    ((amount - notCompleted) / amount) * 100
  );
};

export {
  countPhrases,
  countNotCompletedPhraseAmount,
  getPercentage,
};
