import { Link, useLocation } from "react-router-dom";
import {
  House,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";
import storage from "../../constants/storage";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  keyword: string;
}

const menus: MenuItem[] = [
  {
    title: "Home",
    icon: <House size={18} />,
    href: "/dashboard/admin",
    keyword: "dashboard",
  },
  
  {
    title: "Analytics",
    icon: <ChartNoAxesCombined size={18} />,
    href: "/dashboard/admin/analytics",
    keyword: "analytics",
  },
  {
    title: "Settings",
    icon: <Settings size={18} />,
    href: "/dashboard/admin/settings",
    keyword: "settings",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (keyword: string): boolean => {
    return location.pathname.split("/").includes(keyword);
  };

  return (
    <div className="bg-[#F6F7F9] w-[300px] h-full mt-0 px-7 shrink-0 fixed">
      <ul className="space-y-4 mt-6">
        {menus.map((menu) => (
          <Link
            id={menu.keyword}
            key={menu.title}
            to={menu.href}
            className={
              isActive(menu.keyword)
                ? "flex gap-2 items-center p-4 rounded-[8px] cursor-pointer bg-[#F99762] text-white"
                : "flex gap-2 items-center px-4 rounded-[8px] cursor-pointer text-[#595959]"
            }
          >
            <div className="text-[20px]">{menu.icon}</div>
            <p className="">{menu.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;