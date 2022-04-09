import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb.js';
import MovieRow from './components/MovieRow.js';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista  total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o filme em destaque (featured)
      let originals = list.filter(i=>i.slug === "originals");
      let randomChoosenMovie = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChoosenMovie];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
      
    }
    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=> (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}