import React, { useState, useEffect } from "react";
import { useUserId, useUserIdUpdate } from "./GlobalsContext";

const FormValidator = ({ children }) => {
  const selectedUser = useUserId();

  useEffect(() => {
    // If there's editData provided, populate the form with the user data
    if (selectedUser) {
      console.log("From FormValidator:");
      console.log(selectedUser);
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const [formData, setFormData] = useState({
    name: selectedUser ? selectedUser.name : "",
    lastName: selectedUser ? selectedUser.lastName : "",
    email: selectedUser ? selectedUser.email : "",
    age: selectedUser ? selectedUser.age : "",
  });

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate if all fields are filled
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  // Render the form fields using the children prop function
  return children(formData, handleInputChange, isFormValid);
};

export default FormValidator;
