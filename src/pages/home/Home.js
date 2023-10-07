import React from "react";
import HomeHeader from "../../components/headers/home-header/HomeHeader";
import AllUsersButton from "../../components/buttons/all-users-button/AllUsersButton";
import Footer from "../../components/footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="homePageContainer">
      <HomeHeader />
      <div className="contentWrapper">
        <h1 className="homeTitle">
          Welcome to <span>Nicepage Project</span>
        </h1>
        <AllUsersButton />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
