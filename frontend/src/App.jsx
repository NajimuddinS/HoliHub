import { useEffect, useState } from "react";

const emptyPassenger = {
  name: "",
  age: "",
  gender: "",
  contact: "",
  email: "",
  photo: null,
  idCard: null,
};

function App() {
  const [passengers, setPassengers] = useState([]); // State to store all passengers
  const [currentPassenger, setCurrentPassenger] = useState({
    ...emptyPassenger,
  }); // State for the current form data

  useEffect(() => {
    fetch("https://holihub.onrender.com/passengers")
      .then((res) => res.json())
      .then((data) => setPassengers(data))
      .catch((error) => console.error("Error fetching passengers:", error));
  }, []);

  const handleAddPassenger = () => {
    // Add the current passenger to the passengers list
    setPassengers([...passengers, currentPassenger]);
    // Reset the form to empty
    setCurrentPassenger({ ...emptyPassenger });
  };

  const handleChange = (field, value) => {
    setCurrentPassenger({ ...currentPassenger, [field]: value });
  };

  const handleFileChange = (field, file) => {
    setCurrentPassenger({ ...currentPassenger, [field]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", currentPassenger.name);
      formData.append("age", currentPassenger.age);
      formData.append("gender", currentPassenger.gender);
      formData.append("contact", currentPassenger.contact);
      formData.append("email", currentPassenger.email);
      if (currentPassenger.photo)
        formData.append("photo", currentPassenger.photo);
      if (currentPassenger.idCard)
        formData.append("idCard", currentPassenger.idCard);

      const response = await fetch("https://holihub.onrender.com/passengers", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setPassengers([...passengers, result]); // Update the state with the new passenger
      setCurrentPassenger({ ...emptyPassenger }); // Reset form
      alert("Passenger registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register passenger.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Passenger Registration Form
        </h1>

        {/* Static Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Passenger</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={currentPassenger.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  value={currentPassenger.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <select
                  required
                  value={currentPassenger.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  value={currentPassenger.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={currentPassenger.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange("photo", e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    border-2
                    hover:file:bg-indigo-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID Card (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    handleFileChange("idCard", e.target.files[0])
                  }
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    border-2
                    file:text-sm file:font-semibold 
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddPassenger}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Passenger
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Table to display submitted passengers */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Submitted Passengers
          </h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">Gender</th>
                <th className="py-2 px-4 border-b">Contact</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Photo</th>
                <th className="py-2 px-4 border-b">ID Card</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{passenger.name}</td>
                  <td className="py-2 px-4 border-b">{passenger.age}</td>
                  <td className="py-2 px-4 border-b">{passenger.gender}</td>
                  <td className="py-2 px-4 border-b">{passenger.contact}</td>
                  <td className="py-2 px-4 border-b">{passenger.email}</td>
                  <td className="py-2 px-4 border-b">
                    {passenger.photo ? (
                      <img
                        src={
                          typeof passenger.photo === "string"
                            ? passenger.photo
                            : URL.createObjectURL(passenger.photo)
                        }
                        alt="Passenger"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "No Photo"
                    )}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {passenger.idCard ? (
                      <a
                        href={URL.createObjectURL(passenger.idCard)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        View ID Card
                      </a>
                    ) : (
                      "No ID Card"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
