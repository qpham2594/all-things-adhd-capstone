import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { recipesSearch, recipesByTime } from '../app/api/recipes/route';
import styles from '@/styles/page.module.css';
import Head from "next/head";

function RecipeSearchPage() {
  const [query, setQuery] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [searchType, setSearchType] = useState('query');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      let data;
      if (searchType === 'query') {
        data = await recipesSearch(query);
      } else if (searchType === 'time') {
        data = await recipesByTime(maxTime);
      }
      setResults(data.results);
    } catch (error) {
      console.error('Error searching for recipes:', error);
    }
  };

  const handleRecipeClick = (id) => {
    router.push(`/recipe/${id}`);
  };

  return (
    <div>
      <Head>
        <title> Ikigai Recipes Search </title>
        <meta name="description" content="Search for your recipes based on ingredients or time here!" />
      </Head>
      <h1 className={styles.h1}>Recipe Search</h1>
      <div className={styles.recipeSearchContainer}>
        <label className={styles.searchText}>
          Search by:
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className={styles.searchOption}
            aria-label="Search Type"
          >
            <option value="query">Ingredients</option>
            <option value="time">Max Time</option>
          </select>
        </label>
        <div className={styles.searchInputContainer}>
          {searchType === 'query' ? (
            <>
              <label htmlFor="query" className={styles.label}>
                Ingredients:
              </label>
              <input
                id="query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
              />
            </>
          ) : (
            <>
              <label htmlFor="maxTime" className={styles.label}>
                Max Time (minutes):
              </label>
              <input
                id="maxTime"
                type="number"
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                placeholder="Max Time (minutes)"
                className={styles.searchInput}
              />
            </>
          )}
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>
      <div>
        <h2 className={styles.h1}>Results</h2>
        {results.length > 0 ? (
          <ul className={styles.recipeResultContainer}>
            {results.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className={styles.recipeImageText}
              >
                <img src={recipe.image} alt={recipe.title} />
                <div>
                  <h3>{recipe.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.logoutText}>No results found</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSearchPage;

