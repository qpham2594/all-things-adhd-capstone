import Head from 'next/head'
import Link from 'next/link'
import { recipesByID } from '@/app/api/recipes/route';


export async function getServerSideProps({ params: { id } }) {
  if (!id) {
    return { props: null }
  }
  
  const recipeDetails = await recipesByID(id);

  return {
    props: { recipeDetails }
  }
}

const RecipeDetailPage = ({ recipeDetails }) => {
  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{recipeDetails ? recipeDetails.title : 'Recipe Not Found'}</title>
        <meta name="description" content={recipeDetails ? 'Recipe info for ' + recipeDetails.title : 'Recipe Not Found Page'} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍴</text></svg>"/>
      </Head>

      {recipeDetails ? (
        <RecipeInfo
          key={recipeDetails.id}
          title={recipeDetails.title}
          image={recipeDetails.image}
          readyInMinutes={recipeDetails.readyInMinutes}
          instructions={recipeDetails.instructions}
          summary={recipeDetails.summary}
          extendedIngredients={recipeDetails.extendedIngredients}/> 
      ) : (
        <RecipeError/>
      )}

      <Link href="/recipes">Return to Search</Link>
    </>
  );
};

function RecipeInfo({
  image,
  title,
  readyInMinutes,
  instructions,
  summary,
  extendedIngredients
}) {
  return (
    <main>
      <h1>{title}</h1>
      <img src={image} alt={title} width={556} height={370} />
      <div>
        <p>Time to Make: {readyInMinutes}min</p>
      </div>
      <div>
        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{__html: summary.replace(/(href=")[\w-/:\.]+-([\d]+)/g, "$1" + '/recipe/' + "$2")}}></div>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {extendedIngredients.map((ing, i) => <li key={i}>{ing.original}</li>)}
        </ul>
      </div>
      <h2>Steps</h2>
      <div dangerouslySetInnerHTML={{__html: instructions}}></div>
    </main>
  );
}

function RecipeError() {
  return (
    <h1>Recipe Not Found!</h1>
  );
}

export default RecipeDetailPage;




