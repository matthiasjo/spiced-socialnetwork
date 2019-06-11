import React from "react";
import { useState } from "react";
import axios from "axios";

export function useStatefulInputs() {
    const [values, setValues] = useState({});
    const onChange = e =>
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
}

///////////////////////different file

import { useStatefulInputs } from "hooks.js";

const [values, onChange] = useStatefulInputs();
