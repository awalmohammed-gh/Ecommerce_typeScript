import Advert from "../components/landing/Advert";
import CommunityLikes from "../components/landing/CommunityLikes";
import FeatureProduct from "../components/landing/FeatureProduct";
import Hero from "../components/landing/Hero"
import NewArrival from "../components/landing/NewArrival";
import ShopByCategory from "../components/landing/ShopByCategory";
import ShopCategory from "../components/landing/ShopCategory"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6">
        <ShopCategory />
        <NewArrival />
      </div>
      <Advert />
      <div className="container mx-auto px-4 sm:px-6">
        <FeatureProduct/>
        <ShopByCategory/>
        <CommunityLikes/>
      </div>
    </div>
  );
}

export default Home
