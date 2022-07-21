import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';


export const SelectCategory = ({ handleInputChange, category,handleFilterCategory ,isFilter=false}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            await fetch('https://apinotesql.herokuapp.com/api/categories')
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    const { success } = result;
                    if (success === false) {
                        console.log(result.message)
                    } else {
                        setCategories(result.data);
                    }

                })
        }
        getCategories();
    }, [setCategories]);




    return (
        <Form.Select
            aria-label="Default select example"
            name='category'
            value={category}
            onChange={(event)=>(isFilter?handleFilterCategory(parseInt(event.target.value)):handleInputChange(event))}

        >
            <option>Open this select categories</option>
            {
                categories.map(category => (
                    <option
                        key={category.idCategory}
                        value={category.idCategory}
                    >
                        {category.nameCategory}
                    </option>
                ))
            }
        </Form.Select>
    );
}