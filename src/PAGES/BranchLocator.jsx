import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  Star,
  Wifi,
  Coffee,
  Car,
  Building,
  ChevronRight
} from "lucide-react";

const BranchLocator = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);

  const branches = [
    {
      id: 1,
      name: "Novexus Finance Bank - Headquarters",
      address: "123 Wall Street, New York, NY 10005, USA",
      phone: "+1 (800) 555-0199",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM EST",
      distance: "0.8 mi",
      rating: 4.9,
      features: ["24/7 ATM", "Parking", "WiFi", "Coffee Bar", "Safe Deposit Box"],
      status: "open",
    },
    {
      id: 2,
      name: "Novexus Finance Bank - Manhattan",
      address: "456 5th Avenue, New York, NY 10018, USA",
      phone: "+1 (800) 555-0234",
      hours: "Mon-Fri: 8:00 AM - 7:00 PM EST",
      distance: "1.2 mi",
      rating: 4.8,
      features: ["24/7 ATM", "Parking", "WiFi", "Notary Services"],
      status: "open",
    },
    {
      id: 3,
      name: "Novexus Finance Bank - Brooklyn",
      address: "789 Atlantic Avenue, Brooklyn, NY 11217, USA",
      phone: "+1 (800) 555-0456",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM EST",
      distance: "3.5 mi",
      rating: 4.7,
      features: ["24/7 ATM", "Parking", "WiFi", "Coffee Bar"],
      status: "open",
    },
    {
      id: 4,
      name: "Novexus Finance Bank - Queens",
      address: "321 Queens Boulevard, Queens, NY 11375, USA",
      phone: "+1 (800) 555-0678",
      hours: "Mon-Fri: 8:00 AM - 5:30 PM EST",
      distance: "6.2 mi",
      rating: 4.5,
      features: ["24/7 ATM", "Parking", "Drive-Thru"],
      status: "open",
    },
    {
      id: 5,
      name: "Novexus Finance Bank - Bronx",
      address: "654 Grand Concourse, Bronx, NY 10451, USA",
      phone: "+1 (800) 555-0890",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM EST",
      distance: "8.7 mi",
      rating: 4.4,
      features: ["24/7 ATM", "Parking", "WiFi"],
      status: "closed",
    },
    {
      id: 6,
      name: "Novexus Finance Bank - Staten Island",
      address: "987 Bay Street, Staten Island, NY 10301, USA",
      phone: "+1 (800) 555-0123",
      hours: "Mon-Fri: 8:00 AM - 5:30 PM EST",
      distance: "10.3 mi",
      rating: 4.6,
      features: ["24/7 ATM", "Parking", "WiFi", "Coffee Bar"],
      status: "open",
    },
  ];

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "open" ? "bg-green-500" : "bg-red-500";
  };

  const getStatusText = (status) => {
    return status === "open" ? "Open Now" : "Closed";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <MapPin className="text-green-600" size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Branch Locator</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by branch name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          />
        </div>

        {/* Map Placeholder */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-6 text-center border-2 border-dashed border-green-300">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <Navigation className="text-green-600" size={24} />
            <p className="font-medium">Interactive Map Loading...</p>
          </div>
          <p className="text-sm text-green-600 mt-2">Find the nearest branch to your location in New York City</p>
          <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition text-sm">
            Use My Location
          </button>
        </div>

        {/* Branch List */}
        <div className="space-y-4">
          {filteredBranches.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No branches found</p>
            </div>
          ) : (
            filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden ${
                  selectedBranch === branch.id ? "ring-2 ring-green-500" : ""
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{branch.name}</h3>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(branch.status)}`}></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          branch.status === "open" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {getStatusText(branch.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} /> {branch.address}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Phone size={14} /> {branch.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {branch.hours}
                        </span>
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                          <Navigation size={14} /> {branch.distance}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="font-semibold text-gray-800">{branch.rating}</span>
                      </div>
                      <button
                        onClick={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
                        className="mt-2 text-green-600 text-sm hover:underline flex items-center gap-1"
                      >
                        Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedBranch === branch.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {branch.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200 flex items-center gap-1"
                          >
                            {feature === "24/7 ATM" && <Building size={12} />}
                            {feature === "Parking" && <Car size={12} />}
                            {feature === "WiFi" && <Wifi size={12} />}
                            {feature === "Coffee Bar" && <Coffee size={12} />}
                            {feature === "Safe Deposit Box" && <Building size={12} />}
                            {feature === "Notary Services" && <Building size={12} />}
                            {feature === "Drive-Thru" && <Car size={12} />}
                            {feature}
                          </span>
                        ))}
                      </div>
                      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-2">
                        <Navigation size={16} /> Get Directions
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchLocator;