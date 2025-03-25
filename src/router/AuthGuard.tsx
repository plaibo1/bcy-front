import { Flex, Spin } from "antd";
import { useEffect, type ReactNode } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router";
import { useGetRegionsQuery } from "../store/api/rdmApi";

// ГЫГЫГЫ
const useAuth = () => {
  const { data, isLoading } = useGetRegionsQuery();

  return { isAuth: !!data, isLoading };
};

const AuthGuardWithQueryCheck = ({ children }: { children: ReactNode }) => {
  const { isAuth, isLoading } = useAuth();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuth) {
      navigate({
        pathname: "/login",

        // Сохраняем текущий путь для редиректа после логина
        search: createSearchParams({
          redirect: encodeURIComponent(pathname),
        }).toString(),
      });
    }
  }, [isAuth, isLoading, pathname, navigate]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: 350 }}>
        <Spin />
      </Flex>
    );
  }

  if (isAuth) {
    return <>{children}</>;
  }

  return null;
};

const isAuth = () => {
  const token = localStorage.getItem("token");
  const isAuth = !!token;

  return isAuth;
};

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, [navigate]);

  return <AuthGuardWithQueryCheck>{children}</AuthGuardWithQueryCheck>;
};
