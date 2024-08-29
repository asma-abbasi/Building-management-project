import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";
import House from "../house/House";
import CompleteProfile from "../register/CompleteProfile";
import HouseUser from "../house/HouseUser";
import HouseWageType from "../house/HouseWageType";
import AuthService from "../../services/auth.service";
import { useEffect } from "react";
import { useUIContext } from "../../context/uiContext";

const steps = ['اطلاعات شخصی', 'اطلاعات ساختمان', 'اطلاعات دیگر واحد ها', 'انتخاب نوع هزینه ها'];

export default function ProfileManagement(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const { isManager, setIsManager } = useUIContext();
    const [houseInfo, setHouseInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [houseUser, setHouseUser] = useState([]);
    const [houseWageType, setHouseWageType] = useState([]);


    useEffect(() => {
        //console.log('props', props)
        // handleCurrentUser();
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
        let userInfo = JSON.parse(localStorage.getItem("user"));

        if (userInfo && userInfo.roles) {

            if (userInfo.roles[0].includes("ROLE_ADMIN")) {
                console.log('userInfo.roles', userInfo.roles[0])
                setIsManager(true)
            }
        }
        getUserByUserId();
        getHouseByUserId();
        getAllHouseUsers();
        getHouseWageTypeBySearch();
        //refactor print page


    }, []);

    const getHouseByUserId = () => {
        let param = {};
        BuildingService.getHouseByUserId(param)
            .then((response) => {
                setHouseInfo(response.data);
                console.log('response', response);
            }).catch((error) => {
                console.log('error', error);
            })
    }

    const getUserByUserId = () => {
        let param = { 'userType': 1 };
        BuildingService.getUserByUserId(param)
            .then((response) => {
                setUserInfo(response.data);
                console.log('response', response);
            }).catch((error) => {
                console.log('error', error);
            })
    }

    const getAllHouseUsers = () => {
        let param = { 'userType': 3 };
        BuildingService.getAllHouseUsers(param)
            .then((response) => {
                setHouseUser(response.data);
                console.log('response', response);
            }).catch((error) => {
                console.log('error', error);
            })
    }

    const getHouseWageTypeBySearch = () => {
        let param = {};
        BuildingService.getHouseWageTypeBySearch(param)
            .then((response) => {
                setHouseWageType(response.data);
                console.log('response', response);
            }).catch((error) => {
                console.log('error', error);
            })
    }



    const handleCurrentUser = () => {
        // var currentUsert = AuthService.getCurrentUser;
        //console.log('currentUser',currentUsert)
        // setCurrentUser(AuthService.getCurrentUser);
        setCurrentUser(JSON.parse(localStorage.getItem("user")));
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleFirst = () => {
        setActiveStep(0);
    };

    const handleLatest = () => {
        setActiveStep(3);
    };

    const handleChangePage = () => {

    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <CompleteProfile
                    currentUser={currentUser}
                    onHandleChangePage={handleChangePage}
                    loading={loading}
                />;
            case 1:
                return <House
                    currentUser={currentUser}
                    onHandleChangePage={handleChangePage}
                    loading={loading}
                />;
            case 2:
                return <HouseUser
                    currentUser={currentUser}
                    onHandleChangePage={handleChangePage}
                    loading={loading}
                />;
            case 3:
                return <HouseWageType
                    currentUser={currentUser}
                    // loginInfo={loginInfo}
                    onHandleChangePage={handleChangePage}
                    loading={loading}
                />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={24} justifyContent="center" style={{ paddingTop: '150px' }}>
                <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
                    <Typography component="h1" variant='h4' align='center'>
                        تکمیل پروفایل
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>

                            </Typography>
                            <Typography variant="subtitle1">
                                عملیات با موفقیت انجام شد.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    activeStep === steps.length - 1 &&
                                    <Button
                                        variant="contained"
                                        onClick={handleFirst}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        بستن
                                    </Button>
                                }

                            </Box>
                        </React.Fragment>
                    )}

                </Paper>
            </Grid>
        </React.Fragment>
    )

}