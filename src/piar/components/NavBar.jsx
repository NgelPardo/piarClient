import { useUiStore } from "../../hooks"

export const NavBar = () => {

  const { openSideBar } = useUiStore();

  return (
    <nav className="navbar navbar-light bg-light position-fixed w-100" style={{ zIndex: '100'}}>
        <div className="container-fluid">
          <button 
            type="button" 
            className="btn fs-4" 
            style={{padding: "0px", color: "#666666"}}
            onClick={ () => openSideBar() }
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
    </nav>
  )
}
