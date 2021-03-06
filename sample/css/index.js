const useStyles = makeStyles(theme => ({

body : {
    fontFamily: 'Open Sans', 
    fontSize: "100%",
    backgroundColor: '#A9A9A9',
},

main: {
    border: '1px solid #ebf2f9',
    borderRadius: '25px',
    backgroundColor: aliceblue,
    position: absolute,
    width: '950px',
    height: '650px',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: auto,
},

login : {
    border: '1px solid gray',
    borderRadius: '10px',
    backgroundColor: '#ffe0b3',
    width: '650px',
    bottom: '300px',
    float: right,
    marginLeft: '1em',
    marginTop: '5em',
},


sign_up : {
    border: '1px solid gray',
    borderRadius: '10px',
    backgroundColor: '#ffe0b3',
    width: '650px',
    bottom: '250px',
    float: right,
    marginLeft: '1em',
    marginTop: '2em',
},

section_button :{
    marginBottom: '1em',
    marginTop: '0.8em',
},

span : {
    color: red,
},

right_shift :{
    'padding-left': '20px',
},

header :{
    backgroundColor: '#f78e1e',
    border: '1px solid gray',
    borderRadius: '10px',
    margin: auto,
},

activeLink : {
    textDecoration: none,
    color: '#0000cc',
},

visitedLink : {
    textDecoration: none,
    color: '#0000cc',
},

/*
 #checkbox {
    margin-left: 2em,
    display: block,
    margin-top: 1em,
}
*/

label : {
    display: flex,
    lineHeight: '25px',
    fontSize: '100%',
    fontWeight: bold,
},

input : {
    height: '25px',
    marginLeft: '50px',
    width: '200px',
    border: '2px solid gray',
    borderRadius: '10px',
},

button : {
    width: '15%',
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '20%',
    display: block,
    lineHeight: '25px',
    borderRadius: '5px',
},

img : {
    float: left,
    marginRight: '1em',
    marginTop: '5em',
}

}));

const FORMAT = useStyles();
export default FORMAT;
