import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../features/users/usersApiSlice";
import { setCredentials } from "../app/api/authSlice.js";
import { toast } from "react-toastify";

const schema = yup.object({
  username: yup.string().required(),
  firstName: yup.string().min(2).max(32).required(),
  lastName: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(32)
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const [update, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data) => {
    try {
      delete data.confirmPassword;
      const response = await update(data).unwrap();
      dispatch(setCredentials({ ...response }));
      //  navigate("/");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
        {isLoading && <Typography variant="h1">LOADING</Typography>}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                defaultValue={userInfo.username}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username ? errors.username?.message : ""}
                    autoComplete="username"
                    label="Username"
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="firstName"
                control={control}
                defaultValue={userInfo.firstName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    error={!!errors.firstName}
                    helperText={
                      errors.username ? errors.firstName?.message : ""
                    }
                    autoComplete="given-name"
                    label="First Name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="lastName"
                control={control}
                defaultValue={userInfo.lastName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.username ? errors.lastName?.message : ""}
                    autoComplete="family-name"
                    label="Last Name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue={userInfo.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email?.message : ""}
                    autoComplete="email"
                    label="Email"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password?.message : ""}
                    autoComplete="new-password"
                    label="Password"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword?.message
                        : ""
                    }
                    autoComplete="new-password"
                    label="Confirm Password"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
