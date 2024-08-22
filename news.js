
function createNewsContainers(data) {
    const canvasContainer = document.getElementById('canvas-container')
    let thisNews = data;
    const newsContainer = document.createElement('div');
    newsContainer.className = "news-container";
    const newsTitle  = document.createElement('div');
    newsTitle.className = "news-title";
    newsTitle.innerHTML = filterTitleText(thisNews["title"]);
    const newsDescription  = document.createElement('div');
    newsDescription.className = "news-description";
    newsDescription.innerHTML = thisNews["description"];
    const newsImage  = document.createElement('div');
    newsImage.className = "news-image";
    const newsImg = document.createElement('img');
    newsImg.src = thisNews["image"];
    newsImage.appendChild(newsImg);
    const newsSource  = document.createElement('div');
    newsSource.className = "news-source";
    newsSource.innerHTML = `${thisNews["source"]["name"]}`;
    const newsDate  = document.createElement('div');
    newsDate.className = "news-date";
    newsDate.innerHTML = `${thisNews["publishedAt"].slice(0,10)}`;
    const newsContent  = document.createElement('div');
    newsContent.className = "news-content";
    newsContent.innerHTML = `${snipText(thisNews["content"])}`;
    newsContainer.appendChild(newsTitle);
    newsContainer.appendChild(newsImage);
    newsContainer.appendChild(newsDescription);
    newsContainer.appendChild(newsSource);
    newsContainer.appendChild(newsDate);
    newsContainer.appendChild(newsContent);
    canvasContainer.appendChild(newsContainer);
}

function snipText(text){
    const ellipsisIndex = text.indexOf("...");
    if (ellipsisIndex !== -1) {
    return text.substring(0, ellipsisIndex + 3); 
    } else {
    return text;
    }
}

function filterTitleText(title) {
    return title.replace("‘", "").replace("’", "").replace("-", "").replace("&", "");
}

async function loadData() {
    let newsData;
    await fetch('news.json')
        .then(response => response.json())
        .then(data => {
            // data.forEach((element)=>{
            //     newsData = element["articles"];
            //     newsData.forEach((each_data)=>{createNewsContainers(each_data);});
            // })
            newsData = data[0]["articles"];
            newsData.forEach((each_data)=>{createNewsContainers(each_data);});
            // createNewsContainers(data[0]["articles"]);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

loadData();