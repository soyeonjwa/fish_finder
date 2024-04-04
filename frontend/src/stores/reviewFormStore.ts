import {create} from 'zustand';
import { persist } from "zustand/middleware";



interface ReviewForm {
    reviewForms : ReviewFormType[];
    setReviewForms : (reviewForm : ReviewFormType[]) => void;
}

export const reviewFormStore = create<ReviewForm>()(
    persist(
        (set) : ReviewForm => ({
            reviewForms : [],
            setReviewForms : (reviewForm : ReviewFormType[]) => {
                set(()=> ({reviewForms : reviewForm}))
            }
        }),
    {
        name : 'review-storage'
    }
    )
);