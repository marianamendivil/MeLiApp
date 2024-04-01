import { Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./results.scss";

export default function Results(props: any) {
  const { product } = props;

  return (
    <>
      <Link href={`/items/${product.id}`} underline="none">
        <div className="results-box">
          <img src={product.picture} alt="" className="product-image" />
          <div className="product-info">
            <span>
              ${product.price?.amount}
              {product.price?.decimals ? "," + product.price.decimals : ""}
            </span>
            <h2>{product.title}</h2>
          </div>
        </div>
      </Link>
      <Divider variant="middle" sx={{ opacity: 0.6 }} />
    </>
  );
}
