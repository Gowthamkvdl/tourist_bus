# Start Rating Component

Save time and effortlessly implement a star rating system in your app without the need to write the entire code from scratch. 
It's easily customizable and straightforward to integrate.

![star](https://github.com/ritik48/Star-Rating/assets/84488726/92d0541c-47fa-4e2c-b90e-cead041f83be)


### How to use:

- Run the following command
  ```
  npm install star-ratings-react
  ```

- Import the StarRating component into your React application.
  ```
  import { StarRating } from "star-ratings-react";
  ```

- Define a state variable to store the rating value in your component.
  ```
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  ```

- Add the StarRating component to your JSX, passing the state variable and the function to set the rating.
  ```
  return (
      <>
          <h1>Hello, Stars !!!</h1>
          <StarRating rating={rating} onSetRating={setRating} size={20}/>
          <StarRating rating={rating2} onSetRating={setRating2} starColor={"skyblue"} />
          <StarRating rating={rating3} onSetRating={setRating3} starColor={"white"} maxRating={5}/>
          <StarRating rating={rating4} onSetRating={setRating4} starColor={"red"} maxRating={3}/>
      </>
  );
  ```
