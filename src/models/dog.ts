import Gender from "./gender";

export default class Dog {
  public readonly ID: number;
  public Name: string;
  public Age: number;
  public Breed: string;
  public Gender: Gender;
  constructor(
    ID: number,
    Name: string,
    Age: number,
    Breed: string,
    Gender: Gender
  ) {
    this.ID = ID;
    this.Name = Name;
    this.Age = Age;
    this.Breed = Breed;
    this.Gender = Gender;
  }
}
