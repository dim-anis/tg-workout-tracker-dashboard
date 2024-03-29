import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

import Note from "./note";
import Button from "../components/Button";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  max-width: 50em;
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColorSecondary};
  box-shadow: var(--shadow-elevation-low);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100em;
`;

export const StyledInput = styled.input`
  color: ${(props) => props.theme.textColorSecondary};
  font-size: var(--fs-300);
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.textColorSecondary};

  &:autofill {
    background: transparent;
  }

  &:focus {
    color: ${(props) => props.theme.textColor};
    border-color: transparent;
    outline: 2px solid ${(props) => props.theme.colorMain};
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    background: transparent;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  &:focus:not(:placeholder-shown)[aria-invalid="true"] {
    outline: 2px solid ${(props) => props.theme.colorHighlightRed};
    border-color: transparent;
  }

  &:not(:focus):not(:placeholder-shown)[aria-invalid="false"] {
    //outline: 2px solid ${(props) => props.theme.colorHighlightGreen};
    outline: 2px solid ${(props) => props.theme.bgColorSecondary};
    border-color: transparent;
  }
`;

export const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  margin-bottom: 1rem;
  font-size: var(--fs-600);
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colorHighlightRed};
  background-color: ${(props) => props.theme.colorHighlightBgRed};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const from = location.state?.from?.pathname || "/";

  const signInUser = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "/signin",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      auth.signin({ accessToken: res.data.accessToken }, () => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.message);
      } else if (err.response.status === 404) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <Container>
      <FormWrapper>
        <H1>Sign in</H1>
        {errMsg && <ErrorMessage ref={errorRef}>{errMsg}</ErrorMessage>}
        <StyledForm onSubmit={signInUser} action="">
          <div>
            <label htmlFor="email"></label>
            <StyledInput
              type="email"
              name="email"
              id="email"
              ref={userRef}
              placeholder="Email"
              aria-label="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <StyledInput
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              aria-label="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button main width="100%" type="submit">
              Sign In
            </Button>
          </div>
        </StyledForm>
        <Note to="/register" linkText="Create an account">
          Don't have an account yet?
        </Note>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
