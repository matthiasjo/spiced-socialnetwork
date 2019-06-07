import React from "react";
import ReactDOM from "react-dom";
import {useState, useEffect } from "react";

React.DOM.render(
<Hello />,
document.querySelector("main")
);

function Hello(){
const [greetee, setGreetee] = useState("World");
const [punctuation, setPunctuation] = useState("!");

//useEffect as substitute for componentDidMount
useEffect(() => {
let abort;
return = () => {
abort = true
}

if ( greetee == "Kitty") {
console.log("hi")
}
// OR
console.log("hi")
}, [setPunctuation])

const handleChange = e => {
setGreetee(e.target.value);
setTimeout(function(){
console.log(greete);
},1000)
};

    return(
        <div> Hello,{greetee} {punctuation}
        <input onChange={handleChange} />
        <input onChange={e => setPunctuation("?")} />
        </div>
        );

}

return (

<div>
{users.map(
user => (
    <div key={user.id}>
<Link to={`/user/${user.id}`}>{user.first} {user.last}</Link>
</div>
)
)}
</div>
)

SELECT name FROM ACTORS
WHERE first || '' || last ILIKE "j%";
