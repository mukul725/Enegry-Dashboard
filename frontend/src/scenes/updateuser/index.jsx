import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../services/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const roles = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

const UpdateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}/`);
        setUser(res.data);
      } catch (error) {
        console.log("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading......</div>;

  const initialValues = {
    username: user?.username || "",
    password: "",
    email: user?.email || "",
    role: user?.role || "",
    country: user?.country || "",
    state: user?.state || "",
  };

  const handleFormSubmit = async (values) => {
    try {
      const payload = {};
      Object.keys(values).forEach((key) => {
        if (values[key] !== initialValues[key] && values[key] !== "") {
          payload[key] = values[key];
        }
      });

      if (Object.keys(payload).length === 0) {
        alert("No changes made.");
        return;
      }

      const res = await api.patch(`/users/${id}/`, payload);
      alert(`User ${res.data.username} Updated!`);
      navigate("/dashboard/users/");
    } catch (err) {
      alert("Error creating user (check permissions)", err.message);
    }
  };

  return (
    <Box m="20px">
      <Header title="UPDATE USER" subtitle="Update User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="UserName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                variant="filled"
                select
                label="Select Roles"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
  email: yup.string().email("invalid email"),
  role: yup.string(),
  country: yup.string(),
  state: yup.string(),
});

export default UpdateUser;
