import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe ,_id} = item;
    const { user } = useContext(AuthContext);
    const [,refetch] = useCart();
    const  navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = item => {
  
        console.log(item);
        if (user && user.email) {
            const cartItem = {menuItemId:_id,name,image,price, email: user.email}
            fetch('http://localhost:5000/carts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {

                    if (data.inserted) {
                        refetch(); 
                         //refetch cart to the update the number of item of cart
                        Swal
                        .fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please log in to order the food',
          
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                   navigate('/login',{state :{from:location}})
                }
            })
        }
    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>

                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-orange-400 border-0 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
