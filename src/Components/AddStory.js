import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddStory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
    axios
      .post("http://localhost:8080/api/stories", data)
      .then(function (response) {
        console.log(response);
        alert("New story created");
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });

  return (

    <div className="Empty">
          <h1 className="Test2">Add new story</h1>
      <div className="flex-child">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            {...register("title", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            id="filled-basic"
            label="Author"
            variant="filled"
            {...register("author", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            id="filled-basic"
            label="Genre"
            variant="filled"
            {...register("genre", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            {...register("description", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            id="filled-basic"
            label="ActualStory"
            variant="filled"
            {...register("actualStory", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <div>
            <Button variant="outlined" type="submit">
              Add story
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}