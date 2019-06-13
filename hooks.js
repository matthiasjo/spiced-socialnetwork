// import React from "react";
// import { useState } from "react";
// import axios from "axios";
//
// export function useStatefulInputs() {
//     const [values, setValues] = useState({});
//     const onChange = e =>
//         setValues({
//             ...values,
//             [e.target.name]: e.target.value
//         });
// }
//
// ///////////////////////different file
//
// import { useStatefulInputs } from "hooks.js";
//
// const [values, onChange] = useStatefulInputs();

import React from "react";
import { connect } from "react-redux";
import { getListOfAnimals } from "./redux/actions";

class CuteAnimals extends React.Component {
    componentDidMount() {
        this.props.dispatch(getListOfAnimals());
    }

    render() {
        if (!this.props.myAnimals) {
            return;
        }
        return <h1>Cute Animals</h1>;
    }
} // comp ends here

const mapStatetoProps = state => {
    return {
        myAnimals: state.listAnimals
        // we'll come back to this once our global state
        // actually has soomething in it
    };
};

export default connect(mapStatetoProps)(CuteAnimals);
