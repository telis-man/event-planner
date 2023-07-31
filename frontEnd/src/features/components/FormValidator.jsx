import React, { useState, useEffect } from "react";
import { useGlobals } from "./GlobalsContext";

const FormValidator = ({ children }) => {
  const selectedUser = useGlobals();

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const [formData, setFormData] = useState({
    name: selectedUser ? selectedUser.name : "",
    lastName: selectedUser ? selectedUser.lastName : "",
    email: selectedUser ? selectedUser.email : "",
    age: selectedUser ? selectedUser.age : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  return children(formData, handleInputChange, isFormValid);
};

export default FormValidator;
