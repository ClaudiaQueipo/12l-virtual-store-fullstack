// import { setRole, setToken, setUser, setUserId } from "../../../utils/auth";

// class AuthService {
//   async loginUser(username, password) {
//     const data = {
//       username: username,
//       password: password,
//     };

//     const apiUrl = `${import.meta.env.VITE_APP_API_URL}/login`;

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error al intentar hacer login:", errorData.error);
//         return false;
//       }

//       const tokenData = await response.json();
//       console.log(tokenData);
//       setToken(tokenData.access_token);
//       setUser(username);
//       setRole(tokenData.rol);
//       setUserId(tokenData.user_id);
//       return true;
//     } catch (error) {
//       console.error("Error en la solicitud de login:", error);
//       return false;
//     }
//   }
// }

// const authService = new AuthService();
// export { authService };

import { setToken, setUser, setRole, setUserId } from "../../../utils/auth";

class CreateAccountService {
  async createAccount(username, password) {
    const data = {
      username: username,
      password: password,
    };

    const apiUrl = `${import.meta.env.VITE_APP_API_URL}/create-account`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear la cuenta:", errorData.error);
        return false;
      }

      const tokenData = await response.json();
      console.log("Cuenta creada exitosamente:", tokenData);
      setToken(tokenData.access_token);
      setUser(username);
      setRole(tokenData.role);
      setUserId(tokenData.user_id);
      return true;
    } catch (error) {
      console.error("Error en la solicitud para crear la cuenta:", error);
      return false;
    }
  }
}

const createAccountService = new CreateAccountService();
export { createAccountService };