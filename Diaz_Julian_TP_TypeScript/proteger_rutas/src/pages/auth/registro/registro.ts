import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const registroForm = document.getElementById("registroForm") as HTMLFormElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;



registroForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();


    if (!emailValue || !passwordValue) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const usersDataRaw = localStorage.getItem("users") || "[]";

    const usersList: IUser[] = JSON.parse(usersDataRaw);

    const existeUsuario = usersList.some((user: IUser) => user.email === emailValue);

    if (existeUsuario) {
        alert("¡Error! Este correo electrónico ya está registrado.");
        return;
    }

    const nuevoUsuario: IUser = {
        email: emailValue,
        password: passwordValue,
        loggedIn: false,
        role: emailValue.includes("admin") ? "admin" : "client"
    };

    usersList.push(nuevoUsuario);
    localStorage.setItem("users", JSON.stringify(usersList));

    alert("¡Registro exitoso! Ya podes iniciar sesión.");

    navigate("/src/pages/auth/login/login.html");
});