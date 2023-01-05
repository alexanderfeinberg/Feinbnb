import { useEffect, useState } from "react";
import "./SpotPricing.css";

const DUMMY_EXPENSES = [
  { id: 1, name: "Cleaning fee", percentage: 0.05 },
  { id: 2, name: "Service fee", percentage: 0.11 },
];

const SpotPricing = ({ spot, bookingData }) => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [totalExpense, setTotalExpense] = useState(null);

  useEffect(() => {
    setExpenses(DUMMY_EXPENSES);
    if (spot && bookingData) {
      setExpenses((prevState) => {
        const newState = [...prevState];
        newState.forEach((fee) => {
          fee.price = Math.floor(
            spot.price * bookingData.days * fee.percentage
          );
        });
        newState.push({
          id: 3,
          name: `${spot.price} x ${bookingData.days} nights`,
          price: spot.price * bookingData.days,
        });

        setTotalExpense(
          newState.reduce((accum, curr) => accum + curr.price, 0)
        );

        return newState;
      });
    }
  }, [spot, bookingData]);

  return (
    <div className="pricing-data">
      {expenses.map((expense) => (
        <div className="price-item" key={expense.id}>
          <div className="price-title">{expense.name}</div>
          <div className="price-amount">${expense.price}</div>
        </div>
      ))}
      <div className="seperate"></div>
      <div className="price-item price-total-container">
        <div className="price-total-title">Total before taxes</div>
        <div className="price-total-amount">${totalExpense}</div>
      </div>
    </div>
  );
};

export default SpotPricing;
