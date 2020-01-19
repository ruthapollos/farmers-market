# farmers-market
An web application developed using javascript and MongoDB and allows users to find farmers markets in US. The directory in the application allows users to filter information and also zoom into the location of the farmers market. The User Guide section below shows how the application can be used.

## farmers-market-frontend

This folder contains the user interface developed using React. [Material UI](https://material-ui.com/) components were used to develop the pages.

## farmers-market-backend

This folder contains the backend code developed with Express framework for Nodejs. The backend interacts with a MongoDB where the farmers market locations and addresses are stored. The backend API endpoints are invoked by the frontend fetch farmers market information.

## User Guide

The application consists of two tabs

+ Homepage

The home page displays a welcome message to the user

![alt text](https://user-images.githubusercontent.com/60051474/72681135-ecd90980-3ac0-11ea-8032-3ac93a49c101.jpg)

+ Directory

The search page allows the user to select the State to look for farmers market and displays the markets

![alt text](https://user-images.githubusercontent.com/60051474/72682570-a7233d80-3ace-11ea-8402-87c0ac618720.jpg)

After the user selects the State, the farmers markets in the state are displayed. The user can further filter the results using the search field in the page.

![alt text](https://user-images.githubusercontent.com/60051474/72681163-2a3d9700-3ac1-11ea-99c5-c1dd9c2349a6.jpg)

The details view in the table diplays the market's location in an embedded Google map. The user can further zoom into the location of the market using Google map.

![alt text](https://user-images.githubusercontent.com/60051474/72681169-36c1ef80-3ac1-11ea-98d9-43ae2c77e66d.jpg)

