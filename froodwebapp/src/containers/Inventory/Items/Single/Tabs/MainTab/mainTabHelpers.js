/* eslint-disable default-case */
import { crossJoinArrays } from 'utils';

const generateOptionCombinations = (options) => {
  const values = options.map(option => option.values.map(obj => obj.value)); // get values
  return crossJoinArrays(values[0], values[1], values[2]); // combine all possible values
};

export const generateNewItemProductVariants = (options) => {
  if (options.length > 1) {
    const optionCombinations = generateOptionCombinations(options);

    return optionCombinations.map(optionCombination => ({
      id: optionCombination.join('/'),
      name: optionCombination.join('/'),
      options: optionCombination,
      sku: ''
    }));
  }

  return [];
};

export const addExistingItemProductVariantsByTag = (
  defaultVariantColumnValues,
  options,
  tag,
  notIncludeExistingVariants,
  existingVariants
) => {
  if (options.length > 1) {
    const newGeneratedVariantsWithNewTag = generateOptionCombinations(options).filter(variant => variant.includes(tag));
    const newVariants = [];

    newGeneratedVariantsWithNewTag.forEach((newVariant) => {

      const variant = {
        sku: '',
        options: [],
        new: true,
        ...defaultVariantColumnValues
      };

      newVariant.forEach((optionValue) => {
        const optionKey = options.find(option => option.values.find(obj => obj.value === optionValue)).key;
        variant.options.push(optionValue);

        variant[optionKey.toLowerCase()] = optionValue;
      });
      newVariants.push(variant);
    });
    if (notIncludeExistingVariants) {
      return newVariants;
    }
    return [...existingVariants, ...newVariants];
  }
  return [];
};

export const deleteExistingItemProductVariantsByTag = (
  existingVariants,
  tag
) => existingVariants.filter(variant => !Object.values(variant).includes(tag));

export const convertItemOptions = (updatedOptions, tag, updatedIndex) => {
  const options = updatedOptions;
  const newOptionValue = {
    closable: true,
    value: tag
  };
  const tagIndex = options[updatedIndex].values.indexOf(tag);
  options[updatedIndex].values[tagIndex] = newOptionValue;
  return options;
};

export const initializeItemOptions = options => options.map(option => ({
  id: option.id,
  key: option.key,
  values: option.values.map(value => ({
    value,
    closable: false
  }))
}));

export const initializeItemVariants = (variants, options) => (
  variants.map((variant) => {
    const newVariant = {
      id: variant.id,
      sku: variant.sku,
      originCountryId: variant.originCountryId,
      taxCategoryId: variant.taxCategoryId,
      defaultLocationId: variant.defaultLocationId,
      storageConditionId: variant.storageConditionId,
      statusId: variant.statusId,
      options: variant.options.map(option => option.value)
    };

    variant.options.forEach(({ value }) => {
      const optionKey = options.find(option => option.values.includes(value)).key;

      newVariant[optionKey.toLowerCase()] = value;
    });

    return newVariant;
  })
);
