import { Loader } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
    <div className="text-center">
      <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
      <p className="text-slate-600 text-lg">Loading dashboard data...</p>
    </div>
  </div>
);

export const ErrorMessage = ({ message = 'Error loading data. Please try again.' }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600 text-lg">{message}</p>
    </div>
  </div>
);