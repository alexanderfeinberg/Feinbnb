import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const [previewImage, setPreviewImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (!spot)
      return dispatch(addSpotThunk(newSpot))
        .then((resSpot) => {
          addImageThunk(previewImage, resSpot.id);
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
        .then((resSpot) => {
          setShowModal(false);
          history.push(`/spots/${resSpot.id}`);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data) setErrors([data.message]);
        });
    }
  };
  return (
    <>
      <h3>Host your spot</h3>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul>
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

        <label for="lat">Latitude:</label>
        <input
          type="number"
          name="lat"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          min="1"
          required
        />

        <label>Longitude:</label>
        <input
          type="number"
          value={long}
          onChange={(e) => setLong(e.target.value)}
          placeholder="Longitude"
          min="1"
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
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          placeholder="Spot Preview Image URL"
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          min="1"
          required
        />

        <button type="submit">{spot ? `Update Spot` : `Create Spot`}</button>
      </form>
    </>
  );
}

export default CreateSpotForm;
