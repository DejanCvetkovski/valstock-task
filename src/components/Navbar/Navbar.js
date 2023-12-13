import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();
  const { myAlbums } = useSelector((state) => state.albums);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const close = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", close);
  });

  useEffect(() => {
    setDropdownVisible(false);
  }, [location]);

  const LogOut = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="title-container">
          <Link to={"/"}>valstock</Link>
        </div>
        <div ref={dropdownRef} className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            MY ALBUMS
          </button>
          {isDropdownVisible &&
            (myAlbums.length !== 0 ? (
              <ul className="dropdown-content">
                {myAlbums?.map((album) => (
                  <li key={album.id}>
                    <Link key={album.albumName} to={`/albums/${album.id}`}>
                      {album.albumName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dropdown-content">no album created</p>
            ))}
        </div>
        {isLoggedIn && <Button onClick={LogOut}>LOG OUT</Button>}
      </div>
    </nav>
  );
};

export default Navbar;
