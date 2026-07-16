import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HOME_PATH } from "@/consts/paths";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page introuvable | Apex Prestige</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Page introuvable</p>
          <a href={HOME_PATH} className="text-brand-blue hover:text-black underline">
            Retour à l’accueil
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
