import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const apiKey = process.env.PLANT_API_KEY;


export default function SelectItem(props){

    const handleChange = props.handleChange;
    const menuItems = props.menuItems || [];
    const name = props.name || "selectBox";
    const value = props.value;
    const id = props.id;
    const label = props.label;
    const hint = props.hint;
    console.log("inside of SelectItem")
    console.log(menuItems);
    const input1 = (<Input name={name} />);
    const input2 = (<Input name={name} id={id} />);

    const inp = id ? input2 : input1;

    return (
        <FormControl>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
                input={inp}
            >
                <MenuItem value=""><em>Please Select...</em></MenuItem>
                {menuItems.map((item, index) => {

                    return (
                        <MenuItem key={"option_"+index} value={item}>{item}</MenuItem>
                     )
                }
                )
                }


            </Select>
            {hint ? (<FormHelperText>{hint}</FormHelperText>) : (null)}
        </FormControl>
        )
}