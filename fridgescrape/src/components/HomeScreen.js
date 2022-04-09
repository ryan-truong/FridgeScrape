import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import TypeWriter from './TypeWriter'

export const HomeScreen = () => {

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
                <Form>
                    <Form.Group>
                        <div className = 'formWidth'>
                            <Form.Control required type="text">
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <div className = 'buttonContainer'>
                        <Button className = 'rounded-pill' variant = 'dark'>Get Recipes</Button>
                    </div>
                </Form>
            </div>
        </div>
    </>
  )
}

export default HomeScreen;