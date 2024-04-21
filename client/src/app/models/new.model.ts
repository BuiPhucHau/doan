import { Storage } from "./storage.model";

export interface New {
    _id: string,
    newId: string;
    day: number;
    month: string;
    year: number;
    news: string;
    title: string; 
    text: string;
    image: Storage;
  }