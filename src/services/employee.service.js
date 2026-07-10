//Image upload service
const processImageUpload =  (file) => {
  return {
    filename: file.filename,
    
    path: `uploads/${file.filename}`,
  };
};


export { processImageUpload};
