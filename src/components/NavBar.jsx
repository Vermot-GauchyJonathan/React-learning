
export default function NavBar(){
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="./">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="./">Accueil</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="./">Tic Tac Toe</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="./">Autre</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}