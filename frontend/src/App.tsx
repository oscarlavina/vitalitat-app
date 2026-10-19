import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { dictionaries } from "./i18n";
import { Blog } from "./pages/Blog";
import { Equipo } from "./pages/Equipo";
import { Faq } from "./pages/Faq";
import { Home } from "./pages/Home";
import { ParaQuien } from "./pages/ParaQuien";
import { Pending } from "./pages/Pending";
import { PrimeraVisita } from "./pages/PrimeraVisita";
import { Quiropractica } from "./pages/Quiropractica";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="es" element={<Home />} />
        <Route path={dictionaries.ca.slugs.paraQuien} element={<ParaQuien />} />
        <Route path={`es/${dictionaries.es.slugs.paraQuien}`} element={<ParaQuien />} />
        <Route path={dictionaries.ca.slugs.equipo} element={<Equipo />} />
        <Route path={`es/${dictionaries.es.slugs.equipo}`} element={<Equipo />} />
        <Route path={dictionaries.ca.slugs.quiropractica} element={<Quiropractica />} />
        <Route path={`es/${dictionaries.es.slugs.quiropractica}`} element={<Quiropractica />} />
        <Route path={dictionaries.ca.slugs.primeraVisita} element={<PrimeraVisita />} />
        <Route path={`es/${dictionaries.es.slugs.primeraVisita}`} element={<PrimeraVisita />} />
        <Route path={dictionaries.ca.slugs.faq} element={<Faq />} />
        <Route path={`es/${dictionaries.es.slugs.faq}`} element={<Faq />} />
        <Route path={dictionaries.ca.slugs.blog} element={<Blog />} />
        <Route path={`es/${dictionaries.es.slugs.blog}`} element={<Blog />} />
        <Route path="*" element={<Pending />} />
      </Route>
    </Routes>
  );
}
