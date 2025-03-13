import { useState } from 'react';

const emptyPassenger = {
  name: '',
  age: '',
  gender: '',
  contact: '',
  email: '',
  photo: null,
  idCard: null
};

function App() {
  const [passengers, setPassengers] = useState([{ ...emptyPassenger }]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { ...emptyPassenger }]);
  };

  const handleChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) => {
      if (i === index) {
        return { ...passenger, [field]: value };
      }
      return passenger;
    });
    setPassengers(updatedPassengers);
  };

  const handleFileChange = (index, field, file) => {
    handleChange(index, field, file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted passengers:', passengers);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Passenger Registration Form
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Passenger</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={passenger.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={passenger.age}
                    onChange={(e) => handleChange(index, 'age', e.target.value)}
                    className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <select
                    required
                    value={passenger.gender}
                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    value={passenger.contact}
                    onChange={(e) => handleChange(index, 'contact', e.target.value)}
                    className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={passenger.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    className="mt-1 pt-2 pb-2 pl-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo (PNG)
                  </label>
                  <input
                    type="file"
                    accept=".png"
                    onChange={(e) => handleFileChange(index, 'photo', e.target.files[0])}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
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
                    onChange={(e) => handleFileChange(index, 'idCard', e.target.files[0])}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>
          ))}

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
      </div>
    </div>
  );
}

export default App;