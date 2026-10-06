import { useState } from "react";

// Form handling: controlled inputs with useState, onChange, onSubmit.
// Props: properties (list shown in the dropdown), defaultProperty (pre-selected)
function ContactForm({ properties, defaultProperty }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: defaultProperty || "",
    purpose: "Buy",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // onChange: update only the field that was typed in
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Basic validation: returns an object with error messages
  function validate() {
    const newErrors = {};
    if (formData.name.trim() === "") newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (formData.property === "") newErrors.property = "Please select a property";
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  }

  // onSubmit: validate, then POST the data to the Express backend
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Thank you! Your enquiry has been sent.");
        setFormData({ name: "", email: "", phone: "", property: defaultProperty || "", purpose: "Buy", message: "" });
      } else {
        setServerError(data.message);
      }
    } catch (error) {
      setServerError("Could not reach the server. Is the backend running?");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      {errors.name && <span className="error">{errors.name}</span>}

      <label>Email</label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}

      <label>Phone</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <label>Property</label>
      <select name="property" value={formData.property} onChange={handleChange}>
        <option value="">Select a property</option>
        {properties.map((p) => (
          <option key={p.id} value={p.name + " - " + p.location}>
            {p.name} - {p.location}
          </option>
        ))}
      </select>
      {errors.property && <span className="error">{errors.property}</span>}

      <label>Interested in</label>
      <select name="purpose" value={formData.purpose} onChange={handleChange}>
        <option value="Buy">Buy</option>
        <option value="Rent">Rent</option>
      </select>

      <label>Message</label>
      <textarea name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
      {errors.message && <span className="error">{errors.message}</span>}

      <button type="submit" className="btn btn-green">
        Send Enquiry
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
      {serverError && <p className="error">{serverError}</p>}
    </form>
  );
}

export default ContactForm;
