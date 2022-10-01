const getAgeByBirthday = (dateString: string) => {
  const today = new Date();
  const birthDay = new Date(dateString);
  let age = today.getFullYear() - birthDay.getFullYear();
  const m = today.getMonth() - birthDay.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }
  return age;
};

export default getAgeByBirthday;
