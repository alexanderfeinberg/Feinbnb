import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import HostHome from "./HostHome";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import logo from "../../static/logo.png";
import { getSpotsWithParamsThunk } from "../../store/spots/spotThunks";
import { loadSearch } from "../../store/search/searchAction";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState(new Set([]));
  const [searchResults, setSearchResults] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.cached);
  const searchParams = useSelector((state) => state.search);

  let sessionLinks;
  // if (sessionUser) {
  sessionLinks = (
    <>
      <ProfileButton user={sessionUser} />
    </>
  );

  useEffect(() => {
    console.log("USE EFFECT SEARCH PARAMS ", searchParams);
    if (searchParams)
      setSearch(
        `${searchParams.city}, ${searchParams.state}, ${searchParams.country}`
      );
    if (!searchParams) setSearch("");
    if (spots) {
      for (let spot of Object.values(spots)) {
        // if (locations[`${spot.city}, ${spot.state}, ${spot.country}`]) continue;
        setLocations((prevState) => {
          return {
            ...prevState,
            [`${spot.city}, ${spot.state}, ${spot.country}`]: {
              city: spot.city,
              state: spot.state,
              country: spot.country,
            },
          };
        });
      }
    }
  }, [spots, searchParams]);

  useEffect(() => {
    setSearchResults([]);
    if (search.length < 1) {
      return;
    }
    console.log("LOCATION USE EFFECT ", locations);
    for (let [key, location] of Object.entries(locations)) {
      if (key.toLowerCase().includes(search)) {
        console.log(location);

        setSearchResults((prevState) => [...prevState, location]);
        console.log("SEARCH RES ", searchResults);
      }
    }
  }, [search]);

  const searchHandler = async (location) => {
    setSearch(`${location.city}, ${location.state}, ${location.country}`);
    const country = location.country;
    delete location["country"];
    console.log("LOCATION ", location);
    await dispatch(getSpotsWithParamsThunk(location));
    dispatch(
      loadSearch({
        city: location.city,
        state: location.state,
        country: country,
      })
    );
    history.push(
      `/search/spots?city=${location.city}&state=${location.state}&country=${country}`
    );
  };

  return (
    <div className="nav-bar">
      <div className="home-link">
        <NavLink exact to="/">
          <img src={logo} />
        </NavLink>
      </div>
      <div className="search-input-container">
        <input
          className="search-input"
          type="text"
          value={search}
          placeholder="Search for a place to stay"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((location) => (
              <div
                className="search-result"
                onClick={() => searchHandler(location)}
              >
                {location.city}, {location.state}, {location.country}
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateSpotFormModal />
      <LoginFormModal />
      <SignupFormModal />
      <div className="nav-right-btns">
        <div className="host-home-nav">
          <HostHome user={sessionUser} message={"Become a Host"} />
        </div>
        <div className="action-btn">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
