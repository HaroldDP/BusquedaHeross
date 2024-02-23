import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DcPage,  HeroPage, MarvelPage, SearchPage } from "../pages"


export const HeroesRoutes = () => {
  return (
    <>
        <Navbar/>

        <div className="container">
        <Routes>
        
            <Route path="marvel" element={<MarvelPage/>}/>
            <Route path="dc" element={<DcPage/>}/>
            {/* Search, Hero By id */}
            <Route path="/" element={<Navigate to="/marvel" />}/>
            <Route path="search" element={<SearchPage/>}></Route>
            {/* /: es un comodin  que puede tomar cualquier nombre  para llegar al componente del heroe
             */}
            <Route path="hero/:id" element={<HeroPage/>}></Route>

        </Routes>
        </div>
    </>
  )
}
