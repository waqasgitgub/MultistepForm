import React from 'react';
import '../GlobalStyles/globalStyles.css';
import logoSite from '../GlobalImages/logo-set.png';
import profilePic from '../GlobalImages/desin.png';
import Menu from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Navbar.css';

const NavLogin = () => {
const history = useHistory();
    const handleLogin = () => {
        history.push('/login')
    }

  return (
  
    <section class="navbar">
    <nav class="navbar navbar-expand-lg bg-light fixed-top py-2">
        <div class="container">
            <a class="navbar-brand" href="index.php">
            <img class="logo-set" src={logoSite} alt="" />
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"
                aria-controls="offcanvasMenu" aria-expanded="false" aria-label="Toggle navigation">
                <Menu/>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu"
                aria-labelledby="offcanvasMenuLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasMenuLabel">
                        <a class="navbar-brand" href="index.php">
                        <img class="logo-set" src={logoSite} alt="" />
                        </a>
                    </h5>

                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>

                <div class="offcanvas-body justify-content-end">
                    <ul class="navbar-nav">
                        <li class="about nav-item active me-1" onClick={handleLogin}>
                            <a class="nav-link cool-link active" href="" style={{marginTop: 4}}>
                               Login</a>
                        </li>

                        <li class="about nav-item active me-1">
                            <a class="nav-link cool-link active" href="">
                                Start a new application</a>
                        </li>

                      

                     
                        <li class="about nav-item active"></li>
                    </ul>

                   
                </div>
            </div>
        </div>
    </nav>
</section>
   
  )
}

export default NavLogin;














