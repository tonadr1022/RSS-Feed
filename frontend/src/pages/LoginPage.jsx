import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/users/usersApiSlice";
import { setCredentials } from "../app/api/authSlice";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // trigger function and result object from mutation
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
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
                    autoComplete="current-password"
                    label="Password"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
