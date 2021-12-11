import "./Dashboard.css";
import { SliderData } from "./SliderData";

export default function Dashboard(): JSX.Element {

  const current = Math.floor(Math.random() * SliderData.length);

  return (
    <div className="dashboard">
      <div className="banner-text">
        <p className="shift0">Plan.</p>
        <p className="shift1">Travel.</p>
        <p className="shift2">Explore...</p>
      </div>
      <section className="slider">
        <div
          className="slide active"
        >
          <img
            src={SliderData[current].image}
            alt="preview pictures"
          />
        </div>
      </section>
    </div>
  );
}
