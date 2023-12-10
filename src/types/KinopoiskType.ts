export type kinopoiskType = {
  id: number;
  name: string;
  poster: {
    previewUrl: string;
    url: string;
  };
  seriesLength: number;
  type: string;
  rating: {
    kp: number;
    imdb: number;
  };
  ageRating: number;
  names: {
    name: string;
  }[];
  backdrop: {
    previewUrl: string;
    url: string;
  };
  description: string;
  genres: {
    name: string;
  }[];
  movieLength: number;
  year: number;
};
