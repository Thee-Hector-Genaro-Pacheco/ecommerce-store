import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations/createUser";
import { GET_PRESIGNED_URL } from "../graphql/mutations/getPresignedUrl";
import { toast } from "react-hot-toast";
import "../styles/RegisterPage.css"; // Assuming you have a CSS file for styles

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [createUser] = useMutation(CREATE_USER);
  const [getPresignedUrl] = useMutation(GET_PRESIGNED_URL);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const uploadImageToS3 = async (file: File): Promise<string> => {
    const { data } = await getPresignedUrl({
      variables: {
        filename: file.name,
        folder: "profile-pictures",
      },
    });

    const url = data.getPresignedUrl;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!res.ok) throw new Error("Image upload failed");

    return url.split("?")[0]; // remove query params
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profileImageUrl = "";

      if (profilePicture) {
        profileImageUrl = await uploadImageToS3(profilePicture);
      }

      await createUser({
        variables: {
          input: {
            username,
            email,
            password,
            gender,
            age: parseInt(age),
            phone,
            country,
            profilePicture: profileImageUrl,
            address: {
              street,
              apartment,
              city,
              state,
              zipCode,
            },
          },
        },
      });

      toast.success("User registered successfully!");
    } catch (err: any) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="form-container">
    <form onSubmit={handleSubmit} className="form-box">
      <h2 className="form-title">Register</h2>
      <input className="form-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="form-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="form-input" type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
      <input className="form-input" type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input className="form-input" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className="form-input" type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
      <input className="form-input" type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
      <input className="form-input" type="text" placeholder="Apartment" value={apartment} onChange={(e) => setApartment(e.target.value)} />
      <input className="form-input" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input className="form-input" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
      <input className="form-input" type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      <input className="form-input" type="file" accept="image/*" onChange={handleFileChange} />
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
);

};

export default RegisterPage;
