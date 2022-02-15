import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory} from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .required("Enter a valid password")
    .min(5, "Password too short"),
  email: yup.string().email("Invalid email").required("Enter your email-id"),
});

export function Reset() {
  const [status, setStatus] = useState(null);
  
  const history = useHistory();
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "", token: localStorage.getItem("temp_token") },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        
        fetch("https://password-reset-flow-s.herokuapp.com/forgot/reset", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "APPLICATION/JSON" },
        })
          .then((response) => {
            if (response.status === 200){
              localStorage.removeItem("temp_token");
              history.push("/Login");}
            else if (response.status === 401) setStatus(401);
            else if (response.status === 402) {
              setStatus(402);
              console.log("hello");
            }
            return response.json();
          })
          .then((data) => console.log(data));
      },
    });
  return (
    <div className="outerLogin">
    <div className="Login">
      <form onSubmit={handleSubmit} className="Loginbox">
        <TextField
        variant="outlined"
          type="email"
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email "
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}

        <TextField
        variant="outlined"
          type="password"
          id="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
        <Button type="submit">Submit</Button>
      </form>
      {status ? (
        status === 401 ? (
          <div>
            invalid credentials,check the email-id provided or contact the
            administrator
          </div>
        ) : (
          <div>Try changing your own password buddy!!😒</div>
        )
      ) : (
        ""
      )}
    </div>
    </div>
  );
}
