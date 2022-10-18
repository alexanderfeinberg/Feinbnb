import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviewsThunk } from "../../store/reviews/reviewThunk";
import AllReviews from "../Reviews/AllReviews";
import { useReviewContext } from "../../context/reviewCountStarContext";

const UserReviewWrapper = () => {
  let dispatch = useDispatch();

  const { numReviews, setNumReviews, starRating, setStarRating } =
    useReviewContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  console.log("USER  ", user);
  const reviews = useSelector((state) => {
    console.log("REVIEW STATE", state);
    setNumReviews(state.reviews ? Object.values(state.reviews).length : null);
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
