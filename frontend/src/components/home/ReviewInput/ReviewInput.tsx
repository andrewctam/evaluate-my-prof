import { useContext, useState } from "react";

import "./ReviewInput.scss";
import { UserContext } from "../../../types/context";
import axios from "axios";
import { API_URL } from "../../../types/constants";


const courses = ["CSE 114", "CSE 214", "CSE 320"];

interface ReviewInputProps {
  refreshParent: () => void;
}

export default function ReviewInput({ refreshParent }: ReviewInputProps) {
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [amountLearned, setAmountLearned] = useState(3);
  const [lectureQuality, setLectureQuality] = useState(3);
  const [hrsPerWeek, setHrsPerWeek] = useState(5);
  const [course, setCourse] = useState(courses[0]);
  const [text, setText] = useState("");

  const userState = useContext(UserContext);

  const addReview = async () => {
    if (userState.sessionToken === null) {
      return;
    }
    const url = `${API_URL}/reviews/create`;
    const body = JSON.stringify({
      authorUsername: userState.username,
      sessionToken: userState.sessionToken,
      text,
      course,
      rating,
      difficulty,
      amountLearned,
      lectureQuality,
      hrsPerWeek
    })
    const config = { 
      headers: {
        "Content-Type": "application/json"
      }
    }

    await axios.post(url, body, config)
    .then((response) => {
      console.log(response);
      setRating(3);
      setDifficulty(3);
      setAmountLearned(3);
      setLectureQuality(3);
      setHrsPerWeek(5);
      setText("");
      
      refreshParent();
    })
    .catch((error) => {
      console.error(error);
    });
  };


  return (
    <div className="reviewInput">
      <div className = "">
        <div>
          <label htmlFor="courseselect">Course:</label>
            <select
                id="courseselect"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            >
                {courses.map((course, i) => (
                    <option value={course} key={i}>{course}</option>
                ))}
            </select>
        </div>

        <InputSlider
          name={`Rating (${rating})`}
          value={rating}
          update={setRating}
        />
        <InputSlider
          name={`Difficulty (${difficulty})`}
          value={difficulty}
          update={setDifficulty}
        />
        <InputSlider
          name={`Amount Learned (${amountLearned})`}
          value={amountLearned}
          update={setAmountLearned}
        />
        <InputSlider
          name={`Lecture Quality (${lectureQuality})`}
          value={lectureQuality}
          update={setLectureQuality}
        />
        <InputSlider
          name={`Hours Per Week (${hrsPerWeek})`}
          value={hrsPerWeek}
          update={setHrsPerWeek}
          max={40}
        />
      </div>

      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addReview}>Create Review</button>
      </div>
    </div>
  );
}
interface InputSliderProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  update: (updated: number) => void;
}
function InputSlider({
  name,
  value,
  update,
  min = 1,
  max = 5,
}: InputSliderProps) {
  return (
    <div>
      {name}
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => update(Number(e.target.value))}
      ></input>
    </div>
  );
}
