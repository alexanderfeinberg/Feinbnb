import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { MenuProvider } from "./context/MenuModal";
import AllSpots from "./components/Spots/AllSpots";
import SingleSpot from "./components/Spots/SingleSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <MenuProvider>
        <Navigation isLoaded={isLoaded} />
      </MenuProvider>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {/* <SignupFormPage /> */}
            <AllSpots isCurrent={false} />
          </Route>
          <Route exact path="/spots/current">
            <AllSpots isCurrent={true} />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
