import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";
import { useEffect } from "react";
import { useUIContext } from "../../context/uiContext";

export default function CompleteProfile(props) {
    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [membersCount, setMembersCount] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const {isManager, setIsManager} = useUIContext();

    useEffect(()=>{
        console.log('props', props);
       
            console.log('isManager',isManager)
        

    },[]);

    const HandleChange = (event) => {
        console.log(isManager);
        if(event.target.name=='userType'){
            setUserType(event.target.value);
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

    const saveProfileInfo = () => {
        setLoading(true)
        var param = {
            'userType': userType,
            'firstName': firstName,
            'lastName': lastName,
            'membersCount': membersCount,
            'unitNumber': unitNumber,
        };
        BuildingService.saveProfileInfo(param)
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
                        {/* <label>انتخاب نقش: </label> */}
                        {/* <FormControl> */}
                        <InputLabel id="userTypeLabel">انتخاب نقش: </InputLabel>
                        <Select
                            labelId="userTypeLabel"
                            id="userType"
                            name="userType"
                            value={userType}
                            label="انتخاب نقش"
                            onChange={HandleChange}
                            fullWidth
                        >
                            <MenuItem value={1}>مدیر</MenuItem>
                            <MenuItem value={2}>ساکن</MenuItem>
                            <MenuItem value={3}>مالک</MenuItem>
                        </Select>
                        {/* </FormControl> */}
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
                                    saveProfileInfo()
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