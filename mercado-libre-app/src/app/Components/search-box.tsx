import "./search-box.scss";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

export default function Searchbox() {
  return (
    <>
      <header className="nav-header">
        <div className="nav-header-items">
          <a href="/" className="nav-logo"></a>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <form action={"/items"} className="nav-form">
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Nunca dejes de buscar"
                inputProps={{ "aria-label": "Nunca dejes de buscar" }}
                name="search"
              />
              <IconButton className="nav-button" type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
          </Paper>
        </div>
      </header>
    </>
  );
}
