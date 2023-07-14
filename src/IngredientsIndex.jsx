import { useState } from "react";

export function IngredientsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");
  return (
    <div id="ingredients-index">
      <div className="row">
        <h1 className="col-6 pt-3">All Ingredients</h1>
        <div className="col-6 d-flex justify-content-end">
          <div className="row pt-3">
            <label htmlFor="searchBox">
              <b>Search Ingredients</b>
            </label>
            <input
              id="searchBox"
              className="align-self-end"
              type="text"
              value={searchFilter}
              onChange={(event) => setSearchFilter(event.target.value)}
            />
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-success col" onClick={() => props.onNewIngredient()}>
        Create Ingredient
      </button>
      <div className="row pt-3">
        {props.ingredients
          .filter((ingredient) => ingredient.name.toLowerCase().includes(searchFilter.toLowerCase()))
          .map((ingredient) => (
            <div className="col-3 g-0 d-flex align-items-stretch" key={ingredient.id}>
              <div className="card w-100">
                <img src={ingredient.picture} className="card-img-top h-50 img-fluid" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ingredient.name}</h5>
                  <p className="card-text">Calories: {ingredient.calories}</p>
                  <button
                    type="button"
                    className="btn btn-primary mt-auto"
                    onClick={() => props.onShowIngredient(ingredient)}
                  >
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
