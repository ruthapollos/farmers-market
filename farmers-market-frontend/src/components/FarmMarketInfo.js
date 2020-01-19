import React from 'react';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

class FarmMarketInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            markets: [],
            stateName: '',
            stateList: []
        };
    }

    async componentDidMount(){
    
        try {
            var getStateReq = new Request(
                'http://localhost:8000/api/farmers-market/State',
                {
                    method: 'get',
                    mode: 'cors', // no-cors, *cors, same-origin
                });
            const stateResponse = await fetch(getStateReq);
            const stateData = await stateResponse.json();
            console.log(stateData);
            this.setState({stateList: stateData, stateName: stateData[0].stateName});

            if(this.state.stateName != '') {
                var getMarketsReq = new Request(
                    `http://localhost:8000/api/farmers-market/${this.state.stateName}`,
                    {
                        method: 'get',
                        mode: 'cors', // no-cors, *cors, same-origin
                    });
                const response = await fetch(getMarketsReq);
                const data = await response.json();
                console.log(data);
                this.setState({markets: data, isLoading: false});
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async handleChange(event) {

        try {
            this.setState({stateName: event.target.value});

            var getMarketsReq = new Request(
                `http://localhost:8000/api/farmers-market/${event.target.value}`,
                {
                    method: 'get',
                    mode: 'cors', // no-cors, *cors, same-origin
                });
            const response = await fetch(getMarketsReq);
            const data = await response.json();
            console.log(data);
            this.setState({markets: data, isLoading: false});
        } catch (error) {
            console.log(error);
        }
    };

    render() {

        const { markets, isLoading, stateName, stateList } = this.state;
        const { classes } = this.props;

        return (
            <div className = {classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Please select your state</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={stateName}
                    onChange={this.handleChange.bind(this)}>
                    {
                        stateList.map((option) => {
                            return (<MenuItem value={option.stateValue}>{option.stateName}</MenuItem>);
                        })
                    }
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={12}>
                <MaterialTable
                    title="Search Farmer's Markets"
                    columns={[
                        { title: 'Market Name', field: 'marketname' },
                        { title: 'Street', field: 'street' },
                        { title: 'City', field: 'city' },
                        { title: 'Zip', field: 'zip', type: 'numeric' },
                        {   title: 'Website', 
                            field: 'website', 
                            render: rowData => <a href={rowData.website} target="_blank">
                                    {rowData.website}</a>
                        },
                    ]}
                    data={markets}
                    options={{ pageSize: 10, loadingType: 'linear' }}
                    isLoading={isLoading}
                    detailPanel={rowData => {
                        return (
                            <iframe width="100%" height="315" id="gmap_canvas" 
                                src={"https://maps.google.com/maps?q="+rowData.latitude+","+rowData.longitude+"&t=k&z=13&ie=UTF8&iwloc=&output=embed"}
                                frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            </iframe>
                        )
                    }}
                    />
                </Grid>
            </Grid>
            </div>
      )
    }
  }
  export default withStyles(styles) (FarmMarketInfo);