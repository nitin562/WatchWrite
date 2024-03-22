const createToast = (message,setErrors) => {
  if(!setErrors){
    return
  }
  const element = { id: Date.now(), message };
  setErrors((prev) => [...prev, element]);
  setTimeout(()=>{
    removeToast(element.id,setErrors)
  },3000)
};
const removeToast = (id,setErrors) => {
  setErrors((prev) => {
    return prev.filter((value) => value.id !== id);
  });
};

export { createToast };
