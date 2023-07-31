import { useContext } from "react";
import FormValidator from "../features/components/FormValidator";
import {
  useGlobals,
  useGlobalsUpdate,
} from "../features/components/GlobalsContext";
import { useNavigate } from "react-router-dom";
import "./RegistrationFormStyle.scss";

export const RegistrationForm = () => {
  let selectedUser = useGlobals();
  const navigate = useNavigate();
  const setselectedUser = useGlobalsUpdate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    if (isFormValid(formData)) {
      if (selectedUser) {
        try {
          delete formData._id;
          const response = await fetch(
            `http://127.0.0.1:3000/participants/${selectedUser._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (response.ok) {
            alert("User data updated successfully!");
            navigate("/usersList");
            setselectedUser(null);
          } else {
            alert("Failed to update user data.", response);
          }
        } catch (error) {
          alert("An error occurred:", error);
        }
      } else {
        try {
          const response = await fetch("http://127.0.0.1:3000/participants", {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            alert("Form data submitted successfully!");
            navigate("/usersList");
          } else {
            alert("Failed to submit form data.", response);
          }
        } catch (error) {
          alert("An error occurred:", error);
        }
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const isFormValid = (formData) => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const onCancelEditing = () => {
    setselectedUser(null);
    window.location.reload();
  };

  return (
    <FormValidator>
      {(formData, handleInputChange, isFormValid) => (
        <form className="formItem" onSubmit={(e) => handleSubmit(e, formData)}>
          {selectedUser && <h3>Edit participant's data</h3>}
          <div className="formContainer">
            <div className="inputDiv">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="inputDiv">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="inputDiv">
              <label htmlFor="age">Age</label>
              <input
                type="date"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <p>please fill all fields</p>
            <button type="submit" disabled={!isFormValid(formData)}>
              Submit
            </button>
            {selectedUser && (
              <button onClick={onCancelEditing}>Cancel Editing</button>
            )}
          </div>
        </form>
      )}
    </FormValidator>
  );
};

export default RegistrationForm;
