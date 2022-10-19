import "./SpotBookingForm.css";

const SpotBookingForm = () => {
  return (
    <form class="booking-form">
      <div className="booking-inputs">
        <div className="booking-check-dates">
          <div className="booking-check-in">
            <label for="check-in-date">CHECK-IN</label>
            <input type="text" name="check-in-date" value={"10/03/2022"} />
          </div>
          <div className="booking-check-out">
            <label for="check-out-date">CHECK-OUT</label>
            <input type="text" value={"10/07/2022"} name="check-out-date" />
          </div>
        </div>
        <div className="booking-check-guests">
          <label for="guest-number">GUESTS</label>
          <input type="text" value={"1 guest"} name="guest-number" />
        </div>
      </div>
    </form>
  );
};

export default SpotBookingForm;
