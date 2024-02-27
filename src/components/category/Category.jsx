import React from 'react';
import { useNavigate } from 'react-router-dom';

const category = [
    {
        image: 'https://th.bing.com/th/id/R.55b9d92e8ccbf9cfcf42ff1566be598e?rik=tWB8FcrwWdukFg&pid=ImgRaw&r=0',
        name: 'Action'
    },
    {
        image: 'https://th.bing.com/th/id/R.389634b875920ee85035cf7fe7075448?rik=P3aHr6KOjuFEQQ&pid=ImgRaw&r=0',
        name: 'Adventure'
    },
    {
        image: 'https://th.bing.com/th/id/R.6391eee0ee9fe2c0077054d201c49997?rik=mdZOSTZg7wEwvQ&riu=http%3a%2f%2fclipartix.com%2fwp-content%2fuploads%2f2018%2f03%2fstrategy-clipart-2018-3.png&ehk=Exw7pG8y%2b7YLOzRuwu9I%2fPyqll3ddbYvK6spGX8kp1Y%3d&risl=&pid=ImgRaw&r=0',
        name: 'Strategy'
    },
    {
        image: 'https://th.bing.com/th/id/R.5e1b3b885682250e7da5417af2ef064f?rik=yTP5eYaA%2fRijBA&riu=http%3a%2f%2fassets.stickpng.com%2fthumbs%2f580b57fcd9996e24bc43c299.png&ehk=LQrFcybU%2f4v%2fAZTyxxxLB%2brzVFRvLq67cyzcgYTXG08%3d&risl=&pid=ImgRaw&r=0',
        name: 'Shooter'
    },
    {
        image: 'https://th.bing.com/th/id/OIP.ft1_ODb-fExXxJlqAye7HwHaF0?rs=1&pid=ImgDetMain',
        name: 'Sports'
    },
    {
        image: 'https://th.bing.com/th/id/OIP.0_Vv-n6-sVwk-J8dTTTybgHaHj?rs=1&pid=ImgDetMain',
        name: 'Horror'
    },
    {
        image: 'https://th.bing.com/th/id/R.d9c7dfd997644acd4788c75548c4881c?rik=BvRu%2fETFnwa5fA&riu=http%3a%2f%2fcdn190.picsart.com%2f231146538027202.png&ehk=tl%2fKOlrJS3k4gGBukq1pogTfZQmRHpvQnZdHGJJRFxw%3d&risl=&pid=ImgRaw&r=0',
        name: 'Simulation'
    },
    {
        image: 'https://th.bing.com/th/id/OIP.PbaymEQjLgomza55VKtAVAHaH0?rs=1&pid=ImgDetMain',
        name: 'Puzzle'
    }
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => (
                            <div key={index} className="px-3 lg:px-10">
                                {/* Image  */}
                                <div
                                    onClick={() => navigate(`/category/${item.name}`)}
                                    className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer transition duration-300"
                                >
                                    <div className="flex justify-center mb-2">
                                        {/* Image tag  */}
                                        <img src={item.image} alt="img" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white" />
                                    </div>
                                    {/* Name Text  */}
                                    <h1 className="text-sm sm:text-lg font-medium text-center text-white">{item.name}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;
