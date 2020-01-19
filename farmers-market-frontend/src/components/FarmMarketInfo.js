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
  });

class FarmMarketInfo extends React.Component {

    // initializing state variables in constructor
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
            // fetching the State names and inititalizing the dropdown list
            var getStateReq = new Request(
                'http://localhost:8000/api/farmers-market/State',
                {
                    method: 'get',
                    mode: 'cors', // no-cors, *cors, same-origin
                });
            const stateResponse = await fetch(getStateReq);
            const stateData = await stateResponse.json();
            //console.log(stateData);
            this.setState({stateList: stateData});
            
            // initalizing the state name
            if(this.state.stateName === '')
                this.setState({stateName: stateData[0].stateName});
            
            // fetching the market name
            if(this.state.stateName !== '')
                this.fetchMarkets();

        } catch (error) {
            console.log(error);
        }
    }
    
    handleChange(event) {
        try {
            // when the drop down is changed the market names are refreshed
            this.setState(() => ({
                stateName: event.target.value
            }), () => {
                this.fetchMarkets();
            });
        } catch (error) {
            console.log(error);
        }
    };

    async fetchMarkets() {
        try {
            // fetching the farmers market names for a given state name
            var getMarketsReq = new Request(
                `http://localhost:8000/api/farmers-market/${this.state.stateName}`,
                {
                    method: 'get',
                    mode: 'cors', // no-cors, *cors, same-origin
                });
            const response = await fetch(getMarketsReq);
            const data = await response.json();
            //console.log(data);
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
                    <InputLabel id="simple-select-label">Please select your state</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={stateName}
                        onChange={this.handleChange.bind(this)}>{
                            stateList.map((option) => { // rendering the dynamic drop down list
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
                        return ( // rendering the market location on a embedded Google map
                            <iframe width="100%" height="315" id="gmap_canvas" title="market location"
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