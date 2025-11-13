import React, { useState } from 'react';
import Header from '../components/Header';
import ShowCard from '../components/ShowCard';
import TrendingCard from '../components/TrendingCard';
import FeaturedCard from '../components/FeaturedCard';
import ContinueWatchingCard from '../components/ContinueWatchingCard';
import { homeData } from '../data/mockData';
import { Show } from '../types';

interface HomeScreenProps {
    onActivateSearch: () => void;
}

const SectionHeader: React.FC<{ title: string; showMore?: boolean; }> = ({ title, showMore = true }) => (
    <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {showMore && <a href="#" className="text-sm text-brand-text-secondary">More</a>}
    </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onActivateSearch }) => {
    const [activeHomeTab, setActiveHomeTab] = useState('For You');
    const [localHomeData, setLocalHomeData] = useState(homeData);

    const handleToggleFavorite = (id: number) => {
        const updateShow = (show: Show) => show.id === id ? { ...show, isFavorite: !show.isFavorite } : show;

        setLocalHomeData(prev => ({
            ...prev,
            featured: updateShow(prev.featured),
            movies: prev.movies.map(updateShow),
            tvShows: prev.tvShows.map(updateShow),
            trending: prev.trending.map(updateShow),
            popularMovies: prev.popularMovies.map(updateShow),
            popularTvShows: prev.popularTvShows.map(updateShow),
            continueWatching: prev.continueWatching.map(updateShow)
        }));
    };
    
    const handleFeaturedRatingChange = (newRating: number) => {
        setLocalHomeData(prevData => {
            const featuredShow = prevData.featured;
            const oldTotalRating = (featuredShow.rating || 0) * (featuredShow.ratingCount || 0);
            const ratingCount = featuredShow.userRating ? featuredShow.ratingCount || 0 : (featuredShow.ratingCount || 0) + 1;
            const newTotalRating = oldTotalRating - (featuredShow.userRating || 0) + newRating;
            const newAverageRating = ratingCount > 0 ? newTotalRating / ratingCount : newRating;

            const updatedFeaturedShow = {
                ...featuredShow,
                rating: newAverageRating,
                ratingCount: ratingCount,
                userRating: newRating,
            };

            return { ...prevData, featured: updatedFeaturedShow };
        });
    };

    const renderContent = () => {
        if (activeHomeTab === 'For You') {
            const allShowsFromState = [
                localHomeData.featured,
                ...localHomeData.movies,
                ...localHomeData.tvShows,
                ...localHomeData.trending,
                ...localHomeData.popularMovies,
                ...localHomeData.popularTvShows,
                ...localHomeData.continueWatching,
            ];

            const uniqueShows = Array.from(new Map(allShowsFromState.map(show => [show.id, show])).values());
            const favoritedShows = uniqueShows.filter(show => show.isFavorite);
            
            return (
                <>
                    <FeaturedCard show={localHomeData.featured} onRatingChange={handleFeaturedRatingChange} onToggleFavorite={handleToggleFavorite}/>
                    <section>
                        <SectionHeader title="Continue Watching" showMore={false} />
                        <div className="pl-4">
                            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                                {localHomeData.continueWatching.map(show => (
                                    <ContinueWatchingCard key={show.id} show={show} onToggleFavorite={handleToggleFavorite} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {favoritedShows.length > 0 && (
                        <section>
                            <SectionHeader title="My List" />
                            <div className="pl-4">
                                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                                    {favoritedShows.map(show => (
                                        <ShowCard key={show.id} show={show} onToggleFavorite={handleToggleFavorite} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    <section>
                        <SectionHeader title="Trending" />
                        <div className="grid grid-cols-2 gap-4 px-4">
                            {localHomeData.trending.map(show => (
                                <TrendingCard key={show.id} show={show} onToggleFavorite={handleToggleFavorite} />
                            ))}
                        </div>
                    </section>
                </>
            );
        }
        
        const content = activeHomeTab === 'Movies' ? localHomeData.popularMovies : localHomeData.popularTvShows;
        return (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 px-4">
                {content.map(show => <ShowCard key={show.id} show={show} onToggleFavorite={handleToggleFavorite} />)}
            </div>
        )
    }

    return (
        <div>
            <Header title="Dragon TV" onActivateSearch={onActivateSearch} />
            
            <div className="space-y-6 py-6">
                <div>
                    <div className="flex items-center space-x-6 px-4 mb-4 border-b border-brand-gray pb-3">
                        {['For You', 'Series', 'Movies'].map(tab => (
                             <h2 
                                key={tab}
                                className={`text-xl font-bold cursor-pointer transition-colors ${activeHomeTab === tab ? 'text-white' : 'text-brand-text-secondary'}`} 
                                onClick={() => setActiveHomeTab(tab)}
                             >
                                {tab}
                            </h2>
                        ))}
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;