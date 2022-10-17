import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsThunk } from "../../store/reviews/reviewThunk";
import AllReviews from "../Reviews/AllReviews";

const UserReviewWrapper = () => {
  let dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  console.log("USER  ", user);
  const reviews = useSelector((state) => {
    console.log("USER REVIEW STATE ", state);
    return state.reviews ? state.reviews : null;
  });

  useEffect(() => {
    console.log("USE EFFECT");
    dispatch(getUserReviewsThunk(user.id)).then((res) => setIsLoaded(true));
  }, [dispatch]);

  if (isLoaded) {
    return <AllReviews props={{ reviews }} />;
  }
  return null;
};

export default UserReviewWrapper;
