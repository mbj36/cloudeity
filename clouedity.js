var axios = require('axios') // HTTP client for Node. It's used here for calling JSON data from url
var keys = [] // Initialise keys as Global variable. Here key is the input variable passes in _sort
var values = [] // Initialise values as global variable. Values are the variable passed in _order that is 'asc' or 'desc'

/*
Below is the compare function to compare two posts and it's passed inside sort function
*/

function comp(post1, post2) {
    for (let i = 0; i < keys.length; i++) {
        if (post2[keys[i]] != post1[keys[i]]) {
            if (values[i] === 'desc') { //checking the _sort conditions
                return post2[keys[i]] - post1[keys[i]] // if it is desc then return b-a
            } else {
                return post1[keys[i]] - post2[keys[i]] // if it is asc then return a-b
            }
        }
    }
}

//Main function which takes string as Input

function cloudeity(data) {
    console.log("String Passed: ", data)
    let url_parts = data.split(/[?]/) // Splitting the string when '?' is found
    url = url_parts[0] // Extracting the first part of the splitted string
    payload = url_parts[1] // Extracting the second part of the splitted string
    let payload_arr = payload.split(/[&]/) // Again splitting the payload variable
    console.log("payload array:", payload_arr)
    keys = payload_arr[0].split('=')[1].split(',')
    values = payload_arr[1].split('=')[1].split(',')
    console.log("keys:", keys) // Printing the keys that is 'userId' and 'id'
    console.log("values:", values) // printing the values that is 'desc' and 'asc'
    axios.get(url).then(response => {
        let posts = response.data // Getting all the posts as JSON
        console.log("Posts before sorting")
        for (let i = 0; i < posts.length; i++) {
            console.log(posts[i]) //All the posts before sorting 
        }
        let sorted_posts = posts.sort(comp) // Sorting the posts. JS function sort is used which take the comparator function
        console.log("Posts after sorting")
        for (let j = 0; j < posts.length; j++) {
            console.log(sorted_posts[j]) // Sorted Posts 
        }
    })
}
cloudeity("https://jsonplaceholder.typicode.com/posts?_sort=userId,id&_order=desc,asc")