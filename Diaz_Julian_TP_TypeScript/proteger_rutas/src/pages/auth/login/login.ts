import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usersDataRaw = localStorage.getItem("users") || "[]";
  const usersList: IUser[] = JSON.parse(usersDataRaw);

  const userFound = usersList.find(
    (user: IUser) => user.email === valueEmail && user.password === valuePassword
  );

  if (!userFound) {
    alert("¡Error! Credenciales incorrectas o usuario no registrado.");
    return;
  }

  userFound.loggedIn = true;

  saveUser(userFound);

  alert("¡Inicio de sesión exitoso!");

  if (userFound.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (userFound.role === "client") {
    navigate("/src/pages/client/home/home.html");
  }
  
});
