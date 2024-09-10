import { FC } from "react";

const Button: FC = () => {
    return (
        <>
            <button
                style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease', // Smooth transition for hover effect
                }}
                onMouseOver={(e) => {
                    const target = e.currentTarget;
                    target.style.backgroundColor = 'white';
                    target.style.color = 'black';
                }}
                onMouseOut={(e) => {
                    const target = e.currentTarget;
                    target.style.backgroundColor = 'transparent';
                    target.style.color = 'white';
                }}
            >
                Explore More!
            </button>
        </>
    );
};

export default Button;
