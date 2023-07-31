import { useContext } from "react";
import FormValidator from "../features/components/FormValidator";
import {
  useUserId,
  useUserIdUpdate,
} from "../features/components/GlobalsContext";
import { useNavigate } from "react-router-dom";
import "./RegistrationFormStyle.scss";

export const RegistrationForm = () => {
  let selectedUser = useUserId();
  const navigate = useNavigate();
  const setselectedUser = useUserIdUpdate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    if (isFormValid(formData)) {
      console.log(formData);

      if (selectedUser) {
        console.log("editing in DB");

        try {
          delete formData._id;
          console.log(JSON.stringify(formData));
          console.log(`http://127.0.0.1:3000/posts/${selectedUser._id}`);
          const response = await fetch(
            `http://127.0.0.1:3000/posts/${selectedUser._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (response.ok) {
            console.log("User data updated successfully!");
            navigate("/usersList");
            setselectedUser(null);
          } else {
            console.log("Failed to update user data.", response);
          }
        } catch (error) {
          console.log("An error occurred:", error);
        }
      } else {
        try {
          const response = await fetch("http://127.0.0.1:3000/posts", {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("Form data submitted successfully!");
            navigate("/usersList");
          } else {
            console.log("Failed to submit form data.", response);
          }
        } catch (error) {
          console.log("An error occurred:", error);
        }
      }
    } else {
      console.log("Please fill in all fields.");
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
