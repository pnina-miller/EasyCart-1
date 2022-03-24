import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import React, { useState } from 'react'

import '../../styles/addCatalog/basicDetailsStore.css'


function FormExample() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Form className='marginTop' noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="alert alert-warning" role="alert">product details</div>
            <Form.Row className='w-100 h-100 p-0'>
                <Form.Group as={Col} md="4" controlId="
                Custom01">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="enter product name"
                        defaultValue="Mark"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="enter description"
                        defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>price</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="enter pricing"
                        defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>content</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="enter content of product"
                        defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.File
                        className="position-relative"
                        required
                        name="file"
                        label="File"
                        id="validationFormik107"
                        feedbackTooltip
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

            </Form.Row>

            <Button type="submit">Submit form</Button>
        </Form>
    );
}

export default FormExample;