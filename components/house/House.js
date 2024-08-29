import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";

export default function House(props) {
    const [houseName, setHouseName] = useState('');
    const [loading, setLoading] = useState(false);

    const HandleChange = (event) => {
        if(event.target.name=='houseName'){
            setHouseName(event.target.value);
        }        
    }

    const addHouse = () => {
        setLoading(true)
        var param = {
            'name': houseName
        };
        BuildingService.addHouse(param)
            .then((response) => {
                setLoading(false)
                console.log('response', response);
            }).catch((error) => {
                setLoading(false)
                console.log('error', error);
            })
    }


    return (
        <React.Fragment>
            <Grid container spacing={24} justifyContent="center">
                <Grid item xs={12} sm={12}>
                    <Grid item xs={12}>
                        <label>نام ساختمان:</label>
                        <TextField
                            required
                            fullWidth
                            id="houseName"
                            name="houseName"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Button
                                variant='contained'
                                color='info'
                                fullWidth
                                onClick={() => {
                                    addHouse()
                                }}
                                disabled={loading}
                            >
                                ذخیره
                            </Button>
                            {
                                loading && (
                                    <CircularProgress
                                        size={50}
                                        sx={{
                                            color: blue[500],
                                            position: "absolute",
                                            top: '30%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px'
                                        }}
                                    />
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}