import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSpotThunk } from "../../store/spots/spotThunks";
import { MenuContext } from "../../context/MenuModal";

function CreateSpotForm() {
  let dispatch = useDispatch();
  let history = useHistory();
  const { showModal, setShowModal } = useContext(MenuContext);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
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

    return dispatch(addSpotThunk(newSpot))
      .then((spot) => {
        setShowModal(false);
        history.push(`/spots/${spot.id}`);
      })
      .catch(async (res) => {
        const data = await data.json();
        if (data) setErrors([data.message]);
      });
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
        <button type="submit">Create Spot</button>
      </form>
    </>
  );
}

export default CreateSpotForm;
