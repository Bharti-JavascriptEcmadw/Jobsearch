  import React from "react";
  import { FaMicrosoft, FaApple } from "react-icons/fa";
  import { SiTesla } from "react-icons/si";

  const PopularCompanies = () => {
    const companies = [
      {
        id: 1,
        title: "Tesla",
        location: "Brigade Gateway, 26/1, Dr. Rajkumar Road Bengaluru, Karnataka, 560055, India",
        openPositions: 10,
        icon: <FaMicrosoft />,
      },
      {
        id: 2,
        title: "MicrosofMicrosoft India (R&D) Pvt. Ltd.",
        location: "Microsoft Campus,Gachibowli,Hyderabad, Telangana, 500032 India",
        openPositions: 5,
        icon: <SiTesla />,
      },
      {
        id: 3,
        title: "Apple India Private Limited",
        location: "19th Floor, Concorde Tower C,UB City, 24, Vittal Mallya Road,Bengaluru, Karnataka, 560001, India",
        openPositions: 20,
        icon: <FaApple />,
      },
    ];
    return (
      <div className="companies">
        <div className="container">
          <h3>TOP COMPANIES</h3>
          <div className="banner">
            {companies.map((element) => {
              return (
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{element.icon}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Positions {element.openPositions}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  export default PopularCompanies;