import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Image from "./Image";

const Body = () => {
  const [selectedValue, setSelectedValue] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "40788016-5de2b2f18227942bb58638b05",
            q: searchTerm,
          },
        });

        setImages(response.data.hits);
      } catch (error) {
        console.log("Error in fetching data: ", error);
      }
    };
    data();
  }, [searchTerm]);

  const handleItemClick = (value) => {
    setSelectedValue(value);
    setAnchorEl(null); // Close the menu after selecting an item
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <OutlinedInput
        className="inp"
        fullWidth={true}
        placeholder="Search for images"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div>
        <Button
          className="btn btn-secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          {selectedValue}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleItemClick(5)}>5</MenuItem>
          <MenuItem onClick={() => handleItemClick(10)}>10</MenuItem>
          <MenuItem onClick={() => handleItemClick(15)}>15</MenuItem>
        </Menu>
      </div>

      <div>
        {searchTerm.length > 0 ? (
          <Image images={images.slice(0, selectedValue)} />
        ) : null}
      </div>
    </div>
  );
};

export default Body;
