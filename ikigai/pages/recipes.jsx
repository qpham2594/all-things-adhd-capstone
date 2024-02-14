import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {recipesSearch, recipesByTime, recipesByID} from '../app/api/recipes/route'
import Image from 'next/image';
import Header from '@/components/header';

const RecipePage = () => {


  return (
    <div>
      <Header/>
      <h1>Recipes</h1>
    </div>
  );
};

export default RecipePage;


