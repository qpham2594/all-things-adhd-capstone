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

export async function getStaticPaths() {
  const response = await axios.get('/api/recipes');
  const recipes = response.data;

  const paths = recipes.map((recipe) => ({
    params: { id: recipe.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/recipes/${params.id}`);
  const recipe = response.data;

  return { props: { recipe }, revalidate: 60 };
}
