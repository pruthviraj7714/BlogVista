import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import { HiHome } from "react-icons/hi2";


const Appbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authorId");
  
    try {
      setTimeout(() => navigate('/') ,1000)
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-5 border-b-2 shadow-lg">
        <Link to={"/blogs"}>
          <h1 className="font-bold font-serif text-2xl">BlogVista</h1>
        </Link>
        <div className="flex items-center">
          <Link to="/publish">
            <button className="bg-green-400 text-white font-bold px-7 py-2 rounded-md mr-4 hover:bg-green-600 ">
              Publish
            </button>
          </Link>
          <div className="mr-4 px-5 py-2 border border-black">
            <Dropdown label="Menu" className="bg-stone-100" inline>
              <Dropdown.Item
                icon={HiHome}
                onClick={() => {
                  navigate("/blogs");
                }}
              >
                Home
              </Dropdown.Item>
              <Dropdown.Item icon={HiLogout}>
                <button onClick={handleLogOut}>Sign out</button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
