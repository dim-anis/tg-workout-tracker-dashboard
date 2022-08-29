import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import {
  Container,
  StyledForm,
  StyledInput,
  H1,
  FormWrapper,
  ErrorMessage,
} from "./signin";
import Note from "./note";
import Button from "../components/Button";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

const NAME_REGEX = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const HelperMessage = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.textColorSecondary};
  font-size: var(--fs-200);
  text-align: left;
`;

const Register = () => {
  const errorRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, matchPassword]);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/register",
        JSON.stringify({ email, name, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccess(true);

      setName("");
      setPassword("");
      setMatchPassword("");
      setEmail("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success && <Navigate to="/signin" replace={true} />}
      <Container>
        <FormWrapper>
          <H1>Create a new account</H1>
          {errMsg && <ErrorMessage ref={errorRef}>{errMsg}</ErrorMessage>}
          <StyledForm onSubmit={registerUser} action="">
            <div>
              <label htmlFor="name"></label>
              <StyledInput
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                aria-invalid={validName || !name ? "false" : "true"}
                aria-describedby="uidmessage"
                valid={validName && name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
            </div>
            {nameFocus && !validName && (
              <HelperMessage id="uidmessage">
                - must start with an alphabetic character
                <br />
                - can contain the following characters: a-z A-Z 0-9 - and _
                <br /> - must be between 3 and 23 characters long
              </HelperMessage>
            )}
            <div>
              <label htmlFor="email"></label>
              <StyledInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                aria-invalid={validEmail || !email ? "false" : "true"}
                valid={validEmail && email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <StyledInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                autoComplete="new-password"
                aria-invalid={validPassword || !password ? "false" : "true"}
                aria-describedby="pwdmessage"
                valid={validPassword && password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
            </div>
            {passwordFocus && !validPassword && (
              <HelperMessage id="pwdmessage">
                - at least 8 characters
                <br />
                - must contain at least 1 uppercase letter,
                <br /> 1 lowercase letter and 1 number
              </HelperMessage>
            )}
            <div>
              <label htmlFor="matchPassword"></label>
              <StyledInput
                type="password"
                name="matchPassword"
                id="matchPassword"
                placeholder="Confirm password"
                required
                aria-invalid={validMatch || !matchPassword ? "false" : "true"}
                valid={validMatch && matchPassword}
                onChange={(e) => setMatchPassword(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(true)}
              />
            </div>
            <div>
              <Button main width="100%" type="submit">
                Sign Up
              </Button>
            </div>
          </StyledForm>
          <Note to="/signin" linkText="Sign In">
            Already have an account?
          </Note>
        </FormWrapper>
      </Container>
    </>
  );
};

export default Register;
