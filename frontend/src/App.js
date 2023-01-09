import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { MenuProvider } from "./context/MenuModal";
import AllSpots from "./components/Spots/AllSpots";
import SingleSpot from "./components/Spots/SingleSpot";
import UserReviewWrapper from "./components/Reviews/UserReviewWrapper";
import ReviewContextProvider from "./context/reviewCountStarContext";
import UserSpots from "./components/UserSpots.js/UserSpots";
import UserBookings from "./components/UserBookings/UserBookings";
import Profile from "./components/Profile/Profile";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <MenuProvider>
        <Navigation isLoaded={isLoaded} />

        {isLoaded && (
          <ReviewContextProvider>
            <Switch>
              <Route exact path="/">
                {/* <SignupFormPage /> */}
                <Homepage />
              </Route>
              <Route exact path="/profile">
                <Profile user={user} />
              </Route>
              <Route exact path="/spots/current">
                <UserSpots />
              </Route>
              <Route exact path="/bookings/current">
                <UserBookings />
              </Route>
              <Route path="/spots/:spotId">
                <SingleSpot />
              </Route>
              <Route exact path="/reviews/current">
                <UserReviewWrapper />
              </Route>
              <Route path="/search/:searchParams">
                <SearchPage />
              </Route>
            </Switch>
          </ReviewContextProvider>
        )}
      </MenuProvider>
    </>
  );
}

export default App;
