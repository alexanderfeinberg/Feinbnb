import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviewsThunk } from "../../store/reviews/reviewThunk";
import { getSpotThunk } from "../../store/spots/spotThunks";

import {
  addSpotThunk,
  updateSpotThunk,
  addImageThunk,
} from "../../store/spots/spotThunks";
import { MenuContext } from "../../context/MenuModal";
import "./CreateSpotForm.css";

function CreateSpotForm() {
  let dispatch = useDispatch();
  let history = useHistory();
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);
  let spot = defaultValue;
  let preview = spot
    ? spot.SpotImages.filter((img) => img.preview === true)[0].url
    : null;

  console.log("SPOT ", spot);

  const [address, setAddress] = useState(spot ? spot.address : "");
  const [city, setCity] = useState(spot ? spot.city : "");
  const [state, setState] = useState(spot ? spot.state : "");
  const [country, setCountry] = useState(spot ? spot.country : "");
  const [lat, setLat] = useState(spot ? spot.lat : 0);
  const [long, setLong] = useState(spot ? spot.lng : 0);
  const [name, setName] = useState(spot ? spot.name : "");
  const [description, setDescription] = useState(spot ? spot.description : "");
  const [price, setPrice] = useState(spot ? spot.price : 0);
  const [errors, setErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState(spot ? preview : "");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  console.log("ERRORS ", errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrors([]);
    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng: long,
      name,
      description,
      price,
    };
    alert("This spot is under review");
    return;

    if (!spot)
      return dispatch(addSpotThunk(newSpot))
        .then((resSpot) => {
          addImageThunk(previewImage, resSpot.id);
          return resSpot;
        })
        .then((resSpot) => {
          dispatch(getSpotReviewsThunk(resSpot.id));
          return resSpot;
        })
        .then((resSpot) => {
          setShowModal(false);
          history.push(`/spots/${resSpot.id}`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors([data.message]);
        });
    else if (spot) {
      for (let key of Object.keys(newSpot)) {
        spot[key] = newSpot[key];
      }
      return dispatch(updateSpotThunk(spot))
        .then(() => dispatch(getSpotThunk(spot.id)).then((res) => {}))
        .then((resSpot) => {
          setShowModal(false);
          history.push(`/spots/${spot.id}`);
        })
        .catch(async (res) => {
          console.log("ERR ", res);
          const data = await res.json();
          if (data) setErrors([data.message]);
        });
    }
  };

  useEffect(() => {
    const errors = [];
    if (!address.length) errors.push("Address is required.");
    if (!city.length) errors.push("City is required.");
    if (!state.length) errors.push("State is required.");
    if (!country.length) errors.push("Country is required.");
    if (!lat) errors.push("Latitude is required.");
    if (!long) errors.push("Longitude is required.");
    if (!name.length) errors.push("Spot name is required.");
    if (!description.length || description.length > 250)
      errors.push("Description must be between 1 and 250 characters");
    if (price < 1) errors.push("Price must be greater than 0.");
    if (!previewImage.length) errors.push("Preview Image is required.");

    setErrors(errors);
  }, [
    address,
    city,
    state,
    country,
    lat,
    long,
    name,
    description,
    price,
    previewImage,
  ]);

  return (
    <>
      <h3>Become a host</h3>
      <form onSubmit={handleSubmit}>
        {hasSubmitted && errors.length > 0 && (
          <ul className="errors">
            {errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        )}

        <input
          type="text"
          name="adress"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />

        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
        />

        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />

        <label htmlFor="lat">Latitude:</label>
        <input
          type="number"
          name="lat"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />

        <label>Longitude:</label>
        <input
          type="number"
          value={long}
          onChange={(e) => setLong(e.target.value)}
          placeholder="Longitude"
          required
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Spot Name"
          required
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Spot Description"
          required
        />
        {!spot && (
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Spot Preview Image URL"
            required
          />
        )}
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          min="1"
          required
        />

        <button
          type="submit"
          disabled={errors.length > 0 && hasSubmitted ? true : false}
        >
          {spot ? `Update Spot` : `Create Spot`}
        </button>
      </form>
    </>
  );
}

export default CreateSpotForm;
