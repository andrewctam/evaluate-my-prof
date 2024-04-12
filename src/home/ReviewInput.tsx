import { useState } from "react";
import { Review } from "../types";
import "./ReviewInput.scss";

interface ReviewInputProps {
  addReview: (review: Review) => void;
}

export default function ReviewInput({ addReview }: ReviewInputProps) {
    const [rating, setRating] = useState(3);
    const [difficulty, setDifficulty] = useState(3);
    const [amountLearned, setAmountLearned] = useState(3);
    const [lectureQuality, setLectureQuality] = useState(3);
    const [hrsPerWeek, setHrsPerWeek] = useState(3);
    const [text, setText] = useState("");

    const create = () => {
        addReview({
            id: "1",
            author: {name: "A"},
            rating,
            difficulty,
            amountLearned,
            lectureQuality,
            hrsPerWeek,
            text
        });

        setRating(3);
        setDifficulty(3);
        setAmountLearned(3);
        setLectureQuality(3);
        setHrsPerWeek(3);
        setText("");
    }

    return (
        <div className="reviewInput">
            <div>
                <InputSlider name={`Rating (${rating})`} value={rating} update={setRating} />
                <InputSlider name={`Difficulty (${difficulty})`} value={difficulty} update={setDifficulty} />
                <InputSlider name={`Amount Learned (${amountLearned})`} value={amountLearned} update={setAmountLearned} />
                <InputSlider name={`Lecture Quality (${lectureQuality})`} value={lectureQuality} update={setLectureQuality} />
                <InputSlider name={`Hours Per Week (${hrsPerWeek})`} value={hrsPerWeek} update={setHrsPerWeek} />
            </div>

            <div>
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={create}>Create</button>
            </div>
            
        </div>
    )
}
interface InputSliderProps {
    name: string
    value: number
    update: (updated: number) => void
}
function InputSlider({name, value, update}: InputSliderProps) {

    return (
        <div>
            {name}
            <input type="range" min={1} max={5} value={value} onChange={(e) => update(Number(e.target.value))}></input>
        </div>
    )
}
