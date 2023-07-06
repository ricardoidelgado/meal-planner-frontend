import axios from "axios";
import { useState, useEffect } from "react";
import { IngredientsIndex } from "./IngredientsIndex";
import { IngredientsShow } from "./IngredientsShow";
import { Modal } from "./Modal";
import { IngredientsNew } from "./IngredientsNew";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Content() {
  const [ingredients, setIngredients] = useState([]);
  const [isIngredientsShowVisible, setIsIngredientsShowVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const handleIndexIngredients = () => {
    axios.get("http://localhost:3000/ingredients.json").then((response) => {
      setIngredients(response.data);
    });
  };

  const handleShowIngredient = (ingredient) => {
    setIsIngredientsShowVisible(true);
    setCurrentIngredient(ingredient);
  };

  const handleCreateIngredient = (params, successCallback) => {
    axios.post("http://localhost:3000/ingredients.json", params).then((response) => {
      setIngredients([...ingredients, response.data]);
      successCallback();
    });
  };

  const handleUpdateIngredient = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/ingredients/${id}.json`, params).then((response) => {
      setIngredients(
        ingredients.map((ingredient) => {
          if (ingredient.id === response.data.id) {
            return response.data;
          } else {
            return ingredient;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyIngredient = (ingredient) => {
    axios.delete(`http://localhost:3000/ingredients/${ingredient.id}.json`).then(() => {
      setIngredients(ingredients.filter((i) => i.id !== ingredient.id));
      handleClose();
    });
  };

  const handleClose = () => {
    setIsIngredientsShowVisible(false);
  };

  useEffect(handleIndexIngredients, []);

  return (
    <div>
      <Signup />
      <Login />
      <LogoutLink />
      <IngredientsNew onCreateIngredient={handleCreateIngredient} />
      <IngredientsIndex ingredients={ingredients} onShowIngredient={handleShowIngredient} />
      <Modal show={isIngredientsShowVisible} onClose={handleClose}>
        <IngredientsShow
          ingredient={currentIngredient}
          onUpdateIngredient={handleUpdateIngredient}
          onDestroyIngredient={handleDestroyIngredient}
        />
      </Modal>
    </div>
  );
}
