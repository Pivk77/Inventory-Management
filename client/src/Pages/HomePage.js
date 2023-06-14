import React from "react";
import Header from "../Header/Header";
import "./HomePage.css";
import image_find from "../images/find.svg";
import image_insert from "../images/insert.svg";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const HomePage = () => {
  let navigate = useNavigate();

  const navigateFind = () => {
    navigate("/find");
  };
  const navigateInsert = () => {
    navigate("/insert");
  };

  return (
    <div className="home-page">
      <div className="header-container">
        <Header />
      </div>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-auto" style={{textAlign:"center"}}>
            <div className="square_find" onClick={navigateFind}>
              <h1>Find item</h1>
              <img src={image_find} alt="GIF" />
              <div className="description desc1">
                <h1>Find</h1>
                <div>
                  Use this option to pick an item from inventory
                  <p>You can search by: code, description, status</p>
                </div>
              </div>
            </div>
            <div className="square_insert" onClick={navigateInsert}>
              <h1>Insert item</h1>
              <img src={image_insert} alt="GIF" />
              <div className="description desc2">
                <h1>Insert</h1>
                <div>
                  Use this option to insert an item into inventory.
                  <p>
                    You will have to enter the data of the item you are storing
                    in inventory
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
