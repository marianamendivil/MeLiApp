import { Box, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import "./item-detail.scss";

export default function ItemDetails(props: any) {
  const { itemState } = props;
  console.log(itemState);
  return (
    <Box
      className="product-box"
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Paper className="product-paper" elevation={0}>
        <div className="product-section">
          <img src={itemState.picture} alt="" className="product-image" />
          <div className="product-info">
            <span style={{fontSize: 14}}>{itemState.condition}</span>
            <h2>{itemState.title}</h2>
            <span>
              ${itemState.price?.amount}
              {itemState.price?.decimals ? "," + itemState.price.decimals : ""}
            </span>
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize", marginTop: 3 }}
              disableElevation
            >
              Comprar
            </Button>
          </div>
        </div>
        <div className="product-description">
          <h2>Descripción del producto</h2>
          <p>{itemState.description}</p>
        </div>
      </Paper>
    </Box>
  );
}
