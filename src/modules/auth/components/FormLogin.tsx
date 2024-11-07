import { FC } from "react";
import { TextField, Button } from "@mui/material";
import formStyle from "../style/LoginForm.module.css";

type FormLoginProps = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  errorMessage?: string;
  loading: boolean;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormLogin: FC<FormLoginProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  errorMessage,
  loading,
  handleLogin,
}) => {
  return (
    <div className={`mb-5 mt-5 flex w-full flex-col ${formStyle.container}`}>
      <form
        onSubmit={handleLogin}
        className={`m-10 space-y-4 ${formStyle.form}`}
      >
        <div>
          <label htmlFor="username" className={formStyle.label_style}>
            Tên đăng nhập
          </label>
          <TextField
            id="username"
            variant="outlined"
            size="small"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full font-rounded"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="password" className={formStyle.label_style}>
            Mật khẩu
          </label>
          <TextField
            id="password"
            variant="outlined"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full font-rounded"
          />
        </div>
        {errorMessage && (
          <div className={formStyle.error_message}>{errorMessage}</div>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={`mt-6 font-rounded font-semibold ${formStyle.button_login}`}
          disabled={loading}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;
