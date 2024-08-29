import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { blue } from "@mui/material/colors";
import React, { useState } from "react"
import BuildingService from "../../services/BuildingService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        //backgroundColor: theme.palette.common.black,
        //color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export default function CalcHouseWage(props) {
    const [year, setYear] = useState('');
    const [period, setPeriod] = useState('');
    const [loading, setLoading] = useState(false);
    const [houseWage, setHouseWage] = useState();
    const [accountInfo, setAccountInfo] = useState();
    const [sumWages, setSumWages] = useState();
    const [calcResponse, setCalcResponse] = useState();
    const [houseWageList, setHouseWageList] = useState();

    const pdfRef = useRef();

    const HandleChange = (event) => {
        if (event.target.name == 'year') {
            setYear(event.target.value);
        } else if (event.target.name == 'period') {
            setPeriod(event.target.value);
        }
    }

    const calcHouseWage = () => {
        setLoading(true)
        var param = {
            'year': year,
            'period': period
        };
        BuildingService.calcHouseWage(param)
            .then((response) => {
                setLoading(false)
                console.log('response', response);
                setCalcResponse(response.data)
                setHouseWage(response.data.calcHouseWageList)
                setAccountInfo(response.data.accountInfo)
                setSumWages(response.data.sumWageList)
                setHouseWageList(response.data.houseWageList)
            }).catch((error) => {
                setLoading(false)
                console.log('error', error);
            })
    }

    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            // pdf.addFont('../../fonts/BNazanin.ttf', 'BNazanin', 'normal');
            pdf.setFont('bnazanin');
            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0); //black
            pdf.save('invoice.pdf')

        })
    }


    // function createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    //   }

    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];

    return (
        <React.Fragment>
            <Grid container spacing={24} justifyContent="center">
                <Grid item xs={12} sm={12}>
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
                            {/* <MenuItem value={2}>دوره - 3</MenuItem>
                            <MenuItem value={2}>دوره - 4</MenuItem>
                            <MenuItem value={2}>دوره - 5</MenuItem>
                            <MenuItem value={2}>دوره - 6</MenuItem>
                            <MenuItem value={2}>دوره - 7</MenuItem>
                            <MenuItem value={2}>دوره - 8</MenuItem>
                            <MenuItem value={2}>دوره - 9</MenuItem>
                            <MenuItem value={2}>دوره - 10</MenuItem>
                            <MenuItem value={2}>دوره - 11</MenuItem>
                            <MenuItem value={2}>دوره - 12</MenuItem> */}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <Button
                                variant='contained'
                                color='info'
                                fullWidth
                                onClick={() => {
                                    calcHouseWage()
                                }}
                                disabled={loading}
                            >
                                محاسبه
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
                        <Box>
                            <Button
                                variant='contained'
                                color='info'
                                fullWidth
                                onClick={() => {
                                    downloadPdf()
                                }}
                                disabled={loading}
                            >
                                دانلود
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
                    <Grid item xs={12} sm={12} ref={pdfRef}>
                        <Grid item xs={12} display='flex' justifyContent='center' flexDirection='row'>
                            <Grid item xs={4} display='flex' justifyContent='center' flexDirection='row'>
                                <label>تاریخ: </label>&ensp;&ensp;
                                <label>{calcResponse && calcResponse.printDate}</label>
                            </Grid>
                            <Grid item xs={5}>
                                <label>شماره کارت:</label>&ensp;&ensp;
                                <label>{accountInfo && accountInfo.card}</label>&ensp;&ensp;&ensp;
                                <label>{accountInfo && accountInfo.userInfo}</label>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} style={{marginBottom:'10px'}}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell alignItems="center" justifyContent='center'>واحد</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>شارژ آسانسور</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>نظافت</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>هزینه برق</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>هزینه آب</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>هزینه گاز</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>سایر هزینه ها</TableCell>
                                        <TableCell alignItems="center" justifyContent='center'>جمع کل</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {houseWage && houseWage.map((row) => (

                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" alignItems="center" justifyContent='center'>
                                                {row.wageUserList[0].unitInfo}
                                            </TableCell>
                                            {row.wageUserList &&
                                                row.wageUserList.map((row1) => (
                                                    <TableCell component="th" scope="row" alignItems="center" justifyContent='center'>
                                                        {row1.amount.toLocaleString()}
                                                    </TableCell>
                                                ))
                                            }

                                            <TableCell component="th" scope="row">
                                                {row.sumAmount.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{paddingLeft:'5px'}}>
                            <Grid container spacing={4} >

                                {
                                    houseWageList && houseWageList.map((wagedetail) => (

                                        <Grid item xs={4}>
                                            <TableContainer component={Paper}>
                                                <Table aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            {/* <StyledTableCell justifyContent='center'>{wagedetail.wageTypeName}</StyledTableCell> */}
                                                            <TableCell component="th" scope="row" alignItems="center" justifyContent='center'>
                                                                {wagedetail.wageTypeName}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            wagedetail && wagedetail.wageDetailMap.map((wageDRow) => (
                                                                <TableRow
                                                                    key={wageDRow.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, lineHeight:0,padding:'4px' }}
                                                                >
                                                                    <TableCell component="th" scope="row" alignItems="center" justifyContent='center' sx={{padding:'4px'}}>
                                                                        {wageDRow.paydate}
                                                                    </TableCell>

                                                                    <TableCell component="th" scope="row" sx={{padding:'4px'}}>
                                                                        {wageDRow.amount.toLocaleString()}
                                                                    </TableCell>

                                                                </TableRow>
                                                            ))
                                                        }
                                                        {
                                                            <TableRow display='flex' flexDirection='row' justifyContent='space-between' >
                                                                <TableCell component="th">
                                                                    جمع
                                                                </TableCell>
                                                                <TableCell component="th">
                                                                    {wagedetail.sum.toLocaleString()}
                                                                </TableCell>
                                                            </TableRow>
                                                        }
                                                    </TableBody>

                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>

                    </Grid>

                </Grid>
            </Grid>
        </React.Fragment>
    )

}