import "./SpotBookingForm.css";

const SpotBookingForm = () => {
  return (
    <form class="booking-form">
      <div className="booking-inputs">
        <div className="booking-check-dates">
          <div className="booking-check-in">
            <label htmlFor="check-in-date">CHECK-IN</label>
            <input
              type="text"
              name="check-in-date"
              value={"10/03/2022"}
              disabled
            />
          </div>
          <div className="booking-check-out">
            <label htmlFor="check-out-date">CHECK-OUT</label>
            <input
              type="text"
              value={"10/07/2022"}
              name="check-out-date"
              disabled
            />
          </div>
        </div>
        <div className="booking-check-guests">
          <label htmlFor="guest-number">GUESTS</label>
          <input type="text" value={"1 guest"} name="guest-number" disabled />
        </div>
      </div>
    </form>
  );
};

export default SpotBookingForm;
