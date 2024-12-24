// Example of calling the public API from your frontend JavaScript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    console.log(data);  // Log the response to check if it works

    // You can also dynamically display the data on the webpage
    const postDataContainer = document.getElementById('postData');
    
    data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postDataContainer.appendChild(postElement);
    });
  })
  .catch(error => console.log('Error:', error));
