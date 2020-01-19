import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 475,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={require ("../images/farmmarket.jpg")}
          title="Farmers Market"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Welcome to Farmer's Market Directory !
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Organic and fresh from the farm. Great places to find your treats.
            Check out a farmer's market near you using this directory!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}