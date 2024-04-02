type ImageFile = {
  file: File;
  id: number;
};

type ImagePath = {
  path: string;
  id: number;
};

type Review = {
  fishId: number;
  weight: number;
  pricePerKg: number;
  totalPrice: number;
};

type PostState = {
  postType: string;
  title: string;
  content: string;
  reviews: Review[];
  images: ImageFile[];
};

type PostAction = {
  setPostType: (postType: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setReviews: (reviews: Review[]) => void;
  setImages: (images: ImageFile[]) => void;
};

type ReviewFormType = {
  id : number
  review : {
      name : string
      pricePerKg : string
      totalPrice : string
      weight : string
  }
}

type FishData = {
  fishId : number,
  name : string
}