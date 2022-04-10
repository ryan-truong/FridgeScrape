import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'


import TypeWriter from './TypeWriter'
import API from '../API.js'

export const HomeScreen = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        window.location.reload();
    }


    const [recipeLinks, setRecipeLinks] = useState([]);
    const [recipeTitles, setRecipeTitles] = useState([]);

    const getRecipes = async (e) => {

        e.preventDefault();

        /* Filter the ingredient list */
        const unfilteredIngredients = e.target.ingredients.value;
        const unfilteredIngredientArray = unfilteredIngredients.split(',');
        unfilteredIngredientArray.forEach(string => {
            if(string.includes(' ')){
                unfilteredIngredientArray.push(string.replace(/\s/g, ''));
            }
         });
        const filteredIngredients = unfilteredIngredientArray.filter((ingredients) => !ingredients.includes(' '));

        for(var i = 1;i< filteredIngredients.length; i++){
            filteredIngredients[i] = ',+' + filteredIngredients[i];
        }

        var inputForAPI = ''
        for(var j = 0; j< filteredIngredients.length; j++){
            inputForAPI = inputForAPI + filteredIngredients[j];
        }

        const response = await(API.getRecipes(inputForAPI));

        const recipeIDArray = [];
        response.data.forEach((recipe) => recipeIDArray.push(recipe.id));


        recipeIDArray.forEach(async (recipe) => {
            const response2 = await(API.getRecipeLinks(recipe));
            setRecipeLinks( (recipes) => {
                const recipeLinks2 = JSON.parse(JSON.stringify(recipes));
                recipeLinks2.push(response2.data.spoonacularSourceUrl);
                return recipeLinks2
            })
            setRecipeTitles( (titles) => {
                const recipeTitles2 = JSON.parse(JSON.stringify(titles));
                recipeTitles2.push(response2.data.title);
                return recipeTitles2;
            })
        })

        handleShow();
    }

    return (
        <>
            <div className = 'container'>
                <div className = 'padding'/>
                <div className = 'title'>
                    <div className = 'logo'></div>
                    <div className = 'fridgescrape'>FridgeScrape</div>
                </div>
                <div className = 'formSpacing'>
                    <TypeWriter/>
                    <Form onSubmit = {getRecipes}>
                        <Form.Group>
                            <div className = 'formWidth'>
                                <Form.Control required type="text" name='ingredients'>
                                </Form.Control>
                            </div>
                        </Form.Group>
                        <div className = 'buttonContainer'>
                            <Button className = 'rounded-pill' variant = 'dark' type='submit'>Get Recipes</Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Modal show = {show} onHide = {handleClose} centered>
                <Modal.Header> 
                    <Modal.Title> Links to Recipes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {recipeLinks.map((link,index) => {
                            return(
                                <a  key = {index} className = 'list-group-item' href = {link}>{recipeTitles[index]}</a>
                            )
                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = 'dark' onClick= {handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default HomeScreen;