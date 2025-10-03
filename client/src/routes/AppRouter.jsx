// // frontend/src/router/AppRouter.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import WelcomePage from "../pages/WelcomePage";
// import PrivateRoute from "./PrivateRoute";

// // Burada örnek olarak sahte sayfalar ekliyorum.
// // Senin elinde zaten LoginPage, RegisterPage, HomePage varsa onları import et.
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import HomePage from "../pages/HomePage";

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/welcome" element={<WelcomePage />} />
//         <Route path="/auth/login" element={<LoginPage />} />
//         <Route path="/auth/register" element={<RegisterPage />} />

//         {/* Private Route */}
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute>
//               <HomePage />
//             </PrivateRoute>
//           }
//         />

//         {/* Default yönlendirme */}
//         <Route path="*" element={<WelcomePage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
