import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout"; 
import Track from "../../components/track/Track";

const HomePage = () => {
    return (
        <Layout>
            <div className="bg-gray-900 text-white">
                <HeroSection />
                <Category />
                <HomePageProductCard />
                <Track />
            </div>
        </Layout>
    );
}

export default HomePage;
