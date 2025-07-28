import React, { useState } from "react";

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState("faqs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I delete my account?",
      answer: "You can delete your account in the settings page.",
    },
  ]);
  const [policyContent, setPolicyContent] = useState("Privacy policy content...");
  const [dataRequests, setDataRequests] = useState([
    {
      id: 1,
      user: "john@example.com",
      type: "Data Deletion",
      date: "2023-10-01",
      status: "Pending",
    },
  ]);

  const handleAddFAQ = (question, answer) => {
    const newFAQ = { id: faqs.length + 1, question, answer };
    setFaqs([...faqs, newFAQ]);
    setIsModalOpen(false);
  };

  const handleSavePolicy = () => {
    // Save policy logic (e.g., API call)
    console.log("Policy saved:", policyContent);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Navigation */}
      <nav className="flex gap-2 mb-6">
        {["faqs", "policy", "requests", "contact"].map((section) => (
          <button
            key={section}
            className={`px-4 py-2 rounded-md ${
              activeSection === section
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-350"
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div className="bg-bakground p-6 rounded-lg shadow-md">
        {/* FAQs Section */}
        {activeSection === "faqs" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Privacy FAQs</h3>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
              >
                Add New FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border p-4 rounded-lg">
                  <h4 className="font-semibold">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Policy Editor */}
        {activeSection === "policy" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Privacy Policy Management</h3>
              <select className="border p-2 rounded-md bg-background">
                <option>Current Version (v1.0)</option>
                <option>Previous Version (v1.1)</option>
              </select>
            </div>
            <textarea
              className="w-full h-96 p-4 border bg-background rounded-md"
              value={policyContent}
              onChange={(e) => setPolicyContent(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleSavePolicy}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Data Requests */}
        {activeSection === "requests" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">User Data Requests</h3>
              <select className="border p-2 rounded-md">
                <option>All Requests</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Request Type</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="p-3">{request.user}</td>
                    <td className="p-3">{request.type}</td>
                    <td className="p-3">{request.date}</td>
                    <td className="p-3">{request.status}</td>
                    <td className="p-3">
                      <button className="text-blue-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contact Forms */}
        {activeSection === "contact" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Privacy Contact Forms</h3>
              <input
                type="text"
                placeholder="Search messages..."
                className="border p-2 rounded-md bg-background"
              />
            </div>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-gray-600">How can I export my data?</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg w-1/2">
            <h4 className="text-xl font-semibold mb-4">Add New FAQ</h4>
            <input
              type="text"
              placeholder="Question"
              className="w-full p-2 border rounded-md mb-4"
            />
            <textarea
              placeholder="Answer"
              className="w-full h-32 p-2 border rounded-md bg-background mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleAddFAQ("New Question", "New Answer")}
              >
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;