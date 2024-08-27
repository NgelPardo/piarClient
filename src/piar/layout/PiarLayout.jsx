import { NavBar, SideBar } from "../components"

import './PiarLayout.css'
import { useUiStore } from "../../hooks"

export const PiarLayout = ({ children }) => {

  const { windowWidth, isSideBarOpen } = useUiStore();

  return (
    <div className="container-fluid g-0">
      <div className="">
        <div 
          className={`p-0 position-fixed ${ isSideBarOpen && windowWidth > 768 ? 'col-md-2' : 
            isSideBarOpen && windowWidth <= 768 ? 'sidebar-close-sm' : 'sidebar-close' }`}
          style={{ transition: "width 0.2s ease" }}
        >
          <SideBar/>
        </div>
        <div 
          className={`flex-grow-1 vh-100 ${ isSideBarOpen ? 'margin-open-item-container' : 'margin-close-item-container' }`}
          style={{ transition: "margin-left 0.2s ease" }}
        >
          <div className="p-0">
            <NavBar/>
            <main className="h-100" style={{ padding: "60px 10px 10px 10px"}}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
