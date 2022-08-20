import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PersistSignIn = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <p>Loading...</p>
        </LoadingContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistSignIn;
