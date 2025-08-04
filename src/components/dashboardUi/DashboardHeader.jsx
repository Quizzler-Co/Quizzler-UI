import { Settings } from "lucide-react";
import Button from "../ui-components/Button";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your quiz platform</p>
      </div>
      <Button variant="outline" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  );
};

export default DashboardHeader;
