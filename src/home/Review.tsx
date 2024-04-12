import { Review as ReviewType } from "../types"


interface ReviewProps {
    review: ReviewType
}
export default function Review({review}: ReviewProps) {
    return <div>
        {JSON.stringify(review)}
        
    </div>
}