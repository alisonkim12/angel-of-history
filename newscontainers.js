

async function createRandomRectangles() {
    const parentDiv = document.querySelector('.box-background');
    
    let newsData;

    async function loadData() {
        try {
            const response = await fetch('news.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            newsData = data[0]["articles"]
                .concat(data[1]["articles"])
                .concat(data[2]["articles"])
                .concat(data[3]["articles"])
                .concat(data[4]["articles"])
                .concat(data[5]["articles"])
                .concat(data[6]["articles"]);
        } catch (error) {
            console.error('Error fetching JSON:', error);
            throw error;
        }
    }

    // Loading data and then processing it
    await loadData();
    const randomOrder = generateRandomOrder(70);
    updateRectangles(newsData);
    window.addEventListener('resize', () => updateRectangles(newsData));

    function createNewsContainers(data) {
        const allRectangles = document.querySelectorAll('.box-background div');
        let news_counter = 0;
        for (let i = 0; i < allRectangles.length; i+= 2) {
            allRectangles[i].innerHTML = filterTitleText(data[news_counter]["title"]);
            const newsImg = document.createElement('img');
            newsImg.src = data[news_counter]["image"];
            allRectangles[i+1].appendChild(newsImg);
            news_counter ++;
        }
    }
    
    function filterTitleText(title) {
        return title.replace("‘", "").replace("’", "").replace("-", "").replace("&", "");
    }

    function updateRectangles(newsData) {
        // Clear existing rectangles
        parentDiv.innerHTML = '';

        const parentWidth = parentDiv.offsetWidth;
        const parentHeight = parentDiv.offsetHeight;

        initializeRect((0.26 * parentWidth), (0.11 * parentHeight), (0.05 * parentWidth), (0.01 * parentHeight), "1");
        initializeRect((0.25 * parentWidth), (0.12 * parentHeight), (0.7 * parentWidth), (0.02 * parentHeight), "2");
        initializeRect((0.21 * parentWidth), (0.09 * parentHeight), (0.5 * parentWidth), (0.10 * parentHeight), "3");
        initializeRect((0.23 * parentWidth), (0.10 * parentHeight), (0.10 * parentWidth), (0.15 * parentHeight), "4");
        initializeRect((0.24 * parentWidth), (0.11 * parentHeight), (0.20 * parentWidth), (0.09 * parentHeight), "5");
        initializeRect((0.22 * parentWidth), (0.10 * parentHeight), (0.65 * parentWidth), (0.12 * parentHeight), "6");
        initializeRect((0.22 * parentWidth), (0.13 * parentHeight), (0.4 * parentWidth), (0.19 * parentHeight), "7");
        initializeRect((0.24 * parentWidth), (0.13 * parentHeight), (0.01 * parentWidth), (0.32 * parentHeight), "8");
        initializeRect((0.22 * parentWidth), (0.13 * parentHeight), (0.77 * parentWidth), (0.27 * parentHeight), "9");
        initializeRect((0.21 * parentWidth), (0.12 * parentHeight), (0.22 * parentWidth), (0.23 * parentHeight), "10");
        initializeRect((0.23 * parentWidth), (0.11 * parentHeight), (0.57 * parentWidth), (0.20 * parentHeight), "11");
        initializeRect((0.14 * parentWidth), (0.19 * parentHeight), (0.35 * parentWidth), (0.21 * parentHeight), "12");
        initializeRect((0.20 * parentWidth), (0.10 * parentHeight), (0.52 * parentWidth), (0.26 * parentHeight), "13");
        initializeRect((0.15 * parentWidth), (0.17 * parentHeight), (0.46 * parentWidth), (0.04 * parentHeight), "14");
        initializeRect((0.16 * parentWidth), (0.09 * parentHeight), (0.19 * parentWidth), (0.46 * parentHeight), "15");
        initializeRect((0.15 * parentWidth), (0.1 * parentHeight), (0.11 * parentWidth), (0.54 * parentHeight), "16");
        initializeRect((0.22 * parentWidth), (0.1 * parentHeight), (0.51 * parentWidth), (0.65 * parentHeight), "17");
        initializeRect((0.20 * parentWidth), (0.1 * parentHeight), (0.69 * parentWidth), (0.34 * parentHeight), "18");
        initializeRect((0.21 * parentWidth), (0.11 * parentHeight), (0.11 * parentWidth), (0.28 * parentHeight), "19");
        initializeRect((0.19 * parentWidth), (0.09 * parentHeight), (0.74 * parentWidth), (0.49 * parentHeight), "20");
        initializeRect((0.12 * parentWidth), (0.08 * parentHeight), (0.56 * parentWidth), (0.44 * parentHeight), "21");
        initializeRect((0.27 * parentWidth), (0.12 * parentHeight), (0.03 * parentWidth), (0.75 * parentHeight), "22");
        initializeRect((0.24 * parentWidth), (0.11 * parentHeight), (0.07 * parentWidth), (0.9 * parentHeight), "23");
        initializeRect((0.25 * parentWidth), (0.12 * parentHeight), (0.70 * parentWidth), (0.82 * parentHeight), "24");
        initializeRect((0.27 * parentWidth), (0.09 * parentHeight), (0.63 * parentWidth), (0.69 * parentHeight), "25");
        initializeRect((0.15 * parentWidth), (0.19 * parentHeight), (0.81 * parentWidth), (0.54 * parentHeight), "26");
        initializeRect((0.15 * parentWidth), (0.19 * parentHeight), (0.06 * parentWidth), (0.60 * parentHeight), "27");
        initializeRect((0.20 * parentWidth), (0.1 * parentHeight), (0.24 * parentWidth), (0.71 * parentHeight), "28");
        initializeRect((0.22 * parentWidth), (0.11 * parentHeight), (0.58 * parentWidth), (0.76 * parentHeight), "29");
        initializeRect((0.19 * parentWidth), (0.10 * parentHeight), (0.47 * parentWidth), (0.72 * parentHeight), "30");
        initializeRect((0.16 * parentWidth), (0.09 * parentHeight), (0.31 * parentWidth), (0.58 * parentHeight), "31");
        initializeRect((0.14 * parentWidth), (0.20 * parentHeight), (0.35 * parentWidth), (0.78 * parentHeight), "32");
        initializeRect((0.23 * parentWidth), (0.1 * parentHeight), (0.44 * parentWidth), (0.84 * parentHeight), "33");
        initializeRect((0.26 * parentWidth), (0.09 * parentHeight), (0.64 * parentWidth), (0.92 * parentHeight), "34");
        initializeRect((0.21 * parentWidth), (0.14 * parentHeight), (0.17 * parentWidth), (0.82 * parentHeight), "35");
        initializeRect((0.23 * parentWidth), (0.11 * parentHeight), (0.32 * parentWidth), (0.69 * parentHeight), "36");
        initializeRect((0.18 * parentWidth), (0.11 * parentHeight), (0.79 * parentWidth), (0.41 * parentHeight), "37");
        initializeRect((0.19 * parentWidth), (0.10 * parentHeight), (0.79 * parentWidth), (0.64 * parentHeight), "38");
        initializeRect((0.23 * parentWidth), (0.11 * parentHeight), (0.13 * parentWidth), (0.66 * parentHeight), "39");
        initializeRect((0.22 * parentWidth), (0.09 * parentHeight), (0.38 * parentWidth), (0.91 * parentHeight), "40");
        initializeRect((0.22 * parentWidth), (0.09 * parentHeight), (0.05 * parentWidth), (0.41 * parentHeight), "41");
        initializeRect((0.23 * parentWidth), (0.09 * parentHeight), (0.4 * parentWidth), (0.15 * parentHeight), "42");
        initializeRect((0.15 * parentWidth), (0.1 * parentHeight), (0.03 * parentWidth), (0.48 * parentHeight), "43");
        initializeRect((0.14 * parentWidth), (0.09 * parentHeight), (0.83 * parentWidth), (0.75 * parentHeight), "44");
        initializeRect((0.16 * parentWidth), (0.09 * parentHeight), (0.82 * parentWidth), (0.17 * parentHeight), "45");
        initializeRect((0.15 * parentWidth), (0.09 * parentHeight), (0.72 * parentWidth), (0.62 * parentHeight), "46");
        initializeRect((0.18 * parentWidth), (0.09 * parentHeight), (0.28 * parentWidth), (0.36 * parentHeight), "47");
        initializeRect((0.16 * parentWidth), (0.09 * parentHeight), (0.21 * parentWidth), (0.53 * parentHeight), "48");
        initializeRect((0.19 * parentWidth), (0.09 * parentHeight), (0.33 * parentWidth), (0.06 * parentHeight), "49");
        initializeRect((0.13 * parentWidth), (0.09 * parentHeight), (0.70 * parentWidth), (0.56 * parentHeight), "50");
        initializeRect((0.15 * parentWidth), (0.16 * parentHeight), (0.77 * parentWidth), (0.8 * parentHeight), "51");
        initializeRect((0.17 * parentWidth), (0.18 * parentHeight), (0.75 * parentWidth), (0.07 * parentHeight), "52");
        initializeRect((0.12 * parentWidth), (0.10 * parentHeight), (0.67 * parentWidth), (0.51 * parentHeight), "53");
        initializeRect((0.14 * parentWidth), (0.18 * parentHeight), (0.04 * parentWidth), (0.19 * parentHeight), "54");
        initializeRect((0.16 * parentWidth), (0.13 * parentHeight), (0.02 * parentWidth), (0.69 * parentHeight), "55");
        initializeRect((0.15 * parentWidth), (0.15 * parentHeight), (0.05 * parentWidth), (0.84 * parentHeight), "56");
        initializeRect((0.21 * parentWidth), (0.11 * parentHeight), (0.25 * parentWidth), (0.87 * parentHeight), "57");
        initializeRect((0.17 * parentWidth), (0.14 * parentHeight), (0.62 * parentWidth), (0.85 * parentHeight), "58");
        initializeRect((0.15 * parentWidth), (0.16 * parentHeight), (0.83 * parentWidth), (0.32 * parentHeight), "59");
        initializeRect((0.14 * parentWidth), (0.15 * parentHeight), (0.67 * parentWidth), (0.24 * parentHeight), "60");
        initializeRect((0.18 * parentWidth), (0.09 * parentHeight), (0.53 * parentWidth), (0.59 * parentHeight), "61");
        initializeRect((0.15 * parentWidth), (0.16 * parentHeight), (0.07 * parentWidth), (0.05 * parentHeight), "62");
        initializeRect((0.14 * parentWidth), (0.14 * parentHeight), (0.22 * parentWidth), (0.38 * parentHeight), "63");
        initializeRect((0.15 * parentWidth), (0.12 * parentHeight), (0.71 * parentWidth), (0.38 * parentHeight), "64");
        initializeRect((0.12 * parentWidth), (0.14 * parentHeight), (0.00 * parentWidth), (0.13 * parentHeight), "65");
        initializeRect((0.14 * parentWidth), (0.11 * parentHeight), (0.00 * parentWidth), (0.91 * parentHeight), "66");
        initializeRect((0.15 * parentWidth), (0.13 * parentHeight), (0.87 * parentWidth), (0.88 * parentHeight), "67");
        initializeRect((0.14 * parentWidth), (0.15 * parentHeight), (0.86 * parentWidth), (0.05 * parentHeight), "68");
        initializeRect((0.15 * parentWidth), (0.13 * parentHeight), (0.59 * parentWidth), (0.05 * parentHeight), "69");
        initializeRect((0.12 * parentWidth), (0.15 * parentHeight), (0.15 * parentWidth), (0.18 * parentHeight), "70");

        createNewsContainers(newsData);
       
        const title = document.querySelector('.left-container .title');
        setTimeout(() => {
            title.style.transition = 'opacity 7s ease-in'; // Adjust the duration as needed
            title.style.opacity = 1; // Fade to the target opacity
        }, (150 * 75) + 3000); // Start the transition immediately after appending
    
        setTimeout(() => {
            title.style.transition = 'opacity 3s ease-out'; // Adjust the duration as needed
            title.style.opacity = 0; // Fade to the target opacity
        }, (150 * 75 *2) + 8000); // Start the transition immediately after appending

    }

    function generateRandomOrder(N) {
        let numbers = Array.from({ length: N }, (_, i) => i);
                for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        return numbers;
    }

    function initializeRect(width, height, x, y,text) {
        const rect = document.createElement('div');
        rect.classList.add("news-rect");
        rect.style.position = 'absolute';
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.opacity = 0;
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        // rect.id = `media-${text}`;
        // rect.innerHTML = text;

        // if (text == "4" || text == "40" || text == "28" || text == "2" || text == "12" || text == "60" || text == "53" || text == "38" || text == "17" || text == "16" ||  text == "1" || text == "22" || text == "52" || text == "32" | text == "18" ) {
        //     rect.style.opacity = 0.25;
        //     rect.style.zIndex = -5;
        // } else if (text == "3" || text == "58" || text == "56" || text == "19" || text == "13" || text == "37" || text == "49" || text == "14" || text == "45" || text == "15" || text == "23" || text == "51" || text == "47" || text == "50" || text == "24" || text == "43" ) {
        //     rect.style.opacity = 0.5;
        //     rect.style.zIndex = -2;
        // }
        // parentDiv.appendChild(rect);
        let targetOpacity = 0.8;
        if (text == "4" || text == "40" || text == "28" || text == "2" || text == "12" || text == "60" || text == "53" || text == "38" || text == "17" || text == "42" || text == "16" || text == "1" || text == "22" || text == "52" || text == "32" || text == "18" || text == "65" || text == "67" || text == "68") {
            targetOpacity = 0.25;
            rect.style.zIndex = -5;
        } else if (text == "3" || text == "58" || text == "56" || text == "19" || text == "13" || text == "37" || text == "49" || text == "14" || text == "45" || text == "15" || text == "23" || text == "51" || text == "47" || text == "50" || text == "24" || text == "43" || text == "66" || text == "69" || text == "70") {
            targetOpacity = 0.5;
            rect.style.zIndex = -2;
        }
        const delay = randomOrder[Number(text)] * 150; // Stagger delay, e.g., 300ms per rectangle
        parentDiv.appendChild(rect);

        setTimeout(() => {
            rect.style.transition = 'opacity 3s ease-in'; // Adjust the duration as needed
            rect.style.opacity = targetOpacity; // Fade to the target opacity
        }, delay); // Start the transition immediately after appending

        setTimeout(() => {
            rect.style.transition = 'opacity 3s ease-out'; // Adjust the duration as needed
            rect.style.opacity = 0; // Fade to the target opacity
        }, (150 * 75) + 8000 + delay); // Start the transition immediately after appending

        
    }

    
}



function angelTransition() {
    const landingPage = document.querySelector('.landing-page');
    const quote = document.createElement('div');
    quote.id = 'quote';
    quote.style.fontSize = '0.7em';
    quote.style.width = 'fit-content';
    quote.style.fontFamily = 'Montserrat';
    quote.style.textAlign = 'center'; // Center text within the div
    const paragraph = 'A Klee painting named "Angelus Novus" shows an angel looking as though he is about to move away from something he is fixedly contemplating. His eyes are staring, his mouth is open, his wings are spread. This is how one pictures the angel of history. His face is turned toward the past. Where we perceive a chain of events, he sees one single catastrophe which keeps piling wreckage upon wreckage and hurls it in front of his feet. The angel would like to stay, awaken the dead, and make whole what has been smashed. But a storm is blowing from Paradise; it has got caught in his wings with such violence that the angel can no longer close them. This storm irresistibly propels him into the future to which his back is turned, while the pile of debris before him grows skyward. This storm is what we call progress. (Illuminations 257-58).';
    const sentencesList = paragraph.split('.');
    for (let i = 0; i < sentencesList.length; i++) {
       const sentenceSpan = document.createElement('span');
       sentenceSpan.innerText = `${sentencesList[i]}.`;
       sentenceSpan.style.opacity = 0;
       sentenceSpan.style.transition = '0.5s ease-in';
       quote.append(sentenceSpan);
    }
    // Create and style the angel element
    const angel = document.createElement('a');
    angel.href = 'index.html';
    angel.width = 'fit-content';
    angel.style.width = '40%';
    angel.style.zIndex = 5;
    angel.style.cursor = 'pointer';
    const angelImg = document.createElement('img'); // Declare with const
    angelImg.src = "./angelus_novus-67542-3980199887.jpg";
    angelImg.alt = 'Angelus Novus Image';
    angelImg.style.width = '100%';
    angelImg.style.height = 'auto';
    angel.append(angelImg);

    // Create and style the command element
    const command = document.createElement('div');
    command.id = 'command';
    command.style.fontSize = '0.9em';
    command.style.fontFamily = 'Roboto Mono';
    command.style.textAlign = 'center'; // Center text within the div

    // Create a container to hold the elements
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '50%';
    container.style.opacity = 0;
    container.style.transition = 'opacity 2s ease-in';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';    
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100%'; // Full viewport height
    container.style.width = '60%'; // Full viewport height

    // Append the elements to the container
    container.append(angel);
    container.append(quote);
    container.append(command);

    // Append the container to the body
    landingPage.append(container);

    setTimeout(() => {
        container.style.opacity = 1;
    }, 2000);

    async function createCharDivs() {
        const sentenceSpans = document.querySelectorAll('#quote span');
        for (let i = 0; i < sentenceSpans.length; i++) {
            setTimeout(() => {
                sentenceSpans[i].style.opacity = 1;
            }, 4000 + (1500 * i));
        }

        const commandString = 'Click on the angel to enter';
        command.innerHTML = '';

        for (let i = 0; i < commandString.length; i++) {
            setTimeout(() => {
                command.innerHTML += commandString[i];
            }, 4000 + (150 * i) + (sentencesList.length * 1500));
        }
    }

    createCharDivs();

}

async function main() {
    await createRandomRectangles();
    setTimeout(() => {
        angelTransition();
    }, (150 * 75 *2) + 10000); // Start the transition immediately after appending

}

main();


window.addEventListener('resize', function() {
    createRandomRectangles();
});

  

