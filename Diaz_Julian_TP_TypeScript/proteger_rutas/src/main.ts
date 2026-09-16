import { checkAuthUser } from "./utils/auth";

const ejecutarGuard = () => {
    const path = window.location.pathname;

    console.log("Ruta actual detectada:", path);

    if (path.includes("/pages/admin/")) {

        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "src/pages/client/home/home.html",
            "admin"
        );
    }

    else if (path.includes("/pages/client/")) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "/src/pages/admin/home/home.html",
            "client"
        );
    }
};

ejecutarGuard();