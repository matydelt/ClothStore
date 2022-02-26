import { useEffect } from "react";
import {
  ThemeProvider,
  // Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/reduxHooks";
import AdminPage from "./components/adminPage/adminPage";
import UsuariosAdmPage from "./components/adminPage/components/usuarios/usuarios";
import EmployeePage from "./components/adminPage/employeePage";
import theme from "./components/controllers/themeConfig";
import CreatePublication from "./components/createPublication/CreatePublication";
import Homepage from "./components/HomePage/Homepage";
import PerfilUsuario from "./components/PerfilUsuario";
import PublicationDetail from "./components/publicationDetail/PublicationDetail";
import { useAuth } from "./hooks/useAuth";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import { getCarrito } from "./redux/actions/carritoAction";
import {
  cartLength,
  putPublications,
} from "./redux/actions/publicationActions";
import PublicacionesAdmPage from "./components/adminPage/components/publicaciones/publicaciones";
import Denuncias from "./components/adminPage/components/denuncias/denuncias";
import { getAuth } from "firebase/auth";
import { setSignedInUser } from "./redux/actions/userActions";
import ReactGa from "react-ga";
import { useLocation, Route, Routes } from "react-router-dom";
import "./App.css";

// const user = useSelector((state: RootState) => state.userSignin.userInfo)

const App = (): JSX.Element => {
  const location = useLocation();

  //google analytics
  useEffect(() => {
    ReactGa.initialize("UA-215041281-1");
    ReactGa.pageview(location.pathname);
  }, [location]);
  //google analytics
  const dispatch = useDispatch();
  const { name, order, page, mark, category, gender, price, author } =
    useAppSelector((state) => state.publicationList);

  const auth = useAuth();
  useEffect(() => {
    if (auth?.user && auth.user.email) {
      dispatch(getCarrito(auth.user.email));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(
      putPublications({
        name: name,
        order: order,
        page: page,
        mark: mark,
        category: category,
        gender: gender,
        price: price,
        author: author,
      })
    );
  }, [author, category, dispatch, gender, mark, name, order, page, price]);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user: any) => {
      if (user?._id) {
        dispatch(setSignedInUser({ eMail: user.email }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartLength());
  }, [dispatch]);

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (!Array.isArray(cart)) {
        localStorage.setItem("cart", "[]");
      }
    } else {
      localStorage.setItem("cart", "[]");
    }
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      {/* // <StylesProvider injectFirst>
      // </StylesProvider> */}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route
            path="/admin/publicaciones"
            element={<PublicacionesAdmPage />}
          />
          <Route
            path="/employee/publicaciones"
            element={<PublicacionesAdmPage />}
          />
          <Route path="/admin/denuncias" element={<Denuncias />} />
          <Route path="/employee/denuncias" element={<Denuncias />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/nueva-publicacion" element={<CreatePublication />} />
          <Route
            path="/actualizar-publicacion/:publicationId"
            element={<CreatePublication />}
          />
          <Route
            path="/publication/:publicationId"
            element={<PublicationDetail />}
          />
          <Route path="/register" element={<RegisterScreen />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route path="/cart" element={<CartScreen />}></Route>
          <Route path="/perfil/*" element={<PerfilUsuario />}>
            <Route path="detalles" />
            <Route path="compras" />
            <Route path="productos" />
            <Route path="ventas" />
            <Route path="deseos" />
          </Route>
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
