import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
//   console.log(favorites);

  return (
    <div className="ml-[10re]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap ">
        {favorites.map((product) => (
          <div className="lg:w-[32%]">
            <Product key={product._id} product={product} />
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Favorites;
