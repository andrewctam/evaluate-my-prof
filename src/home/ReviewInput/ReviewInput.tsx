import { useContext, useState } from "react";
import { Review, User } from "../../types";
import "./ReviewInput.scss";
import { UserContext } from "../../App";

interface ReviewInputProps {
  addReview: (review: Review) => void;
}

const courses = ["CSE 114", "CSE 214", "CSE 320"];



export default function ReviewInput({ addReview }: ReviewInputProps) {
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [amountLearned, setAmountLearned] = useState(3);
  const [lectureQuality, setLectureQuality] = useState(3);
  const [hrsPerWeek, setHrsPerWeek] = useState(5);
  const [course, setCourse] = useState(courses[0]);
  const [text, setText] = useState("");

  const UserState = useContext(UserContext);

  const create = () => {
    if (UserState.currentUser === null) {
        alert("Not Logged In!");
        return;
    }
    
    const author: User = { name: UserState.currentUser.name };

    addReview({
      id: 0, // This will be set by the reducer
      author,
      rating,
      difficulty,
      amountLearned,
      lectureQuality,
      hrsPerWeek,
      text,
      course,
      votes: 0,
      comments: [],
    });

    setRating(3);
    setDifficulty(3);
    setAmountLearned(3);
    setLectureQuality(3);
    setHrsPerWeek(5);
    setText("");
  };

  return (
    <div className="reviewInput">
      <div>
        <div>
          <label htmlFor="courseselect">Course:</label>
            <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                id="courseselect"
            >
                {courses.map((course) => (
                    <option value={course}>{course}</option>
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
        <button onClick={create}>Create Review</button>
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
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => update(Number(e.target.value))}
      ></input>
    </div>
  );
}
