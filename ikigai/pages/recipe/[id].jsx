// need to create jsx for individual recipe information here

import { useRouter } from 'next/router';
import axios from 'axios';

const RecipeDetailPage = ({ recipe }) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Recipe ID: {id}</p>
    </div>
  );
};

export default RecipeDetailPage;


