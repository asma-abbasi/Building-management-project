import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";

export default function HouseWageType(props) {
    const [wageType, setWageType] = useState('');
    const [billingId, setBillingId] = useState('');
    const [divisionType, setDivisionType] = useState('');
    const [loading, setLoading] = useState(false);

    const HandleChange = (event) => {
        if(event.target.name=='wageType'){
            setWageType(event.target.value);
        }else if(event.target.name=='billingId'){
            setBillingId(event.target.value);
        }else if(event.target.name=='divisionType'){
            setDivisionType(event.target.value);
        } 
    }

    const addHouseWageType = () => {
        setLoading(true)
        var param = {
            'fkWageTypeId': wageType,
            'billingId': billingId,
            'divisionType': divisionType
        };
        BuildingService.addHouseWageType(param)
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
                        <InputLabel id="wageTypeLabel">انتخاب نوع هزینه: </InputLabel>
                        <Select
                            labelId="wageTypeLabel"
                            id="wageType"
                            name="wageType"
                            value={wageType}
                            label="انتخاب نوع هزینه"
                            onChange={HandleChange}
                            fullWidth
                        >
                            <MenuItem value={5}>شارژ آسانسور</MenuItem>
                            <MenuItem value={6}>نظافت ساختمان</MenuItem>
                            <MenuItem value={7}>برق مشترک</MenuItem>
                            <MenuItem value={8}>آب</MenuItem>
                            <MenuItem value={9}>گاز</MenuItem>
                            <MenuItem value={10}>سایر هزینه ها</MenuItem>
                        </Select>
                        {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12}>
                        <label>شناسه ی قبض:</label>
                        <TextField
                            required
                            fullWidth
                            id="billingId"
                            name="billingId"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="divisionTypeLabel">انتخاب نوع تقسیم بندی: </InputLabel>
                        <Select
                            labelId="divisionTypeLabel"
                            id="divisionType"
                            name="divisionType"
                            value={divisionType}
                            label="انتخاب نوع تقسیم بندی"
                            onChange={HandleChange}
                            fullWidth
                        >
                            <MenuItem value={1}>تقسیم بر تعداد نفرات</MenuItem>
                            <MenuItem value={2}>تقسیم بر تعداد واحدها</MenuItem>
                        </Select>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box>
                            <Button
                                variant='contained'
                                color='info'
                                fullWidth
                                onClick={() => {
                                    addHouseWageType()
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