console.log("hello");

document.addEventListener("DOMContentLoaded", function() {
    const articleSection = document.getElementById('article-section');
    const articleWhat = document.getElementById('whatSection');


    if (!articleSection) {
        console.error('Error: Cannot find the article section in the DOM.');
        return;
    }
    if (!articleWhat) {
        console.error('Error: Cannot find the article section in the DOM.');
        return;
    }

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                const articleElement = document.createElement('article');

                const articleName = document.createElement('h3');
                articleName.textContent = article.name;

                const articleImage = document.createElement('img');
                articleImage.src = article.image;
                articleImage.alt = article.name;

                const articleQuote = document.createElement('blockquote');
                articleQuote.textContent = article.quote;

                const articleDescription = document.createElement('span');
                articleDescription.textContent = article.description;

                articleElement.appendChild(articleName);
                articleElement.appendChild(articleImage);
                articleElement.appendChild(articleQuote);
                articleElement.appendChild(articleDescription);

                articleSection.appendChild(articleElement);
            });
        })





        

        fetch('/about')
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                const articleQuestion = document.createElement('article');

                const articleTitle = document.createElement('h2');
                articleTitle.textContent = article.title;

                const articleContent = document.createElement('p');
                articleContent.innerHTML = article.content;

                articleQuestion.appendChild(articleTitle);
                articleQuestion.appendChild(articleContent);

                articleWhat.appendChild(articleQuestion);
            });
        })
        .catch(error => console.error('Error fetching the data:', error));
}
);
document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.readMore');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function() {
            const content = this.previousElementSibling;
            content.style.display = content.style.display === 'none' || content.style.display === '' ? 'inline' : 'none';
            this.textContent = content.style.display === 'inline' ? 'Read Less' : 'Read More...';
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/data')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // You can manipulate the DOM or do something with the data here
//         })
//         .catch(error => console.error('Error fetching the JSON:', error));
// });
