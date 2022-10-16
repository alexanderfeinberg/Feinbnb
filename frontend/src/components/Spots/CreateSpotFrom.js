import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSpotThunk, updateSpotThunk } from "../../store/spots/spotThunks";
import { MenuContext } from "../../context/MenuModal";

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
          setShowModal(false);
          history.push(`/spots/${resSpot.id}`);
        })
        .catch(async (res) => {
          const data = await data.json();
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
          const data = await data.json();
          if (data) setErrors([data.message]);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((err, idx) => {
            return <li key={idx}>{err}</li>;
          })}
        </ul>
        <label>
          Street address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            min="1"
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            value={long}
            onChange={(e) => setLong(e.target.value)}
            min="1"
            required
          />
        </label>

        <label>
          Spot Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Spot Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">{spot ? `Update Spot` : `Create Spot`}</button>
      </form>
    </>
  );
}

export default CreateSpotForm;
