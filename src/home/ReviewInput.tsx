import { useState } from "react";
import { Review, User } from "../types";
import "./ReviewInput.scss";
import { names, uniqueNamesGenerator } from "unique-names-generator";

interface ReviewInputProps {
  addReview: (review: Review) => void;
}

export default function ReviewInput({ addReview }: ReviewInputProps) {
    const [rating, setRating] = useState(3);
    const [difficulty, setDifficulty] = useState(3);
    const [amountLearned, setAmountLearned] = useState(3);
    const [lectureQuality, setLectureQuality] = useState(3);
    const [hrsPerWeek, setHrsPerWeek] = useState(5);
    const [course, setCourse] = useState("")

    const [text, setText] = useState("");
    const create = () => {
        const author: User = {
            name: uniqueNamesGenerator({ dictionaries: [names] })
        };

        addReview({
            author,
            rating,
            difficulty,
            amountLearned,
            lectureQuality,
            hrsPerWeek,
            text,
            course,
            votes: 0
        });

        setRating(3);
        setDifficulty(3);
        setAmountLearned(3);
        setLectureQuality(3);
        setHrsPerWeek(5);
        setText("");
    }

    return (
        <div className="reviewInput">
            <div>
                <div>
                    Course name:
                    <input value={course} onChange={(e) => setCourse(e.target.value)} />
                </div>
                
                <InputSlider name={`Rating (${rating})`} value={rating} update={setRating} />
                <InputSlider name={`Difficulty (${difficulty})`} value={difficulty} update={setDifficulty} />
                <InputSlider name={`Amount Learned (${amountLearned})`} value={amountLearned} update={setAmountLearned} />
                <InputSlider name={`Lecture Quality (${lectureQuality})`} value={lectureQuality} update={setLectureQuality} />
                <InputSlider name={`Hours Per Week (${hrsPerWeek})`} value={hrsPerWeek} update={setHrsPerWeek} max={40}/>
            </div>

            <div>
                Reviewing Professor Bob from Stony Brook University:

                
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={create}>Create Review</button>
            </div>
            
        </div>
    )
}
interface InputSliderProps {
    name: string
    value: number
    min?: number
    max?: number
    update: (updated: number) => void
}
function InputSlider({name, value, update, min=1, max=5}: InputSliderProps) {

    return (
        <div>
            {name}
            <input type="range" min={min} max={max} value={value} onChange={(e) => update(Number(e.target.value))}></input>
        </div>
    )
}
