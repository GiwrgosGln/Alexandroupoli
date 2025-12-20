export interface Event {
  id: string;
  title: string;
  date: {
    month: string;
    day: string;
  };
  category: string;
  time: string;
  location: string;
  image: string;
  buttonText: string;
  isBookable: boolean;
}
