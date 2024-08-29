import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";

export default function HouseWage(props) {
    const [wageType, setWageType] = useState('');
    const [wageNumber, setWageNumber] = useState('');
    const [year, setYear] = useState('');
    const [period, setPeriod] = useState('');
    const [amount, setAmount] = useState('');
    const [payDate, setPayDate] = useState('');
    const [loading, setLoading] = useState(false);

    const HandleChange = (event) => {
        if (event.target.name == 'wageType') {
            setWageType(event.target.value);
        } else if (event.target.name == 'wageNumber') {
            setWageNumber(event.target.value);
        } else if (event.target.name == 'year') {
            setYear(event.target.value);
        } else if (event.target.name == 'period') {
            setPeriod(event.target.value);
        } else if (event.target.name == 'amount') {
            setAmount(event.target.value);
        } else if (event.target.name == 'payDate') {
            setPayDate(event.target.value);
        }
    }

    const addHouseWage = () => {
        setLoading(true)
        var param = {
            'fkWageTypeId': wageType,
            'wageNumber': wageNumber,
            'year': year,
            'period': period,
            'amount': amount,
            'payDate': payDate
        };
        BuildingService.addHouseWage(param)
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
                        <InputLabel id="divisionTypeLabel">سال:  </InputLabel>
                        <Select
                            labelId="divisionTypeLabel"
                            id="year"
                            name="year"
                            value={year}
                            label="سال"
                            onChange={HandleChange}
                            fullWidth
                        >
                            <MenuItem value={1402}>سال - 1402</MenuItem>
                            <MenuItem value={1403}>سال - 1403</MenuItem>
                            <MenuItem value={1404}>سال - 1404</MenuItem>
                            <MenuItem value={1405}>سال - 1405</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="divisionTypeLabel">دوره:  </InputLabel>
                        <Select
                            labelId="divisionTypeLabel"
                            id="period"
                            name="period"
                            value={period}
                            label="دوره"
                            onChange={HandleChange}
                            fullWidth
                        >
                            <MenuItem value={1}>دوره - 1</MenuItem>
                            <MenuItem value={2}>دوره - 2</MenuItem>
                            <MenuItem value={2}>دوره - 3</MenuItem>
                            <MenuItem value={2}>دوره - 4</MenuItem>
                            <MenuItem value={2}>دوره - 5</MenuItem>
                            <MenuItem value={2}>دوره - 6</MenuItem>
                            <MenuItem value={2}>دوره - 7</MenuItem>
                            <MenuItem value={2}>دوره - 8</MenuItem>
                            <MenuItem value={2}>دوره - 9</MenuItem>
                            <MenuItem value={2}>دوره - 10</MenuItem>
                            <MenuItem value={2}>دوره - 11</MenuItem>
                            <MenuItem value={2}>دوره - 12</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <label> مبلغ:</label>
                        <TextField
                            required
                            fullWidth
                            id="amount"
                            name="amount"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label>شناسه ی پرداخت:</label>
                        <TextField
                            required
                            fullWidth
                            id="wageNumber"
                            name="wageNumber"
                            variant="standard"
                            margin="normal"
                            type="text"
                            onChange={HandleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label> تاریخ پرداخت:</label>
                        <TextField
                            required
                            fullWidth
                            id="payDate"
                            name="payDate"
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
                                    addHouseWage()
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