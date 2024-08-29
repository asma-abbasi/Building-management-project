import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";

export default function HouseUser(props) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [membersCount, setMembersCount] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const HandleChange = (event) => {
        if(event.target.name=='mobileNumber'){
            setMobileNumber(event.target.value);
        }else if(event.target.name=='firstName'){
            setFirstName(event.target.value);
        }else if(event.target.name=='lastName'){
            setLastName(event.target.value);
        }else if(event.target.name=='membersCount'){
            setMembersCount(event.target.value);
        }else if(event.target.name=='unitNumber'){
            setUnitNumber(event.target.value);
        }
    }

    const addHouseUser = () => {
        setLoading(true)
        var param = {
            'userType': 3,
            'mobile':mobileNumber,
            'firstName': firstName,
            'lastName': lastName,
            'membersCount': membersCount,
            'unitNumber': unitNumber,
        };
        BuildingService.addHouseUser(param)
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
                        <label>شماره موبایل:</label>
                        <TextField
                            required
                            fullWidth
                            id="mobileNumber"
                            name="mobileNumber"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label>نام:</label>
                        <TextField
                            required
                            fullWidth
                            id="firstName"
                            name="firstName"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label> نام خانوادگی:</label>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            name="lastName"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label>تعداد نفرات: </label>
                        <TextField
                            required
                            fullWidth
                            id="membersCount"
                            name="membersCount"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label>شماره واحد:</label>
                        <TextField
                            required
                            fullWidth
                            id="unitNumber"
                            name="unitNumber"
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
                                    addHouseUser()
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