import "./CreateReview.scss";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { AddReviewPayload } from "../../../features/api/types";
import { useAddReviewMutation } from "../../../features/api/apiSlice";

interface CreateReviewProps {
  courses: string[];
  close: () => void;
}
export default function CreateReview({ courses, close }: CreateReviewProps) {
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [amountLearned, setAmountLearned] = useState(3);
  const [lectureQuality, setLectureQuality] = useState(3);
  const [hrsPerWeek, setHrsPerWeek] = useState(5);
  const [course, setCourse] = useState(courses[0]);
  const [text, setText] = useState("");

  const [newCourse, setNewCourse] = useState("");

  const user = useAppSelector((state) => state.user);
  const [addReview, { isLoading }] = useAddReviewMutation();

  const ADD_NEW_COURSE = "Add New Course";

  const handleAddReview = async () => {
    if (isLoading || user.sessionToken === null) {
      return;
    }
    const payload: AddReviewPayload = {
      authorUsername: user.username,
      sessionToken: user.sessionToken,
      text,
      course: course === ADD_NEW_COURSE ? newCourse : course,
      rating: rating.toString(),
      difficulty: difficulty.toString(),
      amountLearned: amountLearned.toString(),
      lectureQuality: lectureQuality.toString(),
      hrsPerWeek: hrsPerWeek.toString(),
    };

    try {
      await addReview(payload).unwrap();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reviewInput">
      <div className="">
        <div>
          <label htmlFor="courseselect">Course:</label>
          <select
            id="courseselect"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {courses.map((course, i) => (
              <option value={course} key={i}>
                {course}
              </option>
            ))}
             <option value={ADD_NEW_COURSE} key={"AddNew"}>
                Add New Course
              </option>
          </select>
        </div>

        {course === ADD_NEW_COURSE && (
          <div>
            <input
              type="text"
              className="addCourseInput"
              placeholder="Course Name"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />
          </div>
        )}


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
        <button onClick={handleAddReview}>Create Review</button>
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
