import React from "react";

function Button({children, variant, onClick}) {
    return (
        <button className={variant} onClick={onClick}>{children}</button>
    );
}

export default Button;

