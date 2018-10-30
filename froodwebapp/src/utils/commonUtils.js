export const getRandomId = () => (
  Math.random().toString(36).substring(3, 7)
);

export const showPdfPreview = (pdfData) => {
  const file = new Blob([pdfData], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};

export const checkNegative = value => (
  Number(value) < 0 ? 0 : Number(value)
);

export const toFixed2 = value => (
  value ? Number(value).toFixed(2) : '0.00'
);

export const getMaxId = (array) => {
  if (array.length) {
    return array.length && array.map(f => f.id).reduce((a, b) => Math.max(a, b)) + 1;
  }

  return 0;
};
